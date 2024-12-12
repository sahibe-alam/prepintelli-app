import React from 'react';
import GlobalState from './contexts/GlobalState';
import AppNavigator from './navigation/AppNavigator';
import { ToastProvider } from 'react-native-toast-notifications';
// import { MobileAds } from 'react-native-google-mobile-ads';

import { StatusBar } from 'react-native';
import { colors } from './utils/commonStyle/colors';
const App = () => {
  // MobileAds()
  //   .initialize()
  //   .then((adapterStatuses) => {
  //     console.log(adapterStatuses);
  //   });
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <GlobalState>
        <ToastProvider
          placement="bottom"
          offsetBottom={50}
          successColor={colors.green}
          dangerColor={colors.red}
          warningColor="orange"
        >
          <AppNavigator />
        </ToastProvider>
      </GlobalState>
    </>
  );
};

export default App;
