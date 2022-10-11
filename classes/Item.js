export class Item {
    id_item;
    name;
    effect;
    IMG;
    id_category;
    price;


    constructor(id_item, name, effect, IMG, id_category, price) {
        this.id_item = id_item;
        this.name = name;
        this.effect = effect;
        this.IMG = IMG;
        this.id_category = id_category;
        this.price = price;
    }
}