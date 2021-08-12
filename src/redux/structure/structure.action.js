import axios from 'axios';
import structureActionTypes from './structure.type';

export const getStructureData = data => ({
    type: structureActionTypes.GET_STRUCTURE_DATA,
    payload:  data
  });

export const getTypeActeurData = data => ({
  type: structureActionTypes.GET_TYPE_ACTEUR,
  payload:  data
});

export const getCurrentStructure = data => ({
  type: structureActionTypes.GET_CURRENT_STRUCTURE,
  payload:  data
});


export const fetchStructureStart = ()=>({
  type:structureActionTypes.FETCH_STRUCTURE_START
});

export const fetchStructureSuccess = users =>({
  type:structureActionTypes.FETCH_STRUCTURE_SUCCESS,
  payload:users
});

export const fetchStructureFail = errorMessage =>({
  type:structureActionTypes.FETCH_STRUCTURE_FAILLURE,
  payload:errorMessage
});


export const fetchStructureStratAsync = ()=>{
  return dispatch => {
    dispatch(fetchStructureStart())
     axios.get('structures').then(res=>{
       dispatch(fetchStructureSuccess(res.data.data))
      }).catch(err=>{
        dispatch(fetchStructureFail(err.message))
      })
  }
}