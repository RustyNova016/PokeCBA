export class ElementType {
    /** Type of the mob/attacks
     *
     * @param {DB_ID} idType
     * @param {string} name
     * @param {DB_ID[]} strongAgainst
     * @param {DB_ID[]} weakAgainst
     * @param {DB_ID[]} immune
     * @param {ElementTypeCollection} typeCollection
     */
    constructor(idType, name, strongAgainst, weakAgainst, immune, typeCollection) {
        this.idType = idType;
        this.name = name;
        this.strongAgainst = strongAgainst;
        this.weakAgainst = weakAgainst;
        this.immune = immune;
        this.typeCollection = typeCollection;
    }
}
