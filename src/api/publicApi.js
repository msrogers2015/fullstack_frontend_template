import axios from 'axios';

/**
 * Custom axios instance that includes the base url for unprotected calls to the backend.
 * @type {axios.AxiosInstance}
 */
const publicApi = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export default publicApi;