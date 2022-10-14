import {ElementTypeCollection} from "./ElementTypeCollection";
import {ElementType} from "./ElementType";

export class Ability {
    /** Abilities of the mob
     *
     * @param {string} name
     * @param {number} power
     * @param {string} specialEffect
     * @param {boolean} priority
     * @param {ElementType} type
     */
    constructor(name, power, specialEffect, priority, type) {
        this.name = name;
        this.power = power;
        this.specialEffect = specialEffect;
        this.priority = priority;
        this.type = type;
    }

    /** Create an ability object from json
     *
     * @param {AbilitiesJSONFormat} json
     */
    static fromJson(json) {
        const type = ElementTypeCollection.getInstance().findType(json.type);
        if (type !== -1) {
            return new Ability(json.name, json.power, json.specialEffect, json.priority, type);
        } else {
            throw new Error("Type ID not found in collection")
        }
    }
}