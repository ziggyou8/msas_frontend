import { getItem, getItems, removeItem, storeItem, updateItem } from '../../utilities/request.utility';
import { fetchPermissionSuccess, fetchRoleByIdSuccess, fetchRoleFail, fetchRoleStart, fetchRoleSuccess, removeRoleSuccess, storeRoleSuccess, updateRoleSuccess } from './role.actions';


  export const fetchRolesAsync = ()=>{
    return (dispatch) => {
      dispatch(fetchRoleStart())
       getItems('roles').then(res=>{
         dispatch(fetchRoleSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchRoleFail(err.message))
        })
    }
  }

  export const fetchRoleByIdAsync = id=>{
    return dispatch => {
      dispatch(fetchRoleStart())
      getItem('roles', id).then(res=>{
         dispatch(fetchRoleByIdSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchRoleFail(err.message))
        })
    }
  }

  export const storeRoleAsync = (data)=>{
    return dispatch => {
      dispatch(fetchRoleStart())
       storeItem('roles', data).then(res=>{
         dispatch(storeRoleSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchRoleFail(err.message))
        })
    }
  }

  export const updateRoleAsync = (id, data)=>{
    return dispatch => {
      dispatch(fetchRoleStart())
       updateItem('roles', id, data).then(res=>{
         dispatch(updateRoleSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchRoleFail(err.message))
        })
    }
  }

  export const removeRoleAsync = (id, libelle)=>{
    return dispatch => {
      dispatch(fetchRoleStart())
      removeItem('roles', id, libelle).then(()=>{
        dispatch(removeRoleSuccess(id))
      }).catch(err=>{
          dispatch(fetchRoleFail(err.message))
        })
    }
  }

  export const fetchPermissionsAsync = ()=>{
    return (dispatch) => {
      dispatch(fetchRoleStart())
       getItems('permissions').then(res=>{
         dispatch(fetchPermissionSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchRoleFail(err.message))
        })
    }
  }
