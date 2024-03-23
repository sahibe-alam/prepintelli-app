import {View, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getJwtToken} from '../utils/commonServices';

const StartApp = ({navigation}: any) => {
  const checkIfAppLaunchedBefore = async () => {
    try {
      const value = await AsyncStorage.getItem('appLaunchedBefore');
      return value;
    } catch (error) {
      console.log('Error checking if app launched before:', error);
    }
  };
  const isLogin = () => {
    getJwtToken().then(token => {
      if (token) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('Login');
      }
    });
  };
  useEffect(() => {
    checkIfAppLaunchedBefore().then(value => {
      if (value) {
        isLogin();
      } else {
        navigation.navigate('Splash');
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../src/assets/img/Logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default StartApp;
