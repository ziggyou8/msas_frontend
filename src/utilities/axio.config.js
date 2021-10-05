import axios from 'axios';    
import swal from 'sweetalert';

const updateToken = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
    }
    return headers;
}

const updateTokenUpload = () => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer '+localStorage.getItem('token')
    }
    return headers;
}

const baseURL = 'http://localhost:8000/api/v1/';

/* axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = 'Bearer '+localStorage.getItem('token');
    config.headers['Content-Type'] = 'application/json';
    //config.headers['X-Requested-With'] = 'XMLHttpRequest';
 
  config.baseURL = 'http://localhost:8000/api/v1/';
  //config.baseURL = 'http://176.31.107.205/msas_backend/public/api/v1/';

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
); */

axios.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response && error.response.status && error.response.status === 401) {
      console.log(error)
    //place your reentry code
   }
   throw error;
});

const login = (url, data) => {
    return axios.post(baseURL + url, data);
}

const get = (url) => {
    
    return axios.get(baseURL + url, {headers: updateToken()});
}

const post = (url, data) => {
    swal({
        title: "Ajout!",
        text: "Enregistrement effectué avec succés!",
        icon: "success",
        button: "Ok!"
      });
    return axios.post(baseURL + url, data, {headers: updateToken()});
}

const postUpload = (url, data) => {
    /* swal({
        title: "Ajout!",
        text: "Enregistrement effectué avec succés!",
        icon: "success",
        button: "Ok!"
      }); */
    return axios.post(baseURL + url, data, {headers: updateTokenUpload()});
}

const remove = (url, id) => {
    return axios.delete(baseURL + url + '/' + id, {headers: updateToken()});
}

/* const getExport = (url) => {
    return axios.get(API.BASE_URL + API.API_PATH + url, {headers: updateToken(),responseType: 'arraybuffer'});
}

const getlocalite = (url) => {
    return axios.get(API_LOCALITE.BASE_URL + API_LOCALITE.API_PATH + url);
}

const post = (url, data) => {
    return axios.post(API.BASE_URL + API.API_PATH + url, data, {headers: updateToken()});
}

const postUpload = (url, data) => {
    var formData = new FormData();
    formData.append("file", data.file);
    formData.append("name", data.name);
    formData.append("idRecipient", data.idRecipient);
    return axios.post(API.BASE_URL + API.API_PATH + url, formData, {headers: updateTokenUpload()});
}

const postUploadBase64 = (url, data) => {
    var formData = new FormData();
    formData.append("base64", data.base64);
    formData.append("name", data.name);
    formData.append("idRecipient", data.idRecipient);
    return axios.post(API.BASE_URL + API.API_PATH + url, formData, {headers: updateTokenUpload()});
}

const patch = (url, data) => {
    return axios.put(API.BASE_URL + API.API_PATH + url, data, {headers: updateToken()});
}

const remove = (url, id) => {
    console.log(API.BASE_URL + API.API_PATH + url + '/' + id)
    return axios.delete(API.BASE_URL + API.API_PATH + url + '/' + id, {headers: updateToken()});
}

const toggle = (url, data) => {
    return axios.put(API.BASE_URL + API.API_PATH + url, data, {headers: updateToken()});
} */

export default {
  get: get, //axios.get,
  post: post,/* axios.post, */
  put: axios.put,
  delete: remove, //axios.delete,
  patch: axios.patch,
  login:login,
  postUpload:postUpload
};