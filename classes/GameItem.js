/** @extends GameItemJSONFormat */
export class GameItem {
    /**
     *
     * @param {DB_ID} idItem
     * @param {string} name
     * @param {string} effect
     * @param {string} img
     * @param {GameItemCategory} category
     * @param {number} price
     */
    constructor(idItem, name, effect, img, category, price) {
        this.idItem = idItem;
        this.name = name;
        this.effect = effect;
        this.img = img;
        this.category = category;
        this.price = price;
    }
}

