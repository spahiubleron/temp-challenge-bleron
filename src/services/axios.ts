import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tracktik-challenge.staffr.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
