import {Jail} from "./cases/jail.ts";
import {Case} from "./cases/case.ts";
import {Colors} from "../util/colors.ts";
import {Community} from "./cases/community.ts";
import {Station} from "./cases/properties/station.ts";
import {Luck} from "./cases/luck.ts";
import {Compagny} from "./cases/properties/compagny.ts";
import {Taxe} from "./cases/taxe.ts";
import {Start} from "./cases/start.ts";
import {House} from "./cases/properties/house.ts";

export class Board {

	cases: Case[];

	constructor() {
		this.cases = [];
		this.cases.push(new Start({x:0, y:10}, 200));

		this.cases.push(new House({x:0, y:9}, "Boulevard de Belleville", Colors.BROWN, Colors.LIGHT_BROWN, 60));
		this.cases.push(new Community({x:0, y:8}));
		this.cases.push(new House({x:0, y:7}, "Rue Lecourbe", Colors.BROWN, Colors.LIGHT_BROWN, 60));
		this.cases.push(new Taxe({x:0, y:6}, "Impôt sur le revenue", 200));
		this.cases.push(new Station({x:0, y:5}, "Gare Montparnasse", 200));
		this.cases.push(new House({x:0, y:4}, "Rue de Vaugirard", Colors.LIGHT_BLUE, Colors.LIGHT_LIGHT_BLUE, 100));
		this.cases.push(new Luck({x:0, y:3}));
		this.cases.push(new House({x:0, y:2}, "Rue de Courcelles", Colors.LIGHT_BLUE, Colors.LIGHT_LIGHT_BLUE, 100));
		this.cases.push(new House({x:0, y:1}, "Avenue de la république", Colors.LIGHT_BLUE, Colors.LIGHT_LIGHT_BLUE, 120));

		this.cases.push(new Jail({x:0, y:0}));

		this.cases.push(new House({x:1, y:0}, "Boulevard de la Villette", Colors.PINK, Colors.LIGHT_PINK, 140));
		this.cases.push(new Compagny({x:2, y:0}, "Companie de distribution d'électricité", 150));
		this.cases.push(new House({x:3, y:0}, "Avenue de Neuilly", Colors.PINK, Colors.LIGHT_PINK, 140));
		this.cases.push(new House({x:4, y:0}, "Rue de Paradis", Colors.PINK, Colors.LIGHT_PINK, 160));
		this.cases.push(new Station({x:5, y:0}, "Gare de Lyon", 200));
		this.cases.push(new House({x:6, y:0}, "Avenue Mozart", Colors.ORANGE, Colors.LIGHT_ORANGE, 180));
		this.cases.push(new Community({x:7, y:0}));
		this.cases.push(new House({x:8, y:0}, "Boulevard st Michel", Colors.ORANGE, Colors.LIGHT_ORANGE, 180));
		this.cases.push(new House({x:9, y:0}, "Place Pigalle", Colors.ORANGE, Colors.LIGHT_ORANGE, 200));

		this.cases.push(new Jail({x:10, y:0}));

		this.cases.push(new House({x:10, y:1}, "Avenue Matignon", Colors.RED, Colors.LIGHT_RED, 220));
		this.cases.push(new Luck({x:10, y:2}));
		this.cases.push(new House({x:10, y:3}, "Boulevard Malesherbes", Colors.RED, Colors.LIGHT_RED, 220));
		this.cases.push(new House({x:10, y:4}, "Avenue Henri-Martin", Colors.RED, Colors.LIGHT_RED, 240));
		this.cases.push(new Station({x:10, y:5}, "Gare du Nord", 200));
		this.cases.push(new House({x:10, y:6}, "Faubourg St Honoré", Colors.YELLOW, Colors.LIGHT_YELLOW, 260));
		this.cases.push(new House({x:10, y:7}, "Place de la bourse", Colors.YELLOW, Colors.LIGHT_YELLOW, 260));
		this.cases.push(new Compagny({x:10, y:8}, "Companie de distribution des eaux", 150));
		this.cases.push(new House({x:10, y:9}, "Rue de la Fayette", Colors.YELLOW, Colors.LIGHT_YELLOW, 280));

		this.cases.push(new Jail({x:10, y:10}));

		this.cases.push(new House({x:9, y:10}, "Avenue de Breteuil", Colors.GREEN, Colors.LIGHT_GREEN, 300));
		this.cases.push(new House({x:8, y:10}, "Avenue Foch", Colors.GREEN, Colors.LIGHT_GREEN, 300));
		this.cases.push(new Community({x:7, y:10}));
		this.cases.push(new House({x:6, y:10}, "Boulevard des Capucines", Colors.GREEN, Colors.LIGHT_GREEN, 320));
		this.cases.push(new Station({x:5, y:10}, "Gare st Lazard", 200));
		this.cases.push(new Luck({x:4, y:10}));
		this.cases.push(new House({x:3, y:10}, "Avenue des Champs-Elysées", Colors.BLUE, Colors.LIGHT_BLUE, 350));
		this.cases.push(new Taxe({x:2, y:10}, "Taxe de luxe", 100));
		this.cases.push(new House({x:1, y:10}, "Rue de la Paix", Colors.BLUE, Colors.LIGHT_BLUE, 400));
	}

}