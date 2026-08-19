import {Logger} from "../util/logger.ts";

export enum State {
    DICE = "DICE",
    BUY = "BUY",
    PAY = "PAY",
    JAIL = "JAIL",
    LUCK = "LUCK",
}

export class Game {

    LOG: Logger = new Logger(Game.name);

    state: State;

    constructor() {
        this.state = State.DICE;
        this.LOG.info(`Etat courant : ${this.state}`);
    }
    
    nextState() {
        switch (this.state) {
            case State.BUY: this.state = State.DICE;
                break
            case State.PAY: this.state = State.DICE;
                break;
            case State.JAIL: this.state = State.DICE;
                break;
            case State.LUCK: this.state = State.DICE;
                break;
            default: this.LOG.warn(`Pas d'état suivant à : ${this.state}`);
        }
        this.LOG.info(`Etat courant : ${this.state}`);
    }

    logCurrentState(): void {
        this.LOG.info(`Etat courant : ${this.state}`);
    }
}