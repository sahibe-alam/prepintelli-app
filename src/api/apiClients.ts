import axios from 'axios';
import {LLM_API_KEY} from '@env';
console.log(LLM_API_KEY);
export const llmClient = axios.create({
  headers: {
    Authorization: 'Bearer ' + LLM_API_KEY,
    'Content-Type': 'application/json',
  },
});
