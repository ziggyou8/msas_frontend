import acteurTypeActuions from "./acteur.types";

export const fetchActeurByIdSuccess = id => ({
  type: acteurTypeActuions.FETCH_ACTEUR_BY_ID,
  payload:  id
});


export const fetchActeurByFinancementSuccess = id => ({
  type: acteurTypeActuions.FETCH_ACTEUR_BY_FINACEMENT,
  payload:  id
});

export const fetchActeurStart = ()=>({
  type:acteurTypeActuions.FETCH_ACTEUR_START
});


export const fetchActeurSuccess = acteurs =>({
  type:acteurTypeActuions.FETCH_ACTEUR_SUCCESS,
  payload:acteurs
});

export const fetchActeurFail = errorMessage =>({
  type:acteurTypeActuions.FETCH_ACTEUR_FAILLURE,
  payload:errorMessage
});


export const storeActeurSuccess = acteur =>({
  type:acteurTypeActuions.STORE_ACTEUR_SUCCESS,
  payload:acteur
});

export const updateActeurSuccess = acteur =>({
  type:acteurTypeActuions.UPDATE_ACTEUR_SUCCESS,
  payload:acteur
});

export const removeActeurSuccess = id =>({
  type:acteurTypeActuions.REMOVE_ACTEUR_SUCCESS,
  payload:id
});










  