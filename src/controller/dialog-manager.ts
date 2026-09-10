import {Controller} from "./controller.ts";
import {Property} from "../model/cases/property.ts";
import {House} from "../model/cases/properties/house.ts";
import {Station} from "../model/cases/properties/station.ts";

export class DialogManager {

    controller: Controller;

    dialogInfo: HTMLDialogElement;
    paragraphInfo: HTMLParagraphElement;

    constructor(controller: Controller) {
        this.controller = controller;

        this.dialogInfo = <HTMLDialogElement> document.getElementById("dialog-info");
        this.paragraphInfo = <HTMLParagraphElement> document.getElementById("text-info");
    }


    info(message: string, duration: number, nextPlayer: boolean = true, then:()=>void = ():void=>{}): void {
        if (this.dialogInfo && this.paragraphInfo) this.paragraphInfo.textContent = message;
        this.dialogInfo.showModal();
        setTimeout(() => {
            this.dialogInfo.close();
            then();
            if (nextPlayer) this.controller.nextPlayer();
        }, duration);
    }

    openDialogProperty(c:Property){
        let paragraphProperty: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("dialog-text");
        let topText: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("top-text-property");
        let propertyPrice: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("property-price");
        let houseRents: HTMLDivElement = <HTMLDivElement> document.getElementById("property-rents");
        let stationRents: HTMLDivElement = <HTMLDivElement> document.getElementById("station-rents");

        topText.textContent = c.name;
        paragraphProperty.textContent = c.name;
        propertyPrice.textContent = `${c.price.toString()} €`;

        if (c instanceof House) {
            houseRents.hidden = false;
            stationRents.hidden = true;

            let rent0: HTMLSpanElement = <HTMLSpanElement> document.getElementById("rent-0");
            let rent1: HTMLSpanElement = <HTMLSpanElement> document.getElementById("rent-1");
            let rent2: HTMLSpanElement = <HTMLSpanElement> document.getElementById("rent-2");
            let rent3: HTMLSpanElement = <HTMLSpanElement> document.getElementById("rent-3");
            let rent4: HTMLSpanElement = <HTMLSpanElement> document.getElementById("rent-4");
            let rent5: HTMLSpanElement = <HTMLSpanElement> document.getElementById("rent-5");

            rent0.textContent = `${c.rent_0} €`;
            rent1.textContent = `${c.rent_1} €`;
            rent2.textContent = `${c.rent_2} €`;
            rent3.textContent = `${c.rent_3} €`;
            rent4.textContent = `${c.rent_4} €`;
            rent5.textContent = `${c.rent_5} €`;
        } else if (c instanceof Station) {
            stationRents.hidden = false;
            houseRents.hidden = true;
        }

        this.controller.dialogProperty.showModal();
    }
}