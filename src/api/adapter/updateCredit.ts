import { makeRequest } from '../apiClients';

export const updateCredit = async (userId: string, credit: number) => {
  try {
    const res = await makeRequest({
      method: 'POST',
      url: '/use-credits',
      data: {
        userId: userId,
        creditsToUse: credit,
      },
    });
    return res; // Return the response from makeRequest
  } catch (error) {
    console.error('Error updating credits:', error);
    throw error; // Optionally re-throw the error or handle it accordingly
  }
};
