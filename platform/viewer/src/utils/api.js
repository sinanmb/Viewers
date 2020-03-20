import axios from 'axios';

export default axios.create({
  // TODO Sinan: This should come from a config file
  baseURL: 'http://localhost:5000/api/v1',
  responseType: 'json',
});
