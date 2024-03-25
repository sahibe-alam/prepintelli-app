import React from 'react';
import GlobalState from './contexts/GlobalState';
import AppNavigator from './navigation/AppNavigator';
import {ToastProvider} from 'react-native-toast-notifications';

import {StatusBar} from 'react-native';
import {colors} from './utils/commonStyle/colors';
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <GlobalState>
        <ToastProvider
          placement="top"
          successColor={colors.green}
          dangerColor={colors.red}
          warningColor="orange">
          <AppNavigator />
        </ToastProvider>
      </GlobalState>
    </>
  );
};

export default App;
