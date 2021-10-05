import structureActionTypes from "./structure.type";

export const fetchStructureByIdSuccess = id => ({
  type: structureActionTypes.FETCH_STRUCTURE_BY_ID,
  payload:  id
});

export const fetchStructureByTypeSuccess = type => ({
  type: structureActionTypes.FETCH_STRUCTURE_BY_TYPE,
  payload:type
});


export const fetchStructureStart = ()=>({
  type:structureActionTypes.FETCH_STRUCTURE_START
});


export const fetchStructureSuccess = acteurs =>({
  type:structureActionTypes.FETCH_STRUCTURE_SUCCESS,
  payload:acteurs
});

export const fetchStructureFail = errorMessage =>({
  type:structureActionTypes.FETCH_STRUCTURE_FAILLURE,
  payload:errorMessage
});


export const storeStructureSuccess = structure =>({
  type:structureActionTypes.STORE_STRUCTURE_SUCCESS,
  payload:structure
});

export const updateStructureSuccess = structure =>({
  type:structureActionTypes.UPDATE_STRUCTURE_SUCCESS,
  payload:structure
});

export const removeStructureSuccess = id =>({
  type:structureActionTypes.REMOVE_STRUCTURE_SUCCESS,
  payload:id
});



export const resetEditedStructure= () => ({
  type: structureActionTypes.RESET_EDITED_STRUCTURE,
});