import {LLM_URL} from '@env';
import {llmClient} from '../apiClients';

type LlmRequestPayload = {
  model: string;
  messages: {role: string; content: string}[];
  data?: any;
  choices?: any;
};

export const llmTutor = async () => {
  try {
    const response = await llmClient.post<LlmRequestPayload>(LLM_URL, {
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: 'Hello'}],
    });
    return response?.data.choices[0].message;
  } catch {
    console.log('erro');
    return null;
  }
};
