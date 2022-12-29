import axios from 'axios';
import * as config from './config';

const instance = axios.create({
  baseURL: 'https://api.spoonacular.com',
  params: {
    apiKey: config.API_KEY,
  },
  timeout: 10000,
});

export default instance;
