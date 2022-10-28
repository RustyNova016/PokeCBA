import {GameItem} from "./GameItem";

export class GameItemCollection {
    /** @type {GameItem[]} */
    gameItems = [];
    instance;

    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new GameItemCollection();
        }

        return this.instance;
    }

    /** Find an Item
     *
     * @param {DB_ID} id
     */
    findItem(id) {
        for (const gameItem of this.gameItems) {
            if (gameItem.idItem === id) {
                return gameItem;
            }
        }
    }

    /** Add an item from a json
     *
     * @param {GameItemJSONFormat} json
     */
    addItem(json) {
        // Check if the item is already in the collection
        if (this.findType(json.idType) !== undefined) {
            return;
        }

        const item = new GameItem(json.idItem, json.name, json.effect, json.img, json.category, json.price);
        this.gameItems.push(item)
    }
}