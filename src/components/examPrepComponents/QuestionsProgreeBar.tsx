import {View, StyleSheet} from 'react-native';
import React from 'react';
import {spacing} from '../../utils/commonStyle';
import {colors} from '../../utils/commonStyle/colors';
import Gradient from '../Gradient';

const QuestionsProgreeBar = () => {
  const styles = getStyles();
  return (
    <View style={styles.wrapper}>
      <View style={styles.bgProgress}>
        <Gradient style={{height: 10, width: '40%'}} />
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    bgProgress: {
      height: 10,
      backgroundColor: colors.light_grey,
      borderRadius: 20,
      overflow: 'hidden',
    },
    wrapper: {
      paddingHorizontal: spacing.l,
      marginVertical: spacing.m,
    },
  });
export default QuestionsProgreeBar;
