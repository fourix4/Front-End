import axios from 'axios';
import { CLIENT_URL } from '../../config/constants';

const instance = axios.create({
  baseURL: `${CLIENT_URL}/api/`,
  headers: {
    withCredentials: true,
  },
});

export default instance;
