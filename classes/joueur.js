export class Joueur {
    pseudo = "";
    mail = "";
    mdp = "";
    xp = 0;
    gold = 0;
    img = [];

    constructor(pseudo, mail, mdp, xp, gold, img) {
        this.pseudo = pseudo;
        this.mail = mail;
        this.mdp = mdp;
        this.xp = xp;
        this.gold = gold;
        this.img = img;
    }
}