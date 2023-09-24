import axios from 'axios';

axios.defaults.baseURL = 'https://8000-camerong-dev-car-collect-yhax1lcp0i.us2.codeanyapp.com/api';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();