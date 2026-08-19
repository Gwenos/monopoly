import {Case} from "./case.ts";
import {Colors} from "../util/colors.ts";


export class Community extends Case{

    constructor(position: {x: number, y:number}) {
        super(position, "Caisse de communauté", Colors.GRAY);
    }

}