import AsyncStorage from '@react-native-async-storage/async-storage';
export const getJwtToken = async () => {
  const token = await AsyncStorage.getItem('jwtToken');
  return token;
};
