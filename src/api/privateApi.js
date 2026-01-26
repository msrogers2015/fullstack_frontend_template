import axios from 'axios';

const privateApi = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

// Add token to every request
privateApi.interceptors.request.use((config) => {
  const tokenKey= process.env.REACT_APP_TOKEN
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN);
  console.log(tokenKey, token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default privateApi;