import { getItem, getItems, removeItem, storeItem, updateItem } from '../../utilities/request.utility';

import {
    fetchSourceFinancementByIdSuccess,
    fetchSourceFinancementFail,
    fetchSourceFinancementStart,
    removeSourceFinancementSuccess,
    storeSourceFinancementSuccess,
    updateSourceFinancementSuccess,
    fetchSourceFinancementSuccess
} from './source-financement.action';


export const fetchSourceFinancementAsync = ()=>{
  return dispatch => {
    dispatch(fetchSourceFinancementStart());
    getItems('financements').then(res=>{
       dispatch(fetchSourceFinancementSuccess(res.data.data))
      }).catch(err=>{
        dispatch(fetchSourceFinancementFail(err.message))
      })
  }
}

  export const fetchSourceFinancementByIdAsync = id=>{
    return dispatch => {
      dispatch(fetchSourceFinancementStart())
      getItem('financements', id).then(res=>{
         dispatch(fetchSourceFinancementByIdSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchSourceFinancementFail(err.message))
        })
    }
  }


  export const storeSourceFinancementAsync = (data)=>{
    return dispatch => {
      dispatch(fetchSourceFinancementStart())
       storeItem('financements', data).then(res=>{
         dispatch(storeSourceFinancementSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchSourceFinancementFail(err.message))
        })
    }
  }

  export const updateSourceFinancementAsync = (id, data)=>{
    return dispatch => {
      dispatch(fetchSourceFinancementStart())
       updateItem('financements', id, data).then(res=>{
         dispatch(updateSourceFinancementSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchSourceFinancementFail(err.message))
        })
    }
  }

  export const removeSourceFinancementeAsync = (id, libelle)=>{
    return dispatch => {
      dispatch(fetchSourceFinancementStart())
      removeItem('financements', id, libelle).then(()=>{
        dispatch(removeSourceFinancementSuccess(id))
      }).catch(err=>{
          dispatch(fetchSourceFinancementFail(err.message))
        })
    }
  }

  
