import axios from 'axios';

/**
 * Custom axios instance that includes the root url as sends the user token to the backend for validation.
 * @type {axios.AxiosInstance}
 */
const privateApi = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

// Add token to every request
privateApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default privateApi;