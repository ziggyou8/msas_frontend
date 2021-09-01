import sourceFinancementActionTypes from './source-financement.type';

  export const addActeurField = () => ({
    type: sourceFinancementActionTypes.ADD_ACCTEUR_FIELD
  });

  export const removeActeurField = () => ({
    type: sourceFinancementActionTypes.REMOVE_ACCTEUR_FIELD
  });


export const fetchSourceFinancementByIdSuccess = id => ({
  type: sourceFinancementActionTypes.FETCH_SOURCE_FINANCEMENT_BY_ID,
  payload:  id
});


export const fetchSourceFinancementStart = ()=>({
  type:sourceFinancementActionTypes.FETCH_SOURCE_FINANCEMENT_START
});
export const resetEditedSourceFinancement = () => ({
  type: sourceFinancementActionTypes.RESET_EDITED_SOURCE_FINANCEMENT,
});


export const fetchSourceFinancementSuccess = finances =>({
  type:sourceFinancementActionTypes.FETCH_SOURCE_FINANCEMENT_SUCCESS,
  payload:finances
});

export const fetchSourceFinancementFail = errorMessage =>({
  type:sourceFinancementActionTypes.FETCH_SOURCE_FINANCEMENT_FAILLURE,
  payload:errorMessage
});


export const storeSourceFinancementSuccess = finance =>({
  type:sourceFinancementActionTypes.STORE_SOURCE_FINANCEMENT_SUCCESS,
  payload:finance
});

export const updateSourceFinancementSuccess = finance =>({
  type:sourceFinancementActionTypes.UPDATE_SOURCE_FINANCEMENT_SUCCESS,
  payload:finance
});

export const removeSourceFinancementSuccess = id =>({
  type:sourceFinancementActionTypes.REMOVE_SOURCE_FINANCEMENT_SUCCESS,
  payload:id
});