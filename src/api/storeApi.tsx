import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.1.6:8080/api';
// const baseURL = 'https://backendtestrn-production.up.railway.app/api';

const productApi = axios.create({baseURL});


// los interceptos son middleware, y se hacen para que antes de temrinar la ejecucion de un llamado primero se valide lo que este dentro de estos interceptor
productApi.interceptors.request.use(
  async(config) => {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      config.headers['x-token'] = token;
    }
    return config;
  }

);

export default productApi;
