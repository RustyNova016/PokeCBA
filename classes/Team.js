import {Mob} from "./Mob";

/** @extends TeamJSONFormat */
export class Team {
    /**
     *
     * @param {DB_ID} idPlayer
     * @param {string} name
     * @param {Mob[]} mobs
     */
    constructor(idPlayer, name, mobs) {
        this.idPlayer = idPlayer;
        this.name = name;
        this.mobs = mobs;
    }

    /**
     *
     * @param {TeamJSONFormat} json
     */
    static fromJSON(json){
        const mobsArray = [];

        for (const mob of json.mobs) {
            mobsArray.push(Mob.fromJSON(mob));
        }

        return new Team(json.idPlayer, json.name, mobsArray);
    }
}