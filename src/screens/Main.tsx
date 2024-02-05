import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const Main = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'grey'}}>
      <Text>Main</Text>
    </SafeAreaView>
  );
};

export default Main;
