import { makeRequest } from '../apiClients';

export const getPro = async (
  userId: string,
  planType: string,
  forMonths: number,
  userCredits: number,
  orderId: string,
  amount: number
) => {
  makeRequest({
    method: 'POST',
    url: '/get-pro',
    data: {
      userId: userId,
      planType: planType,
      forMonths: forMonths,
      userCredits: userCredits,
      orderId: orderId,
      amount: amount,
    },
  }).then((res: any) => {
    return Promise.resolve(res);
  });
};
