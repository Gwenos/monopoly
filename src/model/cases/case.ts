export class Case {

    position: {x: number, y:number};
    name: string;
    color: string;

    constructor(position: {x: number, y:number}, name: string, color: string) {
        this.position = position;
        this.name = name;
        this.color = color;
    }
}