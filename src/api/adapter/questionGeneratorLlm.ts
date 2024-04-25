import {LLM_URL} from '@env';
import {llmClient} from '../apiClients';

export const questionGeneratorLlm = async (messages: any) => {
  try {
    const res = await llmClient.post(LLM_URL, {
      model: 'gpt-3.5-turbo',
      max_tokens: 4000,
      messages,
    });
    let answer = res.data.choices[0].message.content;
    return Promise.resolve({success: true, data: answer});
  } catch (error: any) {
    return Promise.resolve({success: false, message: error.message});
  }
};
