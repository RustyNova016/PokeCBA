export class Mob {
    id_model;
    nickname;
    attack;
    defence;
    speed;
    img;
    capacities;
    HP;
    XP;


    constructor(id_model, nickname, attack, defence, speed, img, capacities, HP, XP) {
        this.id_model = id_model;
        this.nickname = nickname;
        this.attack = attack;
        this.defence = defence;
        this.speed = speed;
        this.img = img;
        this.capacities = capacities;
        this.HP = HP;
        this.XP = XP;
    }


}