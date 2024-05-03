import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {fontSizes} from '../utils/commonStyle';
import {colors} from '../utils/commonStyle/colors';

const NoExamTarget = ({onPress}: {onPress: () => void}) => {
  const styles = getStyles();
  return (
    <View style={styles.noExamTarget}>
      <View style={styles.noExamTargetWrapper}>
        <Text style={styles.noExamTargetText}>No exam target 🙁</Text>

        <TouchableOpacity onPress={onPress}>
          <Text style={styles.noExamTargetBtn}>Click to target</Text>
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
    },
    noExamTargetText: {
      fontSize: fontSizes.p,
      color: colors.black,
    },
    noExamTarget: {
      backgroundColor: colors.lightBg,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default NoExamTarget;
