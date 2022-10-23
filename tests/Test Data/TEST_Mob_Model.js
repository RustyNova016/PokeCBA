import {TEST_Abilities} from "./TEST_Abilities";
import {TEST_ElementTypes} from "./TEST_ElementTypes";

/** @type {Mob_ModelJSONFormat} */
const babasaure = {
    id_mob_model: 1,
    name: "Babasaure",
    HP: 21,
    attack: 21,
    defense: 21,
    speed: 21,
    isShiny: false,
    img: ["img1"],
    abilities: [TEST_Abilities.charge],
    elementTypes: [TEST_ElementTypes.normal.idType, TEST_ElementTypes.plant.idType],
};

export const TEST_Mob_Model = {
    babasaure: babasaure,

    babasaureShiny: {
        idMobModel: 1,
        HP: 21,
        attack: 21,
        defense: 21,
        speed: 21,
        img: ["img1"],
        abilities: [TEST_Abilities.charge],
        isShiny: true,
        type: [TEST_ElementTypes.normal, TEST_ElementTypes.plant]
    }
}