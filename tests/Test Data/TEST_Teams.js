import {TEST_Players} from "./TEST_Player";
import {TEST_Mobs} from "./TEST_Mobs";

/**
 *
 * @type {TeamJSONFormat}
 */
const team1 = {
    idPlayer: TEST_Players.player1.id,
    name: "Test team 1",
    mobs: [TEST_Mobs.baba]
};

export const TEST_Teams = {
    Team1: team1
}