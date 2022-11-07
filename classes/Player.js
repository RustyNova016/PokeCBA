/** @extends PlayerJSONFormat */
import {Team} from "./Team";
import {GameItemCollection} from "./GameItemCollection";

export class Player {
    /**
     *
     * @param {DB_ID} id
     * @param {string} nickname
     * @param {number} xp
     * @param {number} gold
     * @param {string[]} img
     * @param {GameItem[]} inventory
     * @param {Team[]} teams
     */
    constructor(id, nickname, xp, gold, img, inventory, teams) {
        this.id = id
        this.nickname = nickname;
        this.xp = xp;
        this.gold = gold;
        this.img = img;
        this.inventory = inventory;
        this.teams = teams;
    }

    /**
     *
     * @param {PlayerJSONFormat} json
     */
    static fromJSON(json){
        const gameItemsArray = [];
        const teamsArray = [];
        const instance = GameItemCollection.getInstance();

        for (const gameItemJSONFormat of json.inventory) {
            gameItemsArray.push(instance.findOrAdd(gameItemJSONFormat));
        }

        for (const team of json.teams) {
            teamsArray.push(Team.fromJSON(team))
        }

        return new Player(json.id, json.nickname, json.xp, json.gold, json.img, gameItemsArray, teamsArray);
    }
}