import investissementTypeActuions from "./investissement.types";

export const fetchInvestissementByIdSuccess = (id) => ({
  type: investissementTypeActuions.FETCH_INVESTISSEMENT_BY_ID_SUCCESS,
  payload: id,
});
export const validationInvestissementSuccess = (id) => ({
  type: investissementTypeActuions.VALIDATION_INVESTISSEMENT_SUCCESS,
  payload: id,
});

export const rejectInvestissementSuccess = (id) => ({
  type: investissementTypeActuions.REJECT_INVESTISSEMENT_SUCCESS,
  payload: id,
});

export const fetchInvestissementStart = () => ({
  type: investissementTypeActuions.FETCH_INVESTISSEMENT_START,
});

export const fetchInvestissementByStructureSuccess = (investissements) => ({
  type: investissementTypeActuions.FETCH_INVESTISSEMENT_BY_STRUCTURE_SUCCESS,
  payload: investissements,
});

export const fetchInvestissementSuccess = (investissements) => ({
  type: investissementTypeActuions.FETCH_INVESTISSEMENT_SUCCESS,
  payload: investissements,
});

export const fetchInvestissementFail = (errorMessage) => ({
  type: investissementTypeActuions.FETCH_INVESTISSEMENT_FAILLURE,
  payload: errorMessage,
});

export const storeInvestissementSuccess = (investissement) => ({
  type: investissementTypeActuions.STORE_INVESTISSEMENT_SUCCESS,
  payload: investissement,
});

export const updateInvestissementSuccess = (investissement) => ({
  type: investissementTypeActuions.UPDATE_INVESTISSEMENT_SUCCESS,
  payload: investissement,
});

export const removeInvestissementSuccess = (id) => ({
  type: investissementTypeActuions.REMOVE_INVESTISSEMENT_SUCCESS,
  payload: id,
});
