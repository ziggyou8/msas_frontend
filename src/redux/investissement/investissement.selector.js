import { createSelector } from "reselect";
import { selectIsLoadin } from "../structure/structure.selector";

export const selectInvestissement = (state) => state.investissement;

export const selectListInvestissementByStructure = createSelector(
  [selectInvestissement],
  (investissement) => investissement.investissementsByStructure
);

export const selectListInvestissement = createSelector(
  [selectInvestissement],
  (investissement) => investissement.investissements
);

export const selectIsLoading = createSelector(
  [selectInvestissement],
  (investissement) => investissement.isFetching
);
export const selectInvestissementById = createSelector(
  [selectInvestissement],
  (investissement) => investissement.investissementById
);
