import { createSelector } from "reselect";


const selectStructure = state => state.structure;

export const selectStructureList = createSelector(
    [selectStructure],
    structure => structure.structures
)


export const selectStructureById = createSelector(
    [selectStructure],
    structure => structure.structureById
)

/* export const selectTypeActeur = createSelector(
    [selectStructure],
    structure=> structure.typeActeur
) */

/* export const getcurrentStructure = id =>
createSelector(
     [selectStructure],
     collections => collections[id]
); */