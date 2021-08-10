import axios from "axios";

export const removeItem = async (url,id)=>{
  await axios.delete(`${url}/${id}`);
}

export const getItem = async(url, id)=>{
    await axios.get(`${url}/${id}`);
}

export const storeItem =async(url, data)=>{
    axios.post( url, data)
}

export const updateItem =async(url,id, data)=>{
    axios.post(`${url}/${id}?_method=PUT`, data)
}