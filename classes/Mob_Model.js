export class Mob_Model {
    id_mob_model;
    name;
    attack;
    defense;
    speed;
    isShiny;
    img;
    capacities;
    types;


    constructor(id_mob_model, name, attack, defense, speed, isShiny, img, capacities, types) {
        this.id_mob_model = id_mob_model;
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.isShiny = isShiny;
        this.img = img;
        this.capacities = capacities;
        this.types;
    }
}

