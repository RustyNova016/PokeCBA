import {Type} from "./Type";

export class TypeCollection {
    /** @type {Type[]} */
    types = [];

    /** Return the type object corresponding to the given ID. If not found, return -1
     *
     * @param {DB_ID} id
     * @return {Type|number} type
     */
    findType(id) {
        for (const type of this.types) {
            if (type.idType === id) {
                return type;    
            }
        }

        return -1;
    }

    /** Add a type to the collection
     *
     * @param {TypeJSONFormat} json
     */
    addType(json) {
        // Check if the type is already in the collection
        if (this.findType(json.idType !== -1)) {
            return
        }

        // Create the type
        const newType = new Type(json.idType, json.name, json.strongAgainst, json.weakAgainst, json.immune, this);

        this.types.push(newType);
    }
}