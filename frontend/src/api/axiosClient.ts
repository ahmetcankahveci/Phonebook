import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/phonebook', // Backend URL'sini buraya ekleyin
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
