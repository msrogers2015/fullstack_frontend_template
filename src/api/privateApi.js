import axios from 'axios';

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