import {DB_ID} from "./ElementTypeJSONFormat";
import {MobJSONFormat} from "./MobJSONFormat";

export interface TeamJSONFormat {
    name: string;
    mobs: MobJSONFormat[];
}