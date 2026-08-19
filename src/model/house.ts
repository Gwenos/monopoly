import {Property} from "./property.ts";

export class House extends Property {

    level: number = 1;

    constructor(position: {x: number, y:number}, name: string, color: string, price: number) {
        super(position, name, color, price);
    }

}