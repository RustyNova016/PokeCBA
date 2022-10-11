import {TEST_Abilities} from "./TEST_Abilities";
import {TEST_Types} from "./TEST_Types";

export const TEST_Mob_Model = {
    babasaure: {
        idMobModel: 1,
        HP: 21,
        attack: 21,
        defense: 21,
        speed: 21,
        img: ["img1"],
        abilities: [TEST_Abilities.charge],
        isShiny: false,
        type: [TEST_Types.normal, TEST_Types.plant]
    },

    babasaureShiny: {
        idMobModel: 1,
        HP: 21,
        attack: 21,
        defense: 21,
        speed: 21,
        img: ["img1"],
        abilities: [TEST_Abilities.charge],
        isShiny: true,
        type: [TEST_Types.normal, TEST_Types.plant]
    }
}