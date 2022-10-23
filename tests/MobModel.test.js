import {ElementTypeCollection} from "../classes/ElementTypeCollection";
import {TEST_ElementTypes} from "./Test Data/TEST_ElementTypes";
import {MobModel} from "../classes/MobModel";
import {TEST_Mob_Model} from "./Test Data/TEST_Mob_Model";

describe('Test about ElementType', function () {
    const mob = new MobModel(TEST_Mob_Model.babasaure, undefined, 0)

    it('should be instantiated', function () {
        expect(mob).toBeInstanceOf(MobModel);
    });
});