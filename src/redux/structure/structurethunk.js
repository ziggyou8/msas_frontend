import { getItem, getItems, removeItem, storeItem, updateItem } from '../../utilities/request.utility';
import {
    fetchStructureStart,
    fetchStructureByIdSuccess,
    fetchStructureFail,
    updateStructureSuccess,
    removeStructureSuccess,
    storeStructureSuccess,
    fetchStructureSuccess
} from './structure.action';



  export const fetchStructureAsync = ()=>{
    return (dispatch) => {
      dispatch(fetchStructureStart())
       getItems('structures').then(res=>{
         dispatch(fetchStructureSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchStructureFail(err.message))
        })
    }
  }

  export const fetchStructureByIdAsync = id=>{
    return dispatch => {
      dispatch(fetchStructureStart())
      getItem('structures', id).then(res=>{
         dispatch(fetchStructureByIdSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchStructureFail(err.message))
        })
    }
  }

  export const storeStructureAsync = (data)=>{
    return dispatch => {
      dispatch(fetchStructureStart())
       storeItem('structures', data).then(res=>{
         dispatch(storeStructureSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchStructureFail(err.message))
        })
    }
  }

  export const updateStructureAsync = (id, data)=>{
    return dispatch => {
      dispatch(fetchStructureStart())
       updateItem('structures', id, data).then(res=>{
         dispatch(updateStructureSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchStructureFail(err.message))
        })
    }
  }

  export const removeStructureAsync = (id, libelle)=>{
    return dispatch => {
      dispatch(fetchStructureStart())
      removeItem('structures', id, libelle).then(()=>{
        dispatch(removeStructureSuccess(id))
      }).catch(err=>{
          dispatch(fetchStructureFail(err.message))
        })
    }
  }

  
