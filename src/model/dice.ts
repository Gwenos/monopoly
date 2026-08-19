export class Dice {

    value: number | undefined;

    throw(): void {
        this.value = Math.floor(Math.random() * 6) + 1;
    }

}