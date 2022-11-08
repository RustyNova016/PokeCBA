import {Mob} from "./Mob";

/** @extends TeamJSONFormat */
export class Team {
    /**
     *
     * @param {string} name
     * @param {Mob[]} mobs
     */
    constructor(name, mobs) {
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

        return new Team(json.name, mobsArray);
    }
}