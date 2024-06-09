import { makeRequest } from '../apiClients';

const getCmsContent = async () => {
  makeRequest({
    method: 'GET',
    url: '/cms',
  })
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      return Promise.reject(err);
    });
};

export default getCmsContent;
