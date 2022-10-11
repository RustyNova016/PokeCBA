export class Joueur {
    nickname;
    mail;
    password;
    xp;
    gold;
    img;
    inventory;
    teams;
    player_skills;

    constructor(nickname, mail, password, xp, gold, img, inventory, teams, player_skills) {
        this.nickname = nickname;
        this.mail = mail;
        this.password = password;
        this.xp = xp;
        this.gold = gold;
        this.img = img;
        this.inventory = inventory;
        this.teams = teams;
        this.player_skills = player_skills;
    }
}