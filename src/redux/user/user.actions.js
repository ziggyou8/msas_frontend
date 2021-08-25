import userTypeActuions from "./user.types";

export const fetchUserByIdSuccess = id => ({
  type: userTypeActuions.FETCH_USER_BY_ID,
  payload:  id
});

export const resetEditedUser = () => ({
  type: userTypeActuions.RESET_EDITED_USER,
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
  type:userTypeActuions.FETCH_CURRENT_USER_SUCCESS,
  payload:user
});

export const storeUserSuccess = user =>({
  type:userTypeActuions.STORE_USER_SUCCESS,
  payload:user
});

export const updateUserSuccess = user =>({
  type:userTypeActuions.UPDATE_USER_SUCCESS,
  payload:user
});

export const updateCurrentUserSuccess = user =>({
  type:userTypeActuions.UPDATE_CURRENT_USER_SUCCESS,
  payload:user
});

export const removeUserSuccess = id =>({
  type:userTypeActuions.REMOVE_USER_SUCCESS,
  payload:id
});







  