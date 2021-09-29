import axios from 'axios';    

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = 'Bearer '+localStorage.getItem('token');
    config.headers['Content-Type'] = 'application/json';
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
 
  //config.baseURL = 'http://localhost:8000/api/v1/';
  config.baseURL = 'http://176.31.107.205/msas_backend/public/api/v1/';

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
};