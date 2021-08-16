import swal from 'sweetalert';
import http from "./axio.config";


export const removeItem = (url,id, libelle)=>{
    return swal({
        title: `Etes vous de voulour supprimer "${libelle}"?`,
        text: "La suppression sera définitive!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
            });
            //return removeItem(url, id);
            return http.delete(`${url}/${id}`)
        } else {
            swal("Suppression Annulée!");
            return;
        }
      });
}

export const getItems =(url)=>{
   return http.get(url);
}

export const getItem = (url, id)=>{
   return http.get(`${url}/${id}`);
}

export const storeItem =(url, data)=>{
  return http.post( url, data)
}

export const updateItem =(url,id, data)=>{
   return http.post(`${url}/${id}?_method=PUT`, data)
}