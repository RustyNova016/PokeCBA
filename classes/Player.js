/** @extends PlayerJSONFormat */

export class Player {
    /**
     *
     * @param {DB_ID} id
     * @param {string} nickname
     * @param {number} xp
     * @param {number} gold
     * @param {string[]} img
     * @param {GameItem[]} inventory
     * @param {Mob[]} teams
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
        return new Player(json.id, json.nickname, json.xp, json.gold, json.img, json.inventory, json.teams);
    }
}