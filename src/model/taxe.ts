import {Case} from "./case.ts";
import {Colors} from "../util/colors.ts";

export class Taxe extends Case {

    price: number;

    constructor(position: {x: number, y:number}, name: string, price: number) {
        super(position, name, Colors.DARK_BLUE);
        this.price = price;
    }

}