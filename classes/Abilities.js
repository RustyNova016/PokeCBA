export class Abilities {
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
}