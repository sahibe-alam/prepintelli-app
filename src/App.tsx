import {StatusBar, View} from 'react-native';
import React from 'react';
import Button from './components/Button';
import {colors} from './utils/commonStyle/colors';

const App = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.lightBg,
      }}>
      <Button outline={false} title="Button Title" />
    </View>
  );
};

export default App;
