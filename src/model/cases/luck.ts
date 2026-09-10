import {Case} from "./case.ts";
import {Colors} from "../../util/colors.ts";


export class Luck extends Case{

    constructor(position: {x: number, y:number}) {
        super(position, "Luck", Colors.GRAY);
    }

}