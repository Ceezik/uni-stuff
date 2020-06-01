import axios from 'axios';
import {getData} from './asyncStorage';

const request = axios.create({
  baseURL: 'http://192.168.43.120:8080/',
});

request.defaults.headers.post['Content-Type'] = 'application/json';
request.interceptors.request.use(config => {
  return (async function() {
    const token = await getData('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  })();
});

export default request;
