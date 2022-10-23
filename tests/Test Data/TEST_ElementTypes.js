/** @type {ElementTypeJSONFormat} */
const normal = {
    idType: 4,
    name: "Normal",
    strongAgainst: [],
    weakAgainst: [],
    immune: []
};

export const TEST_ElementTypes = {

    fire: {
        idType: 1,
        name: "fire",
        strongAgainst: [3],
        weakAgainst: [2],
        immune: []
    },

    water: {
        idType: 2,
        name: "water",
        strongAgainst: [1],
        weakAgainst: [3],
        immune: []
    },

    plant: {
        idType: 3,
        name: "plant",
        strongAgainst: [2],
        weakAgainst: [1],
        immune: []
    },

    normal: normal
}