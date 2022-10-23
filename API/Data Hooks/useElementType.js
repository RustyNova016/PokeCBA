import {ElementTypeCollection} from "../../classes/ElementTypeCollection";
import {TEST_ElementTypes} from "../../tests/Test Data/TEST_ElementTypes";

export function useElementType() {
    const col = ElementTypeCollection.getInstance();
    col.addTypes([
        TEST_ElementTypes.normal,
        TEST_ElementTypes.fire
    ])

    return col;
}