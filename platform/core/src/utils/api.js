import axios from 'axios';

export default axios.create({
  baseURL: process.env.VIEWERS_SERVICE_BASE_URL,
  responseType: 'json',
});
