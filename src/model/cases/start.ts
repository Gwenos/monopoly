import {Case} from "./case.ts";
import {Colors} from "../../util/colors.ts";

export class Start extends Case {

    gain: number;

    constructor(position: {x: number, y:number}, gain: number) {
        super(position, "départ", Colors.LIGHT_GREEN);
        this.gain = gain;
    }

}