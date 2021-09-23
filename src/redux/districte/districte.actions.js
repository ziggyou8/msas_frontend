import districteTypeActions from './districte.types';


export const fetchDistricteByIdSuccess = id => ({
  type: districteTypeActions.FETCH_DISTRICTE_BY_ID,
  payload:  id
});

export const fetchDistricteStart = ()=>({
  type:districteTypeActions.FETCH_DISTRICTE_START
});


export const fetchDistricteSuccess = users =>({
  type:districteTypeActions.FETCH_DISTRICTE_SUCCESS,
  payload:users
});

export const fetchDistricteFail = errorMessage =>({
  type:districteTypeActions.FETCH_DISTRICTE_FAILLURE,
  payload:errorMessage
});


export const storeDistricteSuccess = user =>({
  type:districteTypeActions.STORE_DISTRICTE_SUCCESS,
  payload:user
});

export const updateDistricteSuccess = user =>({
  type:districteTypeActions.UPDATE_DISTRICTE_SUCCESS,
  payload:user
});

export const removeDistricteSuccess = id =>({
  type:districteTypeActions.REMOVE_DISTRICTE_SUCCESS,
  payload:id
});


export const resetEditedDistricte = () => ({
  type: districteTypeActions.RESET_EDITED_DISTRICTE,
});







  