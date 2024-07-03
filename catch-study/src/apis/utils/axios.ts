import axios from 'axios';
import { SERVER_URL } from '../../config/constants';

const instance = axios.create({
  baseURL: `${SERVER_URL}/api`,
  headers: {
    withCredentials: true,
  },
});

export default instance;
