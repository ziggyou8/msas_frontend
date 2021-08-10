import userTypeActuions from "./user.types";
import axios from "axios";

export const setCurrentUser = user => ({
    type: userTypeActuions.SET_CURRENT_USER,
    payload:  user
  });

export const getUsersList = user => ({
  type: userTypeActuions.GET_USERS,
  payload:  user
});

export const getUserById = user => ({
  type: userTypeActuions.GET_USER,
  payload:  user
});


export const fetchUserStart = ()=>({
  type:userTypeActuions.FETCH_USER_START
});

export const fetchUserSuccess = users =>({
  type:userTypeActuions.FETCH_USER_SUCCESS,
  payload:users
});

export const fetchUserFail = errorMessage =>({
  type:userTypeActuions.FETCH_USER_FAILLURE,
  payload:errorMessage
});

export const fetchCurrentUserSuccess = user =>({
  type:userTypeActuions.FETCH_CURRENT_USER,
  payload:user
});

export const fetchUsersStratAsync = ()=>{
  return dispatch => {
    dispatch(fetchUserStart())
     axios.get('users').then(res=>{
       dispatch(fetchUserSuccess(res.data.data))
      }).catch(err=>{
        dispatch(fetchUserFail(err.message))
      })
  }
}

export const fetchCurrentUserStratAsync = ()=>{
  return dispatch => {
    dispatch(fetchUserStart())
     axios.get('user').then(res=>{
       dispatch(fetchCurrentUserSuccess(res.data))
      }).catch(err=>{
        dispatch(fetchUserFail(err.message))
      })
  }
}
  