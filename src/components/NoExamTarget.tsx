import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { fontSizes } from '../utils/commonStyle';
import { colors } from '../utils/commonStyle/colors';
import Images from '../resources/Images';

const NoExamTarget = ({ onPress }: { onPress: () => void }) => {
  const styles = getStyles();
  return (
    <View style={styles.noExamTarget}>
      <View style={styles.noExamTargetWrapper}>
        <Image source={Images.noExam} />
        <Text style={styles.noExamTargetText}>
          Oops! It looks like you haven't set an exam target yet.
        </Text>

        <TouchableOpacity onPress={onPress}>
          <Text style={styles.noExamTargetBtn}>Set target exam</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const getStyles = () =>
  StyleSheet.create({
    noExamTargetBtn: {
      color: colors.blue,
    },
    noExamTargetWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      maxWidth: '80%',
    },
    noExamTargetText: {
      fontSize: fontSizes.p,
      color: colors.black,
      textAlign: 'center',
      paddingTop: 20,
    },
    noExamTarget: {
      backgroundColor: colors.lightBg,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default NoExamTarget;
