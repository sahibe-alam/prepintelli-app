import React, {useEffect, useState} from 'react';
import GlobalState from './contexts/GlobalState';
import AppNavigator from './navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './screens/Splash';
import {StatusBar} from 'react-native';
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <GlobalState>
        <AppNavigator />
      </GlobalState>
    </>
  );
};

export default App;
