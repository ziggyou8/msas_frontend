import { createSelector } from "reselect";


const selectSourceFinancement = state => state.sourceFinancements;

export const selectSourceFinancementList = createSelector(
    [selectSourceFinancement],
    sourceFinancement => sourceFinancement.sourceFinancements
)
export const selectSourceFinancementById = createSelector(
    [selectSourceFinancement],
    sourceFinancement => sourceFinancement.sourceFinancementById
)

