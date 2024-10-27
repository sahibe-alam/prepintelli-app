import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../../utils/commonStyle/colors';
import { fontSizes, spacing } from '../../utils/commonStyle';
import Images from '../../resources/Images';

const LogoTitle = ({ title }: { title: string }) => {
  const styles = getStyle();
  return (
    <View style={styles.wrapper}>
      <Image style={styles.logo} source={Images.logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const getStyle = () =>
  StyleSheet.create({
    wrapper: {},
    title: {
      fontSize: fontSizes.h4,
      color: colors.black,
      fontWeight: '600',
      textAlign: 'center',
      paddingBottom: spacing.l,
    },
    logo: {
      objectFit: 'contain',
      width: 70,
      height: 70,
      alignSelf: 'center',
    },
  });
export default LogoTitle;
