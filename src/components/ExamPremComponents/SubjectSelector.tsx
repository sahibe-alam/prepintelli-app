import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/commonStyle/colors';
import {fontSizes, spacing} from '../../utils/commonStyle';
import InputField from '../formComponents/InputField';

const SubjectSelector = () => {
  const [circle, setCircle] = useState(false);
  const styles = getStyles();
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.labelText}>Type your exam subjects</Text>
        <View style={styles.inputWrapper}>
          <InputField placeholder="Enter subject 1" />
          <TouchableOpacity
            style={[
              styles.circleBtn,
              {backgroundColor: circle ? colors.light_red : colors.light_blue},
            ]}>
            <Text
              style={[
                styles.circleText,
                {color: circle ? colors.red : colors.blue},
              ]}>
              {circle ? '-' : '+'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    labelText: {
      color: colors.black,
      fontSize: fontSizes.p2,
    },
    inputWrapper: {
      flexDirection: 'row',
      gap: spacing.s,
      alignItems: 'center',
    },
    circleText: {
      fontSize: fontSizes.h4,
      lineHeight: 26,
    },
    circleBtn: {
      height: 32,
      width: 32,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      paddingHorizontal: spacing.l,
    },
  });
export default SubjectSelector;
