export class Player {

    name: string;
    caseIndex: number;
    color: string;
    money: number;

    constructor(name: string, color: string) {
        this.name = name;
        this.caseIndex = 0;
        this.color = color;
        this.money = 1500;
    }

    equals(other: Player | undefined): boolean {
        if (other === undefined) {
            return false;
        }
        return this.name === other.name;
    }

}