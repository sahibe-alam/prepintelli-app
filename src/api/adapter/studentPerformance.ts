import { makeRequest } from '../apiClients';

const storeSubjectScore = async (
  userId: string,
  subject: string,
  score: number,
  totalQuestions: number,
  subjectIndex: number
) => {
  makeRequest({
    method: 'POST',
    url: '/update-subject-score',
    data: { userId, subject, score, totalQuestions, subjectIndex },
  })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      return Promise.reject(err);
    });
};

const updateAskDoubt = async (userId: string) => {
  makeRequest({
    method: 'POST',
    url: '/update-doubt-ask',
    data: { userId },
  })
    .then((res: any) => {
      return Promise.resolve(res);
    })
    .catch((err: any) => {
      return Promise.reject(err);
    });
};
export { storeSubjectScore, updateAskDoubt };
