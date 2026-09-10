import {Property} from "../property.ts";

export class House extends Property {

    rent_0: number;
    rent_1: number;
    rent_2: number;
    rent_3: number;
    rent_4: number;
    rent_5: number;
    nbHouse: number;

    secondaryColor: string;

    constructor(position: {x: number, y:number}, name: string, color: string, secondaryColor: string, price: number) {
        super(position, name, color, price);

        this.rent_0 = 50;
        this.rent_1 = 200;
        this.rent_2 = 600;
        this.rent_3 = 1400;
        this.rent_4 = 1700;
        this.rent_5 = 2000;
        this.nbHouse = 0;

        this.secondaryColor = secondaryColor;
    }

}