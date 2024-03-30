import {makeRequest} from '../apiClients';

export const getUserDetails = async (userId: string) => {
  if (userId) {
    const res = await makeRequest({
      url: `/userdetails/${userId}`,
      method: 'GET',
    });

    return res;
  }
};
