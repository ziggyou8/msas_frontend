import { createSelector } from "reselect";



export const selectActeur = state => state.acteur;


export const selectListActeur = createSelector(
    [selectActeur],
    acteur => acteur.acteurs
);
export const selectActeurById = createSelector(
    [selectActeur],
    acteur => acteur.acteurById
);

export const selectActeurByFinancement = createSelector(
    [selectActeur],
    acteur => acteur.acteurByFinancement
);