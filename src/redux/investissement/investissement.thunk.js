import { toast } from "react-toastify";
import {
  getItemValidate,
  getItem,
  getItems,
  removeItem,
  storeItem,
  updateItem,
} from "../../utilities/request.utility";
import {
  fetchInvestissementByStructureSuccess,
  fetchInvestissementFail,
  fetchInvestissementByIdSuccess,
  storeInvestissementSuccess,
  updateInvestissementSuccess,
  removeInvestissementSuccess,
  fetchInvestissementStart,
  fetchInvestissementSuccess,
  validationInvestissementSuccess,
  rejectInvestissementSuccess,
} from "./investissement.actions";

export const fetchInvestissementsByStructureAsync = () => {
  return (dispatch) => {
    dispatch(fetchInvestissementStart());
    getItems("user")
      .then((res) =>
        getItems(`investissements_by_structure/${res.data.data.structure.id}`)
      )
      .then((response) => {
        dispatch(fetchInvestissementByStructureSuccess(response.data.data));
      })
      .catch((err) => {
        dispatch(fetchInvestissementFail(err.message));
      });
  };
};

export const fetchInvestissementsAsync = () => {
  return (dispatch) => {
    dispatch(fetchInvestissementStart());
    getItems("investissements")
      .then((res) => {
        dispatch(fetchInvestissementSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(fetchInvestissementFail(err.message));
      });
  };
};

export const fetchInvestissementByIdAsync = (id) => {
  return (dispatch) => {
    dispatch(fetchInvestissementStart());
    getItem("investissements", id)
      .then((res) => {
        dispatch(fetchInvestissementByIdSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(fetchInvestissementFail(err.message));
      });
  };
};

export const validationInvestissementAsync = (id) => {
  return (dispatch) => {
    dispatch(fetchInvestissementStart());
    getItem("investissements_validation", id)
      .then((res) => {
        dispatch(validationInvestissementSuccess(res.data.data));
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
        dispatch(fetchInvestissementFail(err.message));
      });
  };
};

export const rejectInvestissementAsync = (id) => {
  return (dispatch) => {
    dispatch(fetchInvestissementStart());
    getItem("investissements_rejection", id)
      .then((res) => {
        dispatch(rejectInvestissementSuccess(res.data.data));
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
        dispatch(fetchInvestissementFail(err.message));
      });
  };
};

/* export const fetchInvestissementByFinancementAsync = (id) => {
  return (dispatch) => {
    dispatch(fetchInvestissementStart());
    getItem("Investissements-by-financement", id)
      .then((res) => {
        dispatch(fetchInvestissementByFinancementSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(fetchInvestissementFail(err.message));
      });
  };
}; */

export const storeInvestissementAsync = (data) => {
  return (dispatch) => {
    dispatch(fetchInvestissementStart());
    storeItem("investissements", data)
      .then((res) => {
        dispatch(storeInvestissementSuccess(res.data.data));
        console.log();
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
        console.log(err);
        dispatch(fetchInvestissementFail(err.message));
      });
  };
};

export const updateInvestissementAsync = (id, data) => {
  return (dispatch) => {
    dispatch(fetchInvestissementStart());
    updateItem("investissements", id, data)
      .then((res) => {
        dispatch(updateInvestissementSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(fetchInvestissementFail(err.message));
      });
  };
};

export const removeInvestissementeAsync = (id, libelle) => {
  return (dispatch) => {
    dispatch(fetchInvestissementStart());
    removeItem("investissements", id, libelle)
      .then(() => {
        dispatch(removeInvestissementSuccess(id));
      })
      .catch((err) => {
        dispatch(fetchInvestissementFail(err.message));
      });
  };
};
