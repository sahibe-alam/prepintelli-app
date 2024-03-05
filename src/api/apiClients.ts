import axios from 'axios';

export const llmClient = axios.create({
  headers: {
    Authorization: 'Bearer ' + 'key',
    'Content-Type': 'application/json',
  },
});
