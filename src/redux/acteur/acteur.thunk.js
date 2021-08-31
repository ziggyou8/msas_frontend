import { getItem, getItems, removeItem, storeItem, updateItem } from '../../utilities/request.utility';
import {
    fetchActeurSuccess,
    fetchActeurFail,
    fetchActeurByIdSuccess,
    storeActeurSuccess,
    updateActeurSuccess,
    removeActeurSuccess,
    fetchActeurStart,
    fetchActeurByFinancementSuccess
} from './acteur.actions';


  export const fetchActeursAsync = ()=>{
    return (dispatch) => {
      dispatch(fetchActeurStart())
       getItems('acteurs').then(res=>{
         dispatch(fetchActeurSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchActeurFail(err.message))
        })
    }
  }

  export const fetchActeurByIdAsync = id=>{
    return dispatch => {
      dispatch(fetchActeurStart())
      getItem('acteurs', id).then(res=>{
         dispatch(fetchActeurByIdSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchActeurFail(err.message))
        })
    }
  }

  export const fetchActeurByFinancementAsync = id=>{
    return dispatch => {
      dispatch(fetchActeurStart())
      getItem('acteurs-by-financement', id).then(res=>{
         dispatch(fetchActeurByFinancementSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchActeurFail(err.message))
        })
    }
  }

  export const storeActeurAsync = (data)=>{
    return dispatch => {
      dispatch(fetchActeurStart())
       storeItem('acteurs', data).then(res=>{
         dispatch(storeActeurSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchActeurFail(err.message))
        })
    }
  }

  export const updateActeurAsync = (id, data)=>{
    return dispatch => {
      dispatch(fetchActeurStart())
       updateItem('acteurs', id, data).then(res=>{
         dispatch(updateActeurSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchActeurFail(err.message))
        })
    }
  }

  export const removeActeureAsync = (id, libelle)=>{
    return dispatch => {
      dispatch(fetchActeurStart())
      removeItem('acteurs', id, libelle).then(()=>{
        dispatch(removeActeurSuccess(id))
      }).catch(err=>{
          dispatch(fetchActeurFail(err.message))
        })
    }
  }

  
