import { createSelector } from "reselect";



export const selectRoles = state => state.role;


export const selectListRole = createSelector(
    [selectRoles],
    role => role.roles
);
export const selectListPermission = createSelector(
    [selectRoles],
    role => role.permissions
);
export const selectRoleById = createSelector(
    [selectRoles],
    role => role.roleById
);