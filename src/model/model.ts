import {Board} from "./board.ts";
import {Player} from "./player.ts";
import {Dice} from "./dice.ts";

export class Model {

	board : Board;
	players : Player[];
	dices : Dice[];

	playerColor = ["white", "black"]

	constructor (names : string[], nbDice : number) {
		this.board = new Board();

		this.players = [];
		for (let i = 0; i < names.length; i++) {
			this.players.push(new Player(names[i], this.playerColor[i]));
		}

		this.dices = [];
		for (let i = 0; i < nbDice; i++) {
			this.dices.push(new Dice());
		}
	}

	getDiceSum(): number {
		let sum = 0;
		for (let dice of this.dices) {
			if (dice.value!=undefined) {
				sum += dice.value;
			}
		}
		return sum;
	}

	sameDice(): boolean {
		let value: number | undefined = this.dices[0].value;
		for (let dice of this.dices) {
			if (dice.value != value) {
				return false;
			}
		}
		return true;
	}
}