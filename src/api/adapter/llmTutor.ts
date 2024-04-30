import {llmClient} from '../apiClients';
import {LLM_URL} from '@env';

export const llmApiCall = async (messages: any[], max_tokens: number) => {
  try {
    const res = await llmClient.post(LLM_URL, {
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: max_tokens,
    });
    let answer = res.data.choices[0].message.content;
    messages.push({role: 'assistant', content: answer.trim()});
    return Promise.resolve({success: true, data: messages});
  } catch (error: any) {
    console.error(error);
    return Promise.resolve({success: false, message: error.message});
  }
};
