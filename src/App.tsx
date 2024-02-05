import React from 'react';
import GlobalState from './contexts/GlobalState';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <>
      <GlobalState>
        <AppNavigator />
      </GlobalState>
    </>
  );
};

export default App;
