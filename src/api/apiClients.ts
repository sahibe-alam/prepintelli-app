import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {LLM_API_KEY, BACKEND_URL} from '@env';
export const llmClient = axios.create({
  headers: {
    Authorization: 'Bearer ' + LLM_API_KEY,
    'Content-Type': 'application/json',
  },
});

const client = axios.create({
  baseURL: BACKEND_URL,
});

export const makeRequest = async <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  try {
    const response = await client.request<T>(config);
    return response;
  } catch (error) {
    throw error;
  }
};
