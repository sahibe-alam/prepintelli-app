import {View, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getJwtToken} from '../utils/commonServices';
import LoadingDots from 'react-native-loading-dots';
import {colors} from '../utils/commonStyle/colors';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require('../../src/assets/img/Logo.png')}
        />
        <View style={styles.loader}>
          <LoadingDots
            colors={[colors.purle, colors.blue, colors.purle, colors.blue]}
            bounceHeight={10}
            size={14}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    paddingTop: 40,
    display: 'flex',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default StartApp;
