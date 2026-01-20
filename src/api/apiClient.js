import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://staging-api.naibeau.com/api/v1'; 
const API_URL1 = 'https://staging-api.naibeau.com/api/v2'; 

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const apiClient1 = axios.create({
  baseURL: API_URL1,
  headers: { 'Content-Type': 'application/json' },
});
apiClient.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient1.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
export { apiClient1 };
