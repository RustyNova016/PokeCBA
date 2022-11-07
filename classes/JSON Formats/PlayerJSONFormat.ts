import {GameItemJSONFormat} from "./GameItemJSONFormat";
import {DB_ID} from "./ElementTypeJSONFormat";
import {TeamJSONFormat} from "./TeamJSONFormat";

export interface PlayerJSONFormat {
    gold: number;
    id: DB_ID
    img: string[];
    inventory: GameItemJSONFormat[];
    nickname: string;
    teams: TeamJSONFormat[];
    xp: number;
    // Todo: player skills?
}