import swal from "sweetalert";
import { toast } from "react-toastify";
import {
  getItem,
  getItems,
  removeItem,
  storeItem,
  updateItem,
  storeItemWithUplodingFile,
} from "../../utilities/request.utility";
import {
  fetchStructureStart,
  fetchStructureByIdSuccess,
  fetchStructureFail,
  updateStructureSuccess,
  removeStructureSuccess,
  storeStructureSuccess,
  fetchStructureSuccess,
  fetchStructureByTypeSuccess,
} from "./structure.action";

export const fetchStructureAsync = () => {
  return (dispatch) => {
    dispatch(fetchStructureStart());
    getItems("structures")
      .then((res) => {
        dispatch(fetchStructureSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(fetchStructureFail(err.message));
      });
  };
};

export const fetchStructureByIdAsync = (id) => {
  return (dispatch) => {
    dispatch(fetchStructureStart());
    getItem("structures", id)
      .then((res) => {
        dispatch(fetchStructureByIdSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(fetchStructureFail(err.message));
      });
  };
};

export const fetchStructureByTypeAsync = (type) => {
  return (dispatch) => {
    dispatch(fetchStructureStart());
    getItem("structures/type_acteur", type)
      .then((res) => {
        dispatch(fetchStructureByTypeSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(fetchStructureFail(err.message));
      });
  };
};

export const storeStructureAsync = (subUrl = "", data) => {
  return (dispatch) => {
    dispatch(fetchStructureStart());
    //storeItem
    storeItemWithUplodingFile(`structures/${subUrl}`, data)
      .then((res) => {
        dispatch(storeStructureSuccess(res.data.data));
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
        dispatch(fetchStructureFail(err.message));
      });
  };
};

export const updateStructureAsync = (id, data) => {
  return (dispatch) => {
    dispatch(fetchStructureStart());
    updateItem("structures", id, data)
      .then((res) => {
        dispatch(updateStructureSuccess(res.data.data));
        toast.success(`Modifié avec succés`, {
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
        toast.error("Error lors de l'ajout", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(fetchStructureFail(err.message));
      });
  };
};

export const removeStructureAsync = (id, libelle) => {
  return (dispatch) => {
    dispatch(fetchStructureStart());
    removeItem("structures", id, libelle)
      .then(() => {
        dispatch(removeStructureSuccess(id));
      })
      .catch((err) => {
        dispatch(fetchStructureFail(err.message));
      });
  };
};
