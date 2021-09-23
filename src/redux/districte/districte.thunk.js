import { getItem, getItems, removeItem, storeItem, updateItem } from '../../utilities/request.utility';
import { fetchDistricteByIdSuccess, fetchDistricteFail, fetchDistricteStart, fetchDistricteSuccess, removeDistricteSuccess, storeDistricteSuccess, updateDistricteSuccess } from './districte.actions';


  export const fetchDistricteAsync = ()=>{
    return (dispatch) => {
      dispatch(fetchDistricteStart())
       getItems('districtes').then(res=>{
         dispatch(fetchDistricteSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchDistricteFail(err.message))
        })
    }
  }

  export const fetchDistricteByIdAsync = id=>{
    return dispatch => {
      dispatch(fetchDistricteStart())
      getItem('districtes', id).then(res=>{
         dispatch(fetchDistricteByIdSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchDistricteFail(err.message))
        })
    }
  }

  export const storeDistricteAsync = (data)=>{
    return dispatch => {
      dispatch(fetchDistricteStart())
       storeItem('districtes', data).then(res=>{
         dispatch(storeDistricteSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchDistricteFail(err.message))
        })
    }
  }

  export const updateDistricteAsync = (id, data)=>{
    return dispatch => {
      dispatch(fetchDistricteStart())
       updateItem('districtes', id, data).then(res=>{
         dispatch(updateDistricteSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchDistricteFail(err.message))
        })
    }
  }

  export const removeDistricteAsync = (id, libelle)=>{
    return dispatch => {
      dispatch(fetchDistricteStart())
      removeItem('districtes', id, libelle).then(()=>{
        dispatch(removeDistricteSuccess(id))
      }).catch(err=>{
          dispatch(fetchDistricteFail(err.message))
        })
    }
  }


