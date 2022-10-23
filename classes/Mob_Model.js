import {Ability} from "./Abilities";
import {ElementType} from "./ElementType";

export class Mob_Model {
    id_mob_model;
    name;
    attack;
    defense;
    speed;
    isShiny;
    img;
    abilities;
    types;

    /** Model of a mob
     *
     * @param {DB_ID} id_mob_model
     * @param {string} name
     * @param {number} attack
     * @param {number} defense
     * @param {number} speed
     * @param {boolean} isShiny
     * @param {string[]} img
     * @param {Ability[]} abilities
     * @param {ElementType} types
     */
    constructor(id_mob_model, name, attack, defense, speed, isShiny, img, abilities, types) {
        this.id_mob_model = id_mob_model;
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.isShiny = isShiny;
        this.img = img;
        this.abilities = abilities;
        this.types;
    }

    /** Create a mob model object from JSON
     *
     * @param json
     */
    static fromJson(json) {
        Ability.fromJson();
        const abilities = [];
        const types = [];

        for (const ability of json.abilities) {
            abilities.push(Ability.fromJson(ability))
        }

        for (const type of json.types) {
            types.push(ElementType.fromJson(type))
        }

        return new Mob_Model(json.id_mob_model, json.name, json.attack, json.defense, json.speed, json.isShiny, json.img, abilities, types)
    }
}

