import {Jail} from "./jail.ts";
import {Case} from "./case.ts";
import {Colors} from "../util/colors.ts";
import {Community} from "./community.ts";
import {Station} from "./station.ts";
import {Luck} from "./luck.ts";
import {Compagny} from "./compagny.ts";
import {Taxe} from "./taxe.ts";
import {Start} from "./start.ts";
import {House} from "./house.ts";

export class Board {

	cases: Case[];

	constructor() {
		this.cases = [];
		this.cases.push(new Start({x:0, y:10}, 200));

		this.cases.push(new House({x:0, y:9}, "Boulevard de Belleville", Colors.BROWN, 60));
		this.cases.push(new Community({x:0, y:8}));
		this.cases.push(new House({x:0, y:7}, "Rue Lecourbe", Colors.BROWN, 60));
		this.cases.push(new Taxe({x:0, y:6}, "Impot sur le revenue", 200));
		this.cases.push(new Station({x:0, y:5}, "Gard Montparnasse", 200));
		this.cases.push(new House({x:0, y:4}, "Rue de Vaugirard", Colors.LIGHT_BLUE, 100));
		this.cases.push(new Luck({x:0, y:3}));
		this.cases.push(new House({x:0, y:2}, "Rue de Courcelles", Colors.LIGHT_BLUE, 100));
		this.cases.push(new House({x:0, y:1}, "Avenue de la république", Colors.LIGHT_BLUE, 120));

		this.cases.push(new Jail({x:0, y:0}));

		this.cases.push(new House({x:1, y:0}, "Boulevard de la Villette", Colors.PINK, 140));
		this.cases.push(new Compagny({x:2, y:0}, "Companie de distrib elec", 150));
		this.cases.push(new House({x:3, y:0}, "Avenue de Neuilly", Colors.PINK, 140));
		this.cases.push(new House({x:4, y:0}, "Rue de Paradis", Colors.PINK, 160));
		this.cases.push(new Station({x:5, y:0}, "Gare de Lyon", 200));
		this.cases.push(new House({x:6, y:0}, "Avenue Mozart", Colors.ORANGE, 180));
		this.cases.push(new Community({x:7, y:0}));
		this.cases.push(new House({x:8, y:0}, "Boulevard st Michel", Colors.ORANGE, 180));
		this.cases.push(new House({x:9, y:0}, "Place Pigalle", Colors.ORANGE, 200));

		this.cases.push(new Jail({x:10, y:0}));

		this.cases.push(new House({x:10, y:1}, "Avenue Matignon", Colors.RED, 220));
		this.cases.push(new Luck({x:10, y:2}));
		this.cases.push(new House({x:10, y:3}, "Boulevard Malesherbes", Colors.RED, 220));
		this.cases.push(new House({x:10, y:4}, "Avenue Henri-Martin", Colors.RED, 240));
		this.cases.push(new Station({x:10, y:5}, "Gare du nord", 200));
		this.cases.push(new House({x:10, y:6}, "Faubourg St Honoré", Colors.YELLOW, 260));
		this.cases.push(new House({x:10, y:7}, "Place de la bourse", Colors.YELLOW, 260));
		this.cases.push(new Compagny({x:10, y:8}, "Compagny distrib. eau", 150));
		this.cases.push(new House({x:10, y:9}, "Rue de la Fayette", Colors.YELLOW, 280));

		this.cases.push(new Jail({x:10, y:10}));

		this.cases.push(new House({x:9, y:10}, "Avenue de Breteuil", Colors.GREEN, 300));
		this.cases.push(new House({x:8, y:10}, "Avenue Foch", Colors.GREEN, 300));
		this.cases.push(new Community({x:7, y:10}));
		this.cases.push(new House({x:6, y:10}, "Boulevard des Capucines", Colors.GREEN, 320));
		this.cases.push(new Station({x:5, y:10}, "Gare st Lazard", 200));
		this.cases.push(new Luck({x:4, y:10}));
		this.cases.push(new House({x:3, y:10}, "Avenue des Champs-Elysées", Colors.BLUE, 350));
		this.cases.push(new Taxe({x:2, y:10}, "Taxe de luxe", 100));
		this.cases.push(new House({x:1, y:10}, "Rue de la Paix", Colors.BLUE, 400));
	}

}