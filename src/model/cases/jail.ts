import {Case} from "./case.ts";
import {Colors} from "../../util/colors.ts";

export class Jail extends Case {
    constructor(position: {x: number, y:number}) {
        super(position, "Jail", Colors.GRAY);
    }
}