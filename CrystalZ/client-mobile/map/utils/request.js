import axios from 'axios';
import {getData} from './asyncStorage';

/**
 * Objet request pour les requêtes en BDD
 */
const request = axios.create({
  baseURL: 'http://sterne.iutrs.unistra.fr:8081/',
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
