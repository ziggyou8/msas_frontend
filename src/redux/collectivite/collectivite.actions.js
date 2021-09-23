import collectiviteTypeActions from './collectivite.types';


export const fetchCollectiviteByIdSuccess = id => ({
  type: collectiviteTypeActions.FETCH_COLLECTIVITE_BY_ID,
  payload:  id
});

export const fetchCollectiviteStart = ()=>({
  type:collectiviteTypeActions.FETCH_COLLECTIVITE_START
});


export const fetchCollectiviteSuccess = collectivite =>({
  type:collectiviteTypeActions.FETCH_COLLECTIVITE_SUCCESS,
  payload:collectivite
});

export const fetchRegionSuccess = collectivite =>({
  type:collectiviteTypeActions.FETCH_REGION_SUCCESS,
  payload:collectivite
});

export const fetchCollectiviteByParentCodeSuccess = id => ({
  type: collectiviteTypeActions.FETCH_COLLECTIVITE_BY_PARENT_CODE,
  payload:  id
});
export const fetchCollectiviteFail = errorMessage =>({
  type:collectiviteTypeActions.FETCH_COLLECTIVITE_FAILLURE,
  payload:errorMessage
});


export const storeCollectiviteSuccess = collectivite =>({
  type:collectiviteTypeActions.STORE_COLLECTIVITE_SUCCESS,
  payload:collectivite
});

export const updateCollectiviteSuccess = collectivite =>({
  type:collectiviteTypeActions.UPDATE_COLLECTIVITE_SUCCESS,
  payload:collectivite
});

export const removeCollectiviteSuccess = id =>({
  type:collectiviteTypeActions.REMOVE_COLLECTIVITE_SUCCESS,
  payload:id
});


export const resetEditedCollectivite = () => ({
  type: collectiviteTypeActions.RESET_EDITED_COLLECTIVITE,
});

export const resetCollectiviteByCodeParent = () => ({
  type: collectiviteTypeActions.RESET_COLLECTIVITE_BY_CODE_PARENT,
});







  