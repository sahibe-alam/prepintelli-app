import {View, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';

const MyPerformance = () => {
  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <View style={styles.test} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  test: {
    width: 50,
    height: 100,
    opacity: 0.2,
    backgroundColor: 'blue',
  },
  child: {
    width: 50,
    height: 80,
    backgroundColor: 'yellow',
  },

  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenName: {
    color: 'black',
  },
});
export default MyPerformance;
