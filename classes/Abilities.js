export class Ability {
    name;
    power;
    specialEffect;
    priority;
    type;


    constructor(name, power, specialEffect, priority, type) {
        this.name = name;
        this.power = power;
        this.specialEffect = specialEffect;
        this.priority = priority;
        this.type = type;
    }

    /** Create an ability object from json
     *
     * @param json
     */
    static fromJson(json) {
        return new Ability(json.name, json.power, json.specialEffect, json.priority, json.type);
    }
}