import sourceFinancementActionTypes from './source-financement.type';

export const getSourceFinancementData = data => ({
    type: sourceFinancementActionTypes.GET_SOURCE_FINANCEMENT_DATA,
    payload:  data
  });

  export const addActeurField = () => ({
    type: sourceFinancementActionTypes.ADD_ACCTEUR_FIELD
  });

  export const removeActeurField = () => ({
    type: sourceFinancementActionTypes.REMOVE_ACCTEUR_FIELD
  });