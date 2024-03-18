import AsyncStorage from '@react-native-async-storage/async-storage';
export const getJwtToken = () => {
  try {
    const token = 'your_static_token_here'; // Replace with your desired static token

    // const token = AsyncStorage.getItem('jwtToken');
    return token || false;
  } catch (error) {
    console.error('Error retrieving JWT token from AsyncStorage:', error);
    return false;
  }
};
