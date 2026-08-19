import {Case} from "./case.ts";
import {Player} from "./player.ts";

export class Property extends Case {

    price: number;
    owner: Player | undefined;

    constructor(position: {x: number, y:number}, name: string, color: string, price: number) {
        super(position, name, color);
        this.price = price;
    }

    setOwner(owner: Player) {
        this.owner = owner;
    }
}