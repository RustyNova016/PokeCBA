export class Pokemon {
    nom = "";
    PV = 0;
    attaque = 0;
    defense = 0;
    vitesse = 0;
    img = [];


    constructor(nom, PV, attaque, defense, vitesse, img) {
        this.nom = nom;
        this.PV = PV;
        this.attaque = attaque;
        this.defense = defense;
        this.vitesse = vitesse;
        this.img = img;
    }
}

