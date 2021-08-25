import roleTypeActuions from "./role.types";

export const fetchRoleByIdSuccess = id => ({
  type: roleTypeActuions.FETCH_ROLE_BY_ID,
  payload:  id
});

export const fetchRoleStart = ()=>({
  type:roleTypeActuions.FETCH_ROLE_START
});


export const fetchRoleSuccess = users =>({
  type:roleTypeActuions.FETCH_ROLE_SUCCESS,
  payload:users
});

export const fetchRoleFail = errorMessage =>({
  type:roleTypeActuions.FETCH_ROLE_FAILLURE,
  payload:errorMessage
});


export const storeRoleSuccess = user =>({
  type:roleTypeActuions.STORE_ROLE_SUCCESS,
  payload:user
});

export const updateRoleSuccess = user =>({
  type:roleTypeActuions.UPDATE_ROLE_SUCCESS,
  payload:user
});

export const removeRoleSuccess = id =>({
  type:roleTypeActuions.REMOVE_ROLE_SUCCESS,
  payload:id
});

export const fetchPermissionSuccess = users =>({
  type:roleTypeActuions.FETCH_PERMISSION_SUCCESS,
  payload:users
});







  