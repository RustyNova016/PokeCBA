import {ElementTypeCollection} from "../classes/ElementTypeCollection";
import {TEST_ElementTypes} from "./Test Data/TEST_ElementTypes";

describe('Test about ElementType', function () {
    const collection = ElementTypeCollection.getInstance();

    it('should be instantiated', function () {
        expect(collection).toBeInstanceOf(ElementTypeCollection);
    });

    it('should allow new elements in', function () {
        const prevCollLenght = collection.types.length;
        collection.addType(TEST_ElementTypes.normal)
        expect(collection.types.length).toEqual(prevCollLenght + 1);
    });

    it("shouldn't allow already existing elements in", function () {
        const prevCollLenght = collection.types.length;
        collection.addType(TEST_ElementTypes.normal)
        expect(collection.types.length).toEqual(prevCollLenght);
    });
});