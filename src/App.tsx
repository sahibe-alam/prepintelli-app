import React, {useEffect, useState} from 'react';
import GlobalState from './contexts/GlobalState';
import AppNavigator from './navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './screens/Splash';
import {Text} from 'react-native';
import {getJwtToken} from './utils/commonServices';
import LoginScreen from './screens/Auth/LoginScreen';
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
