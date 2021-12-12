import { createSelector } from "reselect";

export const selectUers = (state) => state.user;

export const selectListUser = createSelector(
  [selectUers],
  (user) => user.listUsers
);
export const selectCurrentUser = createSelector(
  [selectUers],
  (user) => user.currentUser
);
export const selectUserById = createSelector(
  [selectUers],
  (user) => user.userById
);
export const isLoading = createSelector([selectUers], (user) => user.isLoading);

/* export const selectListUserWithoutAdmin = createSelector(
    [selectListUser],
    user =>  user.filter(user => user.roles === "REDACTEUR")
); */
