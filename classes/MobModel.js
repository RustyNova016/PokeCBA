import {Ability} from "./Abilities";
import {ElementType} from "./ElementType";
import {ElementTypeCollection} from "./ElementTypeCollection";

/**
 * @extends {MobModelJSONFormat}
 */
export class MobModel {
    /** Model of a mob
     *
     * @param {DB_ID} id_mob_model
     * @param {string} name
     * @param {number} HP
     * @param {number} attack
     * @param {number} defense
     * @param {number} speed
     * @param {boolean} isShiny
     * @param {string[]} img
     * @param {Ability[]} abilities
     * @param {ElementType} elementsType
     */
    constructor(id_mob_model, name, HP, attack, defense, speed, isShiny, img, abilities, elementsType) {
        this.idMobModel = id_mob_model;
        this.name = name;
        this.HP = HP;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.isShiny = isShiny;
        this.img = img;
        this.abilities = abilities;
        this.elementsType = elementsType;
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
        for (const elementTypeId of json.elementsType) {
            elementTypes.push(ElementTypeCollection.getInstance().findType(elementTypeId))
        }

        return new MobModel(json.id_mob_model, json.name, 0, json.attack, json.defense, json.speed, json.isShiny, json.img, abilities, elementTypes)
    }
}

