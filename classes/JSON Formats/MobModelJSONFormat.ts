import {DB_ID, ElementTypeJSONFormat} from "./ElementTypeJSONFormat";
import {AbilitiesJSONFormat} from "./AbilitiesJSONFormat";

export interface MobModelJSONFormat {
    idMobModel: DB_ID;
    name: string;
    HP: number
    attack: number;
    defense: number;
    speed: number;
    isShiny: boolean;
    img: string[];
    abilities: AbilitiesJSONFormat[];
    elementsType: DB_ID[];
}