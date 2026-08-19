import {Colors} from "../util/colors.ts";
import {Property} from "./property.ts";

export class Compagny extends Property {

    constructor(position: {x: number, y:number}, name: string, price: number) {
        super(position, name, Colors.PURPLE, price);
    }

}