import { createSelector } from "reselect";



export const selectCollectivites = state => state.collectivite;


export const selectListCollectivite = createSelector(
    [selectCollectivites],
    collectivite => collectivite.collectivites
);

export const selectListRegion = createSelector(
    [selectCollectivites],
    collectivite => collectivite.regions
);

export const selectCollectiviteById = createSelector(
    [selectCollectivites],
    collectivite => collectivite.collectiviteById
);
export const selectCollectiviteByParentCode = createSelector(
    [selectCollectivites],
    collectivite => collectivite.collectiviteByParentCode
);