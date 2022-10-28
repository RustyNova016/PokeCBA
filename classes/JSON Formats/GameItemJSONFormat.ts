import {DB_ID} from "./ElementTypeJSONFormat";

export interface GameItemJSONFormat {
    idItem: DB_ID,
    name: string,
    effect: string,
    img: string,
    //TODO: Change
    category: undefined,
    price: number
}