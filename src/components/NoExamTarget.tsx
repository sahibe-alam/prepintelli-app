import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {fontSizes} from '../utils/commonStyle';
import {colors} from '../utils/commonStyle/colors';
import Button from './Button';

const NoExamTarget = ({onPress}: {onPress: () => void}) => {
  const styles = getStyles();
  return (
    <View style={styles.noExamTarget}>
      <View style={styles.noExamTargetWrapper}>
        <Text style={styles.noExamTargetText}>No exam target 🙁</Text>
        <Button
          outline={true}
          title="Target your upcoming exam"
          onPress={onPress}
        />
      </View>
    </View>
  );
};
const getStyles = () =>
  StyleSheet.create({
    noExamTargetWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30,
    },
    noExamTargetText: {
      fontSize: fontSizes.h4,
    },
    noExamTarget: {
      backgroundColor: colors.lightBg,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default NoExamTarget;
