export class Case {

    position: {x: number, y:number};
    name: string;
    color: string;

    constructor(position: {x: number, y:number}, name: string, color: string) {
        this.position = position;
        this.name = name;
        this.color = color;
    }

    /**
     * tah
     */
    isCorner(): boolean {
        if (this.position.x === 0 && this.position.y === 0) return true;
        if (this.position.x === 0 && this.position.y === 10) return true;
        if (this.position.x === 10 && this.position.y === 0) return true;
        if (this.position.x === 10 && this.position.y === 10) return true;
        return false;
    }

    isX(): boolean {
        if (this.position.x === 0) return true;
        if (this.position.x === 10) return true;
        return false;
    }

    isY(): boolean {
        if (this.position.y === 0) return true;
        if (this.position.y === 10) return true;
        return false;
    }
}