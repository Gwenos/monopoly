import {Colors} from "../../../util/colors.ts";
import {Property} from "../property.ts";


export class Station extends Property {

    constructor(position: {x: number, y:number}, name: string, price: number) {
        super(position, name, Colors.DARK_RED, price);
    }

}