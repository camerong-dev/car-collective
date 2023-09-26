import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.post["content-type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosRec = axios.create();
export const axiosRes = axios.create();
