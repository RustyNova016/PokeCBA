import {GameItemJSONFormat} from "./GameItemJSONFormat";
import {Mob} from "../Mob";
import {DB_ID} from "./ElementTypeJSONFormat";

export interface PlayerJSONFormat {
    id: DB_ID
    nickname: string;
    xp: number;
    gold: number;
    img: string[];
    inventory: GameItemJSONFormat[];
    teams: Mob[];
    // Todo: player skills?
}