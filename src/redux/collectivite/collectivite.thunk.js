import { getItem, getItems, removeItem, storeItem, updateItem } from '../../utilities/request.utility';
import {
    fetchCollectiviteByIdSuccess,
    fetchCollectiviteFail,
    fetchCollectiviteStart,
    fetchCollectiviteSuccess,
    removeCollectiviteSuccess,
    storeCollectiviteSuccess,
    updateCollectiviteSuccess,
    fetchRegionSuccess,
    fetchCollectiviteByParentCodeSuccess
} from './collectivite.actions';


  export const fetchCollectiviteAsync = ()=>{
    return (dispatch) => {
      dispatch(fetchCollectiviteStart())
       getItems('collectivites').then(res=>{
         dispatch(fetchCollectiviteSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchCollectiviteFail(err.message))
        })
    }
  }

  export const fetchRegionAsync = ()=>{
    return (dispatch) => {
      dispatch(fetchCollectiviteStart())
       getItems('collectivites/regions').then(res=>{
         dispatch(fetchRegionSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchCollectiviteFail(err.message))
        })
    }
  }

  export const fetchCollectiviteByParentCodeAsync = id=>{
    return dispatch => {
      dispatch(fetchCollectiviteStart())
      getItem('districtes/by_parent', id).then(res=>{
         dispatch(fetchCollectiviteByParentCodeSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchCollectiviteFail(err.message))
        })
    }
  }

  export const fetchCollectiviteByIdAsync = id=>{
    return dispatch => {
      dispatch(fetchCollectiviteStart())
      getItem('collectivites', id).then(res=>{
         dispatch(fetchCollectiviteByIdSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchCollectiviteFail(err.message))
        })
    }
  }

  export const storeCollectiviteAsync = (data)=>{
    return dispatch => {
      dispatch(fetchCollectiviteStart())
       storeItem('collectivites', data).then(res=>{
         dispatch(storeCollectiviteSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchCollectiviteFail(err.message))
        })
    }
  }

  export const updateCollectiviteAsync = (id, data)=>{
    return dispatch => {
      dispatch(fetchCollectiviteStart())
       updateItem('collectivites', id, data).then(res=>{
         dispatch(updateCollectiviteSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchCollectiviteFail(err.message))
        })
    }
  }

  export const removeCollectiviteAsync = (id, libelle)=>{
    return dispatch => {
      dispatch(fetchCollectiviteStart())
      removeItem('collectivites', id, libelle).then(()=>{
        dispatch(removeCollectiviteSuccess(id))
      }).catch(err=>{
          dispatch(fetchCollectiviteFail(err.message))
        })
    }
  }


