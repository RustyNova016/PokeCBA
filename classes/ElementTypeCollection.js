import {ElementType} from "./ElementType";

export class ElementTypeCollection {
    /** @type {ElementType[]} */
    types = [];

    /** @type {ElementTypeCollection} */
    instance;

    /** Access to the singleton
     *
     * @return {ElementTypeCollection}
     */
    static getInstance() {
        if (this.instance === undefined){
            this.instance = new ElementTypeCollection();
        }

        return this.instance
    }

    /** Return the type object corresponding to the given ID. If not found, return -1
     *
     * @param {DB_ID} id
     * @return {ElementType|-1} type
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
     * @param {ElementTypeJSONFormat} json
     */
    addType(json) {
        // Check if the type is already in the collection
        if (this.findType(json.idType) !== -1) {
            return
        }

        // Create the type
        const newType = new ElementType(json.idType, json.name, json.strongAgainst, json.weakAgainst, json.immune, this);

        this.types.push(newType);
    }

    /** Add an array of element type to the collection
     *
     * @param {ElementTypeJSONFormat[]} jsonArray
     */
    addTypes(jsonArray) {
        for (const elementTypeJSONFormat of jsonArray) {
            this.addType(elementTypeJSONFormat)
        }
    }
}