import {TEST_MobModel} from "./TEST_MobModel";
import {TEST_Abilities} from "./TEST_Abilities";

/**
 *
 * @type {MobJSONFormat}
 */
const baba = {
    idMob: 1,
    idModel: TEST_MobModel.babasaure.id_mob_model,
    HP: 20,
    HPMax: 21,
    attack: 21,
    defence: 21,
    nickname: "baba",
    speed: 21,
    img: TEST_MobModel.babasaure.img,
    XP: 5465,
    abilities: [TEST_Abilities.charge]
};

export const TEST_Mobs = {
    baba: baba
}