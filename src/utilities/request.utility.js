import swal from "sweetalert";
import http from "./axio.config";

export const removeItem = (url, id, libelle) => {
  return swal({
    title: `Etes vous sûr de voulour supprimer "${libelle}"?`,
    text: "La suppression sera définitive!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Supprimer avce succés", {
        icon: "success",
      });
      http.delete(url, id);
      return true;
    } else {
      swal("Suppression Annulée!");
      return false;
    }
  });
};

export const getItemValidate = (url, id) => {
  return swal({
    title: `Etes vous sûr de voulour passer a la validation?`,
    text: "Assurez-vous que les informations saisis sont exactes.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Valider avec succées", {
        icon: "success",
      });
      http.get(`${url}/${id}`);
      return true;
    } else {
      swal("Validation Annulée!");
      return false;
    }
  });
  // return http.get(`${url}/${id}`);
};

export const getItems = (url) => {
  return http.get(url);
};

export const getItem = (url, id) => {
  return http.get(`${url}/${id}`);
};

export const storeItem = (url, data) => {
  return http.post(url, data);
};
export const storeItemWithUplodingFile = (url, data) => {
  return http.postUpload(url, data);
};

export const updateItem = (url, id, data) => {
  return http.post(`${url}/${id}?_method=PUT`, data);
};
