import axios from 'axios';    

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = 'Bearer '+localStorage.getItem('token');
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;

    if(process.env.NODE_ENV ==="development"){
      config.baseURL = 'http://localhost:8000/api/v1/';
  }else{
    config.baseURL = 'http://localhost:8000/api/v1/';
  }

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