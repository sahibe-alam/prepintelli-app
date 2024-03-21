import React, {useEffect, useState} from 'react';
import GlobalState from './contexts/GlobalState';
import AppNavigator from './navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './screens/Splash';
import {getJwtToken} from './utils/commonServices';
import LoginScreen from './screens/Auth/LoginScreen';
import {StatusBar} from 'react-native';
const App = () => {
  const [appLaunchedBefore, setAppLaunchedBefore] = useState(false);

  useEffect(() => {
    checkIfAppLaunchedBefore();
  }, []);

  const checkIfAppLaunchedBefore = async () => {
    try {
      const value = await AsyncStorage.getItem('appLaunchedBefore');
      if (value !== null) {
        setAppLaunchedBefore(true);
      }
    } catch (error) {
      console.log('Error checking if app launched before:', error);
    }
  };

  const markAppLaunched = async () => {
    try {
      await AsyncStorage.setItem('appLaunchedBefore', 'true');
      setAppLaunchedBefore(true);
    } catch (error) {
      console.log('Error marking app as launched:', error);
    }
  };
  const isToaken = getJwtToken();
  console.log(isToaken);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <GlobalState>
        {appLaunchedBefore ? (
          <>{isToaken ? <AppNavigator /> : <LoginScreen />}</>
        ) : (
          <Splash markAppLaunched={markAppLaunched} />
        )}
      </GlobalState>
    </>
  );
};

export default App;
