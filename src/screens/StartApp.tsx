import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getJwtToken, getUserID } from '../utils/commonServices';
import LoadingDots from 'react-native-loading-dots';
import { colors } from '../utils/commonStyle/colors';
import { getUserDetails } from '../api/adapter/getUserDetails';
import { usePrepContext } from '../contexts/GlobalState';
import { useFocusEffect } from '@react-navigation/native';

const StartApp = ({ navigation }: any) => {
  const { setUser } = usePrepContext();
  const checkIfAppLaunchedBefore = async () => {
    try {
      const value = await AsyncStorage.getItem('appLaunchedBefore');
      return value;
    } catch (error) {
      console.log('Error checking if app launched before :', error);
    }
  };
  const isLogin = () => {
    getJwtToken().then((token) => {
      if (token) {
        getUserID().then((id: any) => {
          getUserDetails(id)
            .then((res: any) => {
              setUser && setUser(res.data[0]);
              navigation.navigate('Main');
            })
            .catch((err: any) => {
              console.log(err);
              navigation.navigate('Login');
            });
        });
      } else {
        navigation.navigate('Login');
      }
    });
  };

  useFocusEffect(() => {
    checkIfAppLaunchedBefore().then((value) => {
      if (value) {
        isLogin();
      } else {
        navigation.navigate('Splash');
      }
    });

    return () => {
      // Clean up the effect when the component is unmounted
    };
  });
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require('../../src/assets/img/Logo.png')}
        />
        <View style={styles.loader}>
          <LoadingDots
            colors={[colors.purple, colors.blue, colors.purple, colors.blue]}
            bounceHeight={6}
            size={10}
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
