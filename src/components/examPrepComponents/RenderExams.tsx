import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Images from '../../resources/Images';
import { fontSizes, spacing } from '../../utils/commonStyle';
import { colors } from '../../utils/commonStyle/colors';

const RenderExams = () => {
  const styles = getStyle();
  return (
    <View style={styles.container}>
      <View style={styles.examCardWrapper}>
        <View style={styles.examCard}>
          <Image style={styles.examIc} source={Images.academicIc} />
          <Text style={styles.examText}>exams</Text>
        </View>
        <View style={styles.examCard}>
          <Image style={styles.examIc} source={Images.academicIc} />
          <Text style={styles.examText}>exams</Text>
        </View>
      </View>
    </View>
  );
};

const getStyle = () => {
  return StyleSheet.create({
    examText: {
      color: colors.black,
      fontSize: fontSizes.p2,
      textTransform: 'capitalize',
    },
    examCardWrapper: {
      flexDirection: 'row',
      gap: spacing.m,
    },
    container: {
      paddingHorizontal: spacing.l,
    },
    examIc: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    examCard: {
      flex: 1,
      flexDirection: 'row',
      gap: spacing.m,
      alignItems: 'center',
      padding: spacing.m,
      backgroundColor: colors.white,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.grey,
    },
  });
};
export default RenderExams;
