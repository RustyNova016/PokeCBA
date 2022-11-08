import {DB_ID, ElementTypeJSONFormat} from "./ElementTypeJSONFormat";
import {AbilitiesJSONFormat} from "./AbilitiesJSONFormat";
import {ImageURISource} from "react-native";

export interface MobModelJSONFormat {
    idMobModel: DB_ID;
    name: string;
    HP: number
    attack: number;
    defense: number;
    speed: number;
    isShiny: boolean;
    img: ImageURISource[];
    abilities: AbilitiesJSONFormat[];
    elementsType: DB_ID[];
}