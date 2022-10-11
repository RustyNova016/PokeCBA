export class Type {
    name;
    strongAgainst;
    weakAgainst;
    immune;

    constructor(name, strongAgainst, weakAgainst, immune) {
        this.name = name;
        this.strongAgainst = strongAgainst;
        this.weakAgainst = weakAgainst;
        this.immune = immune;
    }
}