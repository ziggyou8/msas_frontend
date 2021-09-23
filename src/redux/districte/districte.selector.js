import { createSelector } from "reselect";



export const selectDistrictes = state => state.districte;


export const selectListDistricte = createSelector(
    [selectDistrictes],
    districte => districte.districtes
);

export const selectDistricteById = createSelector(
    [selectDistrictes],
    districte => districte.districteById
);