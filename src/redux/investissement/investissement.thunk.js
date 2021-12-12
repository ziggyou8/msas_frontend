import {
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
      })
      .catch((err) => {
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
