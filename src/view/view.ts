import {Model} from "../model/model.ts";
import {Controller} from "../controller/controller.ts";
import {Player} from "../model/player.ts";
import {Case} from "../model/case.ts";
import {Property} from "../model/property.ts";
import {Logger} from "../util/logger.ts";
import {Start} from "../model/start.ts";

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
		ctx.fillStyle = "lightblue";
		ctx.fillRect(0, 0, this.boardSize, this.boardSize);

		if (this.model.board.cases === undefined) return;

		for (let i= 0; i < this.model.board.cases.length; i++) {
			let c: Case = this.model.board.cases[i];

			ctx.fillStyle = c.color;
			ctx.fillRect(c.position.x*this.caseWidth, c.position.y*this.caseWidth, this.caseWidth, this.caseWidth);
			ctx.fillStyle = "black";
			ctx.strokeRect(c.position.x*this.caseWidth, c.position.y*this.caseWidth, this.caseWidth, this.caseWidth);

			if (c instanceof Property && c.owner!=undefined){
				ctx.fillStyle = c.owner.color;
				ctx.fillRect(c.position.x*this.caseWidth, c.position.y*this.caseWidth, this.caseWidth, this.caseWidth/4);
			}
		}
		for (let c of this.model.board.cases) {
			ctx.fillStyle = "black";
			ctx.font = "12px serif";
			ctx.fillText(c.name, c.position.x*this.caseWidth, c.position.y*this.caseWidth+(this.caseWidth/2), this.caseWidth);
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
			// ctx.fillStyle = 'white';
			// ctx.strokeRect(c.position.x*this.caseWidth, c.position.y*this.caseWidth, this.caseWidth/2, this.caseWidth/2);
		}
	}

	displayDice(): void {
		if (this.canvas == null ) return;
		const ctx = this.canvas.getContext("2d");
		if (ctx == null) return;

		for (let i = 0; i < this.model.dices.length; i++) {
			let dice = this.model.dices[i];
			if (dice.value == undefined) continue;

			ctx.fillStyle = "black";
			ctx.strokeRect(this.boardSize + 50 + (i*60), 50, this.caseWidth, this.caseWidth);
			ctx.font = "30px serif";
			ctx.fillText(dice.value.toString(), this.boardSize + 50 + (i*60), 75);

		}
	}

	displayMoney(): void {
		if (this.canvas == null ) return;
		const ctx = this.canvas.getContext("2d");
		if (ctx == null) return;

		for (let i = 0; i < this.model.players.length; i++) {
			let player: Player = this.model.players[i];
			ctx.fillStyle = "black";
			ctx.font = "30px serif";
			ctx.fillText(`${player.name} : ${player.money}`, this.boardSize + 50, 150 + i * 50);
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
				this.controller.handlePosition();
				this.LOG.info(`${currentPlayer.name} sur ${this.model.board.cases[currentPlayer.caseIndex].name}`);
				clearInterval(interval);
			}
		}, 200);
	};

}