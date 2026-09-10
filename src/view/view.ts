import {Model} from "../model/model.ts";
import {Controller} from "../controller/controller.ts";
import {Player} from "../model/player.ts";
import {Case} from "../model/cases/case.ts";
import {Property} from "../model/cases/property.ts";
import {Logger} from "../util/logger.ts";
import {Start} from "../model/cases/start.ts";
import {House} from "../model/cases/properties/house.ts";
import {Colors} from "../util/colors.ts";

export class View {

	LOG: Logger = new Logger(View.name);

	model: Model;
	controller: Controller;

	canvas: HTMLCanvasElement  | undefined;

	boardSize: number = 600;//mm taille que le canvas ou + petit
	caseBySide: number = 11;
	caseWidth: number = this.boardSize/this.caseBySide;

	constructor(controller: Controller, model: Model) {
		this.model = model;
		this.controller = controller;

		const element = document.getElementById("canvas");
		this.canvas = element instanceof HTMLCanvasElement ? element : undefined;

	}

	display() {
		this.displayBoard();
		this.displayPlayer();
		this.displayDice();
		this.displayMoney();
	}

	displayBoard(): void{
		if (this.canvas == null ) return;
		const ctx = this.canvas.getContext("2d");
		if (ctx == null) return;

		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.fillStyle = Colors.BACKGROUND_COLOR;
		ctx.fillRect(0, 0, this.boardSize, this.boardSize);
		ctx.fillStyle = 'black';
		ctx.font = "50px serif";
		ctx.fillText("MONOPOLYPOLY", this.boardSize/6, this.boardSize/2);


		if (this.model.board.cases === undefined) return;

		for (let i= 0; i < this.model.board.cases.length; i++) {
			let c: Case = this.model.board.cases[i];

			ctx.fillStyle = c.color;
			ctx.fillRect(c.position.x*this.caseWidth, c.position.y*this.caseWidth, this.caseWidth, this.caseWidth);
			ctx.strokeStyle = "black";
			// ctx.strokeRect(c.position.x*this.caseWidth, c.position.y*this.caseWidth, this.caseWidth, this.caseWidth);

			if (c instanceof House){
				ctx.fillStyle =  c.owner!=undefined ? c.owner.color : c.secondaryColor;
				ctx.fillRect(c.position.x*this.caseWidth, c.position.y*this.caseWidth, this.caseWidth, this.caseWidth/4);
				ctx.strokeStyle = "10px black";
				// ctx.strokeRect(c.position.x*this.caseWidth, c.position.y*this.caseWidth, this.caseWidth, this.caseWidth/4);
			}


		}
		for (let c of this.model.board.cases) {
			ctx.fillStyle = "white";
			ctx.font = "10px serif";

			const lines = c.name.split(" ");
			lines.forEach((line, i) => {
				ctx.fillText(line, c.position.x*this.caseWidth, (c.position.y*this.caseWidth+(this.caseWidth/2)) + i * 10);
			});
		}

	}

	displayPlayer(): void {
		if (this.canvas == null ) return;
		const ctx = this.canvas.getContext("2d");
		if (ctx == null) return;

		for (let player of this.model.players) {
			let c: Case = this.model.board.cases[player.caseIndex];
			ctx.fillStyle = player.color;
			ctx.fillRect(
				c.position.x*this.caseWidth + this.caseWidth/4,
				c.position.y*this.caseWidth + this.caseWidth/4,
				this.caseWidth/2,
				this.caseWidth/2
			);
			ctx.strokeStyle = 'white';
			ctx.strokeRect(
				c.position.x*this.caseWidth + this.caseWidth/4,
				c.position.y*this.caseWidth + this.caseWidth/4,
				this.caseWidth/2,
				this.caseWidth/2
			);
		}
	}

	displayDice(): void {
		if (this.canvas == null ) return;
		const ctx = this.canvas.getContext("2d");
		if (ctx == null) return;

		for (let i = 0; i < this.model.dices.length; i++) {
			let dice = this.model.dices[i];
			if (dice.value == undefined) continue;

			ctx.strokeStyle = "black";
			ctx.strokeRect(this.boardSize + 50 + (i*60), 50, this.caseWidth, this.caseWidth);
			ctx.font = "30px serif";
			ctx.fillText(dice.value.toString(), this.boardSize + 50 + (i*60), 75);

		}
	}

	displayMoney(): void {
		let divPlayers: HTMLDivElement = <HTMLDivElement> document.getElementById("players");
		divPlayers.innerHTML = "";


		for (let i = 0; i < this.model.players.length; i++) {
			let player: Player = this.model.players[i];

			let divPlayer: HTMLDivElement = <HTMLDivElement> document.createElement("div");
			divPlayer.className = "player";

			let divName = document.createElement("div");
			divName.innerText = player.name;
			divPlayer.appendChild(divName)

			let divMoney = document.createElement("div");
			divMoney.innerText = `Compte: ${player.money} €`;
			divPlayer.appendChild(divMoney)

			let divPatrimony = document.createElement("div");
			let properties: Property[] = this.model.board.cases.filter(
				c => c instanceof Property
			).filter(
				c => c.owner?.equals(player)
			);
			let patrimoine = properties.reduce(
				(acc, c) => acc + c.price, 0
			);
			divPatrimony.innerText = `Patrimoine: ${patrimoine} €`;
			divPlayer.appendChild(divPatrimony)

			divPlayers.appendChild(divPlayer)

		}
	}

	// ANIMATION
	movePlayer(currentPlayer: Player, futurIndex: number, horaire: boolean=true): void {
		let interval = setInterval(() => {
			let currentIndex = currentPlayer.caseIndex;
			if (horaire) {
				currentPlayer.caseIndex = (currentIndex + 1)%40;
			}else {
				currentPlayer.caseIndex = (currentIndex - 1)%40;
			}

			if (this.model.board.cases[currentPlayer.caseIndex] instanceof Start) {
				let c: Start = this.model.board.cases[currentPlayer.caseIndex] as Start;

				currentPlayer.money += c.gain;
			}
			this.display();
			if (currentPlayer.caseIndex === futurIndex) {
				this.LOG.info(`${currentPlayer.name} sur ${this.model.board.cases[currentPlayer.caseIndex].name}`);
				this.controller.handlePosition();
				clearInterval(interval);
			}
		}, 200);
	};

}