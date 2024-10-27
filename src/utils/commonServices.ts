import AsyncStorage from '@react-native-async-storage/async-storage';
export const getJwtToken = async () => {
  const token = await AsyncStorage.getItem('jwtToken');
  return token;
};

export const setLoginToken = async (jwtToken: string) => {
  await AsyncStorage.setItem('jwtToken', jwtToken);
};

export const removeLoginToken = async () => {
  await AsyncStorage.removeItem('jwtToken');
};

export const setUserID = async (userID: string) => {
  await AsyncStorage.setItem('userID', userID);
};

export const getUserID = async () => {
  const userID = await AsyncStorage.getItem('userID');
  return userID;
};
