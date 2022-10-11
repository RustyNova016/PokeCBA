export class Type {
    constructor(idType, name, strongAgainst, weakAgainst, immune) {
        this.idType = idType;
        this.name = name;
        this.strongAgainst = strongAgainst;
        this.weakAgainst = weakAgainst;
        this.immune = immune;
    }
}

export class TypeCollection {
    types = [];

    /** Return the type object with the ID. If not found, return -1
     *
     * @param id
     * @return {*}
     */
    findType(id) {
        for (const type of this.types) {
            if (type.idType === id){
                return type;
            }
        }
    }

    /** Add a type to the collection
     *
     * @param json
     */
    addType(json) {
        // Check if the type is already in the collection
        if (this.findType(json.idType !== -1)) { return }

        // Create the type
        const newType = new Type(json.idType, json.name, json.strongAgainst, json.weakAgainst, json.immune);

        this.types.push(newType);
    }
}