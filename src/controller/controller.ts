import {Logger} from "../util/logger";
import {Model} from "../model/model";
import {View} from "../view/view.ts";
import {Game, State} from "./game.ts";
import {Case} from "../model/cases/case.ts";
import {Player} from "../model/player.ts";
import {Property} from "../model/cases/property.ts";
import {Jail} from "../model/cases/jail.ts";
import {Community} from "../model/cases/community.ts";
import { communities } from "../dialogs/communities.ts";
import {Luck} from "../model/cases/luck.ts";
import {Station} from "../model/cases/properties/station.ts";
import {Compagny} from "../model/cases/properties/compagny.ts";
import {lucks} from "../dialogs/lucks.ts";
import {Taxe} from "../model/cases/taxe.ts";
import {House} from "../model/cases/properties/house.ts";
import {DialogManager} from "./dialog-manager.ts";

export class Controller {

	LOG: Logger = new Logger(Controller.name);
	dialogManager: DialogManager;

	model: Model;
	view: View;
	game: Game;

	currentPlayerIndex: number;

	timer: number | undefined;

	jailTurn: Record<string, number>;

	dialogProperty: HTMLDialogElement;

	rollButton: HTMLButtonElement | null;
	buyButton: HTMLButtonElement | null;
	cancelButton: HTMLButtonElement | null;

	constructor(names: string[], nbDice: number) {

		this.model = new Model(names, nbDice);
		this.view = new View(this, this.model);
		this.game = new Game();
		this.dialogManager = new DialogManager(this);

		this.currentPlayerIndex = 0;

		this.jailTurn = Object.fromEntries(
			this.model.players.map(player => [player.name, 3])
		);

		this.view.display();

		// dialog
		this.dialogProperty = <HTMLDialogElement> document.getElementById("dialog-property");

		// Button
		this.rollButton = <HTMLButtonElement> document.getElementById("roll");
		this.rollButton?.addEventListener("click", () => {
			this.throwDice();
			if (this.rollButton) this.rollButton.disabled = true;
		});

		this.buyButton = <HTMLButtonElement> document.getElementById("buy");
		this.buyButton?.addEventListener("click", () => {
			this.buyProperty();
		});

		this.cancelButton = <HTMLButtonElement> document.getElementById("cancel");
		this.cancelButton?.addEventListener("click", () => {
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

		if(this.dialogProperty) {
			this.dialogProperty.close();
		}
		this.nextPlayer()
		this.view.display();
	}


	nextPlayer(): void {

		if(this.dialogProperty) {
			this.dialogProperty.close();
		}
		clearTimeout(this.timer);

		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.model.players.length;
		let currenPlayer = this.model.players[this.currentPlayerIndex];
		let currentCase = this.model.board.cases[currenPlayer.caseIndex];


		if (currentCase instanceof Jail) {
			this.game.state = State.JAIL;

			if (this.jailTurn[currenPlayer.name] === 0) {
				this.LOG.info(`joueur suivant : ${currenPlayer.name}`);
				this.dialogManager.info(`${currenPlayer.name} sort de prison`, 1000, false);
				this.game.nextState();
				this.jailTurn[currenPlayer.name] = 3;
			} else {
				this.dialogManager.info(`${currenPlayer.name} en prison pour ${this.jailTurn[currenPlayer.name]} tour`, 1000);
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

		if (c instanceof Property) { // Si la case est une propriété

			if (c.owner === undefined){ // Si la propriété n'a pas de propriétaire
				this.game.state = State.BUY;
				this.game.logCurrentState();

				if(this.dialogProperty) {
					this.dialogManager.openDialogProperty(c);
				}
				this.timer = setTimeout(() => {
					this.nextPlayer();
				}, 10000);
			} else if (!c.owner.equals(player)){ // Si on est pas le propriétaire de la propriété
				this.game.state = State.PAY
				this.game.logCurrentState()

				let finalPrice: number;
				if (c instanceof House) {
					finalPrice = c.price //* c.level;
				}
				if (c instanceof Station) {
					let nbStation = this.model.board.cases.filter(
						c2 => c2 instanceof Station && c.owner?.equals(c2.owner)
					).length;
					switch (nbStation) {
						case 1:
							finalPrice = 250;
							break;
						case 2:
							finalPrice = 500;
							break;
						case 3:
							finalPrice = 1000;
							break;
						case 4:
							finalPrice = 2000;
							break;
						default:
							finalPrice = 0;
							break;
					}
				}else if (c instanceof Compagny) {
					finalPrice = c.price
				}else {
					finalPrice = c.price;
				}
				this.LOG.info(`${player.name} paye ${finalPrice} a ${c.owner.name}`);
				this.dialogManager.info(`${player.name} paye ${finalPrice} a ${c.owner.name}`, 2000, true, (): void => {
					player.money = player.money - finalPrice;
					if (c.owner !== undefined) {//il sert a rien ce if
						c.owner.money = c.owner.money + finalPrice
					}
				});
			} else { // Si on est propriétaire de la propriété
				this.nextPlayer();
			}

		} else if (c instanceof Jail) {
			this.game.state = State.JAIL
			this.dialogManager.info(`${player.name} entre en prison`, 1000);

		} else if (c instanceof Community) {
			const community = communities[Math.floor(Math.random() * communities.length)];
			this.game.state = community.key;
			this.game.logCurrentState();
			this.handleLuck(player, community);

		} else if (c instanceof Luck) {
			const luck = lucks[Math.floor(Math.random() * lucks.length)];
			this.game.state = luck.key;
			this.game.logCurrentState();
			this.handleLuck(player, luck);

		} else if (c instanceof Taxe) {
			this.game.state = State.PAY
			this.dialogManager.info(`vous etes sur ${c.name}, vous devez ${c.price}`, 3000, true, ()=>{
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
				this.dialogManager.info(luck.message, 2000, false, ()=>{
					this.view.movePlayer(player, (player.caseIndex + luck.value + 40) % 40, false);
				});
				break;
			case 'MOVE_TO':
				this.dialogManager.info(luck.message, 2000, false, ()=>{
					this.view.movePlayer(player, luck.value);
				});
				break;
			case 'PAY':
				this.dialogManager.info(luck.message, 2000, true, ()=>{
					player.money -= luck.value;
				});
				break;
			case 'GAIN':
				this.dialogManager.info(luck.message, 2000, true, ()=>{
					player.money += luck.value;
				});
				break;
		}
	}


}