import {State} from "../controller/game.ts";

export const lucks = [
    {
        key: State.MOVE,
        message: 'Recule de 3 case',
        value: -3
    },
    {
        key: State.MOVE_TO,
        message: 'Aller en prison',
        value: 20
    },
    {
        key: State.MOVE_TO,
        message: 'Aller sur case départ',
        value: 0
    },
    {
        key: State.MOVE_TO,
        message: 'Aller boulevard de la belle ville',
        value: 1
    },
    {
        key: State.PAY,
        message: 'payer la taxe de 100€',
        value: 100
    },
    {
        key: State.GAIN,
        message: 'la banque vous verse 100€',
        value: 100
    }
];