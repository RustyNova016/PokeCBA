import {DB_ID} from "./TypeJSONFormat";

export interface AbilitiesJSONFormat {
    name: string;
    power: number;
    priority: boolean;
    specialEffect: string;
    type: DB_ID;
}