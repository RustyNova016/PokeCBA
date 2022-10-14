/** Represent a database ID */
export type DB_ID = number;

export interface TypeJSONFormat {
    idType: DB_ID,
    name: string,
    strongAgainst: DB_ID[],
    weakAgainst: DB_ID[],
    immune: DB_ID[]
}