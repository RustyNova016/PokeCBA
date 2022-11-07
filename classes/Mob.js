import {Ability} from "./Abilities";

/**
 * @extends MobJSONFormat
 */
export class Mob {
    /**
     *
     * @param {DB_ID|null} idMob
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
     * @param {DB_ID|null} idItem
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
    static fromJSON(json) {
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

    /** Generate a new mob from a model
     *
     * @param {MobModel} mobModel
     * @param {string} nickname
     */
    createNewMob(mobModel, nickname) {
        return new Mob(null, mobModel.idMobModel, nickname, mobModel.HP, mobModel.HP, mobModel.attack, mobModel.defense, mobModel.speed, mobModel.img, mobModel.abilities, 0, null)
    }

    /** Export to JSON
     * @return {MobJSONFormat}
     */
    toJSON() {
        return {
            idMob: this.idMob,
            idModel: this.idModel,
            nickname: this.nickname,
            HP: this.HP,
            HPMax: this.HPMax,
            attack: this.attack,
            defence: this.defence,
            speed: this.speed,
            img: this.img,
            abilities: this.abilities,
            XP: this.XP,
            idItem: this.idItem
        }
    }
}