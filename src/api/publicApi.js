import axios from 'axios';

const publicApi = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export default publicApi;