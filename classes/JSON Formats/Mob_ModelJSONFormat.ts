import {DB_ID, ElementTypeJSONFormat} from "./ElementTypeJSONFormat";
import {AbilitiesJSONFormat} from "./AbilitiesJSONFormat";

export interface Mob_ModelJSONFormat {
    id_mob_model: DB_ID;
    name: string;
    attack: number;
    defense: number;
    speed: number;
    isShiny: boolean;
    img: string[];
    abilities: AbilitiesJSONFormat[];
    types: DB_ID[];
}