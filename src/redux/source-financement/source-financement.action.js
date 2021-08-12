import sourceFinancementActionTypes from './source-financement.type';
import axios from 'axios';

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


  //

  export const fetchSourceFinancementStart = ()=>({
    type:sourceFinancementActionTypes.FETCH_SOURCE_FINANCEMENT_START
  });
  
  export const fetchSourceFinancementSuccess = financement =>({
    type:sourceFinancementActionTypes.FETCH_SOURCE_FINANCEMENT_SUCCESS,
    payload:financement
  });
  
  export const fetchSourceFinancementFail = errorMessage =>({
    type:sourceFinancementActionTypes.FETCH_SOURCE_FINANCEMENT_FAILLURE,
    payload:errorMessage
  });
  
  
  export const fetchSourceFinancementStratAsync = ()=>{
    return dispatch => {
      dispatch(fetchSourceFinancementStart())
       axios.get('financements').then(res=>{
         dispatch(fetchSourceFinancementSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchSourceFinancementFail(err.message))
        })
    }
  }