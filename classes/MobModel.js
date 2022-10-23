import {Ability} from "./Abilities";
import {ElementType} from "./ElementType";
import {ElementTypeCollection} from "./ElementTypeCollection";

export class MobModel {
    idMobModel;
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
        this.idMobModel = id_mob_model;
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
     * @param {MobModelJSONFormat} json
     */
    static fromJson(json) {
        const abilities = [];
        const elementTypes = [];

        // Convert the abilities
        for (const ability of json.abilities) {
            abilities.push(Ability.fromJson(ability))
        }

        // Convert the element type
        for (const elementTypeId of json.elementTypes) {
            elementTypes.push(ElementTypeCollection.getInstance().findType(elementTypeId))
        }

        return new MobModel(json.id_mob_model, json.name, json.attack, json.defense, json.speed, json.isShiny, json.img, abilities, elementTypes)
    }
}

