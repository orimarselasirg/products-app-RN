import AsyncStorage from '@react-native-async-storage/async-storage';
import { Method } from 'axios';

const baseURL = 'http://192.168.1.6:8080/api';

export const cafeFetch = async (endPoint: string, method: Method, contentType: string, data: any) => {
  const token = await AsyncStorage.getItem('token');

  return fetch(`${ baseURL }/${ endPoint }`, {
      method,
      headers: {
          'Content-Type': contentType,
          'Accept': 'application/json',
          'x-token': token || '',
      },
      body: data,
  });
};
