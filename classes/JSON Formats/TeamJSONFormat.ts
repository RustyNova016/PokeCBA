import {DB_ID} from "./ElementTypeJSONFormat";
import {MobJSONFormat} from "./MobJSONFormat";

export interface TeamJSONFormat {
    idPlayer: DB_ID;
    name: string;
    mobs: MobJSONFormat[];
}