import axios, { AxiosRequestConfig } from 'axios';
import { LLM_API_KEY, BACKEND_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const llmClient = axios.create({
  headers: {
    Authorization: 'Bearer ' + LLM_API_KEY,
    'Content-Type': 'application/json',
  },
});
const client = axios.create({
  baseURL: `${'http://192.168.1.7:4000'}/api`,
});
export const makeRequest = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    console.log(
      BACKEND_URL,
      'BACKEND_URL  BACKEND_URL BACKEND_URL BACKEND_URL'
    );
    // Retrieve the authentication token from AsyncStorage
    const authToken = await AsyncStorage.getItem('jwtToken');
    const response = await client.request<T>({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${authToken}`, // Using the stored authentication token
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
