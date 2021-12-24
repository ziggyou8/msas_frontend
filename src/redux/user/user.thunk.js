import { toast } from "react-toastify";
import {
  getItem,
  getItems,
  removeItem,
  storeItem,
  updateItem,
} from "../../utilities/request.utility";
import {
  fetchCurrentUserSuccess,
  fetchUserByIdSuccess,
  fetchUserFail,
  fetchUserStart,
  fetchUserSuccess,
  removeUserSuccess,
  storeUserSuccess,
  updateCurrentUserSuccess,
  updateUserSuccess,
  activateUserStatusSuccess,
} from "./user.actions";

export const fetchCurrentUserAsync = () => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    getItems("user")
      .then((res) => {
        dispatch(fetchCurrentUserSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err.message));
      });
  };
};

export const fetchUsersAsync = () => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    getItems("users")
      .then((res) => {
        dispatch(fetchUserSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err.message));
      });
  };
};

export const fetchUserByIdAsync = (id) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    getItem("users", id)
      .then((res) => {
        dispatch(fetchUserByIdSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err.message));
      });
  };
};

export const activateUserStatusdAsync = (id) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    getItem("users/status", id)
      .then((res) => {
        dispatch(activateUserStatusSuccess(res.data.data));
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          className: "success-alert",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(fetchUserFail(err.message));
      });
  };
};

export const storeUserAsync = (subUrl = "", data) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    storeItem(`users/${subUrl}`, data)
      .then((res) => {
        dispatch(storeUserSuccess(res.data.data));
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          className: "success-alert",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(fetchUserFail(err.message));
      });
  };
};

export const updateUserAsync = (id, data) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    updateItem("users", id, data)
      .then((res) => {
        dispatch(updateUserSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err.message));
      });
  };
};

export const removeUserAsync = (id, libelle) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    removeItem("users", id, libelle)
      .then(() => {
        dispatch(removeUserSuccess(id));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err.message));
      });
  };
};

export const updateCurrentUserAsync = (id, data) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    updateItem("users", id, data)
      .then((res) => {
        dispatch(updateCurrentUserSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err.message));
      });
  };
};
