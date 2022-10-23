import {DB_ID, ElementTypeJSONFormat} from "./ElementTypeJSONFormat";
import {AbilitiesJSONFormat} from "./AbilitiesJSONFormat";

export interface MobJSONFormat {
    idMob: DB_ID;
    idModel: DB_ID;
    nickname: string;
    attack: number
    defence: number;
    speed: number;
    img: string[];
    abilities: AbilitiesJSONFormat[];
    HP: number;
    HPMax: number;
    XP: number;
    idItem: DB_ID;
}