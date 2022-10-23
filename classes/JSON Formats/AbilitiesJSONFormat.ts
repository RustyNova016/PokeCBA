import {DB_ID} from "./ElementTypeJSONFormat";

export interface AbilitiesJSONFormat {
    name: string;
    power: number;
    priority: boolean;
    specialEffect: string;
    type: DB_ID;
}