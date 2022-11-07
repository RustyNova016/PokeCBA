import {MobModel} from "../classes/MobModel";
import {TEST_MobModel} from "./Test Data/TEST_MobModel";

describe('Test about ElementType', function () {
    const mob = new MobModel(TEST_MobModel.babasaure, undefined, 0)

    it('should be instantiated', function () {
        expect(mob).toBeInstanceOf(MobModel);
    });
});