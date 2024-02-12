import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';

const CreateExam = () => {
  return (
    <View style={styles.container}>
      <Text>CreateExam</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CreateExam;
