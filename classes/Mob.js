import {Ability} from "./Abilities";

/**
 * @extends MobJSONFormat
 */
export class Mob {
    /**
     *
     * @param {DB_ID} idMob
     * @param {DB_ID} id_model
     * @param {string} nickname
     * @param {number} HP
     * @param {number} HPMax
     * @param {number} attack
     * @param {number} defence
     * @param {number} speed
     * @param {string[]} img
     * @param {Ability[]} abilities
     * @param {number} XP
     * @param {DB_ID} idItem
     */
    constructor(idMob, id_model, nickname, HP, HPMax, attack, defence, speed, img, abilities, XP, idItem) {
        this.idMob = idMob
        this.idModel = id_model;
        this.nickname = nickname;
        this.attack = attack;
        this.defence = defence;
        this.speed = speed;
        this.img = img;
        this.abilities = abilities;
        this.HP = HP;
        this.XP = XP;
        this.HPMax = HPMax;
        this.idItem = idItem
    }

    /**
     * @param {MobJSONFormat} json
     */
    fromJSON(json){
        const abilities = [];

        // Convert the abilities
        for (const ability of json.abilities) {
            abilities.push(Ability.fromJson(ability))
        }

        return new Mob(
            json.idMob,
            json.idModel,
            json.nickname,
            json.HP,
            json.HPMax,
            json.attack,
            json.defence,
            json.speed,
            json.img,
            abilities,
            json.XP,
            json.idItem
        )
    }
}