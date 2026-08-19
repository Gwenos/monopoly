import {Logger} from "../util/logger";
import {Model} from "../model/model";
import {View} from "../view/view.ts";
import {Game, State} from "./game.ts";
import {Case} from "../model/case.ts";
import {Player} from "../model/player.ts";
import {Property} from "../model/property.ts";
import {Jail} from "../model/jail.ts";
import {Community} from "../model/community.ts";
import { dialogsCommunity } from "../dialogs/dialogsCommunity";
import {Luck} from "../model/luck.ts";
import {Station} from "../model/station.ts";
import {Compagny} from "../model/compagny.ts";
import {dialogsLuck} from "../dialogs/dialogsLuck.ts";
import {Taxe} from "../model/taxe.ts";
import {House} from "../model/house.ts";

export class Controller {

	LOG: Logger = new Logger(Controller.name);

	model: Model;
	view: View;
	game: Game;

	currentPlayerIndex: number;

	timer: number | undefined;

	jailTurn: Record<string, number>;

	constructor(names: string[], nbDice: number) {

		this.model = new Model(names, nbDice);
		this.view = new View(this, this.model);
		this.game = new Game();

		this.currentPlayerIndex = 0;

		this.jailTurn = Object.fromEntries(
			this.model.players.map(player => [player.name, 3])
		);

		// this.start();
		this.view.display();

		document.getElementById("roll")?.addEventListener("click", () => {
			this.throwDice();
		});

		document.getElementById("buy")?.addEventListener("click", () => {
			this.buyProperty();
		});

		document.getElementById("cancel")?.addEventListener("click", () => {
			this.nextPlayer();
		});
	}

	throwDice(): void {
		if (this.game.state !== State.DICE) {
			this.LOG.warn(`Méthode <throwDice> appelé dans l'état : ${this.game.state}`)
			return;
		}

		for (let dice of this.model.dices) {
		  dice.throw();
		}

		let currentPlayer: Player = this.model.players[this.currentPlayerIndex]
		let sum: number = this.model.getDiceSum();
		let futurIndex = (currentPlayer.caseIndex + sum) % 40;
		this.view.movePlayer(currentPlayer, futurIndex);
	}

	buyProperty(): void {
		if (this.game.state !== State.BUY) {
			this.LOG.warn(`Méthode <buyProperty> appelé dans l'état : ' ${this.game.state}`)
			return;
		}

		let currentPlayer: Player = this.model.players[this.currentPlayerIndex];
		let currentCase: Case = this.model.board.cases[currentPlayer.caseIndex];

		if (!(currentCase instanceof Property)) {
			this.LOG.warn(`On ne peut pas acheter des ${currentCase.constructor.name}`);
			return;
		}
		let currentProperty = <Property> currentCase;

		let money: number = currentPlayer.money;
		let price: number = currentProperty.price;
		currentPlayer.money = money - price;

		currentCase.setOwner(currentPlayer);

		this.LOG.info(`${currentPlayer.name} achète ${currentCase.name}`)

		let modalProperty: HTMLDialogElement | null = document.getElementById("modal-property") as HTMLDialogElement;
		if(modalProperty) {
			modalProperty.close();
		}
		this.nextPlayer()
		this.view.display();
	}


	nextPlayer(): void {
		let modalProperty: HTMLDialogElement | null = document.getElementById("modal-property") as HTMLDialogElement;
		if(modalProperty) {
			modalProperty.close();
		}
		clearTimeout(this.timer);
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.model.players.length;
		let currenPlayer = this.model.players[this.currentPlayerIndex];
		let currentCase = this.model.board.cases[currenPlayer.caseIndex];

		if (currentCase instanceof Jail) {
			this.game.state = State.JAIL;

			if (this.jailTurn[currenPlayer.name] === 0) {
				this.LOG.info(`joueur suivant : ${currenPlayer.name}`);
				this.openDialog(`${currenPlayer.name} sort de prison`, 1000, false);
				this.game.nextState();
				this.jailTurn[currenPlayer.name] = 3;
			} else {
				this.openDialog(`${currenPlayer.name} en prison pour ${this.jailTurn[currenPlayer.name]} tour`, 1000);
				this.jailTurn[currenPlayer.name] -= 1;
			}

		} else {
			this.LOG.info(`joueur suivant : ${currenPlayer.name}`);
			this.game.nextState();
			this.view.display();
		}
	}

	/*
	Pour chaque cas de chaque cas :
	1) changer le state
	2) faire l'action
	3) nextPlayer() ou handlePosition() ou rien
	 */
	handlePosition(): void {

		let player: Player = this.model.players[this.currentPlayerIndex];
		let c: Case = this.model.board.cases[player.caseIndex];

		if (c instanceof Property) {

			if (c.owner === undefined){
				this.game.state = State.BUY
				this.game.logCurrentState()
				let modalProperty: HTMLDialogElement | null = document.getElementById("modal-property") as HTMLDialogElement;
				let modalText: HTMLParagraphElement = document.getElementById("modal-text") as HTMLParagraphElement;
				if(modalProperty) {
					modalText.textContent = `Voulez vous acheter ${c.name} pour ${c.price} ?`;
					modalProperty.showModal();
				}
				this.timer = setTimeout(() => {
					this.nextPlayer();
				}, 5000);
			} else if (!c.owner.equals(player)){
				this.game.state = State.PAY
				this.game.logCurrentState()

				let finalPrice: number;
				if (c instanceof House) {
					finalPrice = c.price * c.level;
				}
				if (c instanceof Station) {
					let nbStation = this.model.board.cases.filter(
						c2 => c2 instanceof Station && c.owner?.equals(c2.owner)
					).length;
					finalPrice = c.price*nbStation
				}else if (c instanceof Compagny) {
					finalPrice = c.price
				}else {
					finalPrice = c.price;
				}
				this.LOG.info(`${player.name} paye ${finalPrice} a ${c.owner.name}`);
				this.openDialog(`${player.name} paye ${finalPrice} a ${c.owner.name}`, 2000, true, (): void => {
					player.money = player.money - finalPrice;
					if (c.owner !== undefined) {//il sert a rien ce if
						c.owner.money = c.owner.money + finalPrice
					}
				});
			} else {
				this.nextPlayer();
			}

		} else if (c instanceof Jail) {
			this.game.state = State.JAIL
			this.openDialog(`${player.name} entre en prison`, 1000);

		} else if (c instanceof Community) {
			// this.game.state = ?;
			const message = dialogsCommunity[Math.floor(Math.random() * dialogsCommunity.length)];
			this.openDialog(message, 1000);

		} else if (c instanceof Luck) {
			this.game.state = State.LUCK;
			const luck = dialogsLuck[Math.floor(Math.random() * dialogsLuck.length)];
			this.LOG.info(`Sous état courant : ${luck.key}`);
			this.handleLuck(player, luck);

		} else if (c instanceof Taxe) {
			this.game.state = State.PAY
			this.openDialog(`vous etes sur ${c.name}, vous devez ${c.price}`, 3000, true, ()=>{
				player.money -= c.price;
			});
		} else {
			this.nextPlayer();
		}


		this.view.display();
	}

	handleLuck(player:Player, luck: any): void{
		switch (luck.key){
			case 'MOVE':
				this.openDialog(luck.message, 2000, false, ()=>{
					this.view.movePlayer(player, (player.caseIndex + luck.value + 40) % 40, false);
					// this.handlePosition();
				});
				break;
			case 'MOVE_TO':
				this.openDialog(luck.message, 2000, false, ()=>{
					// player.caseIndex = luck.value;
					this.view.movePlayer(player, luck.value);
					// this.handlePosition();
				});
				break;
			case 'PAY':
				this.openDialog(luck.message, 2000, true, ()=>{
					player.money -= luck.value;
				});
				break;
			case 'GAIN':
				this.openDialog(luck.message, 2000, true, ()=>{
					player.money += luck.value;
				});
				break;
		}
	}

	openDialog(message: string, duration: number, nextPlayer: boolean = true, then:()=>void = ():void=>{}): void {
		const modal = document.getElementById("modal-community") as HTMLDialogElement;
		if (modal) modal.textContent = message;
		modal.showModal();
		this.timer = setTimeout(() => {
			modal.close();
			then();
			if (nextPlayer) this.nextPlayer();
		}, duration);
	}
}