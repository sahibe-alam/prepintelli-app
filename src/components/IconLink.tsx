import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { fontSizes, spacing } from '../utils/commonStyle';
import { colors } from '../utils/commonStyle/colors';
import Gradient from './Gradient';

interface IconLinkProps {
  icon?: string;
  linkText?: string;
  onPress?: any;
}
const IconLink: React.FC<IconLinkProps> = ({ icon, linkText, onPress }) => {
  const styles = getSyle();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Gradient style={styles.iconWrapper}>
        <Image
          style={styles.icon}
          source={icon || require('../assets/img/dp.png')}
        />
      </Gradient>
      <View style={styles.linkWrapper}>
        <Text style={styles.text}>{linkText || 'IconLink'}</Text>
        <Image
          style={styles.arrow}
          source={require('../assets/img/header_back_arrow.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

const getSyle = () =>
  StyleSheet.create({
    icon: {
      width: 22,
      height: 22,
      resizeMode: 'contain',
      tintColor: colors.white,
    },
    iconWrapper: {
      backgroundColor: colors.blue,
      flex: 1,
      maxWidth: 36,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
    },
    text: {
      fontSize: fontSizes.p2,
      color: colors.black,
    },
    container: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: spacing.xl,
    },
    arrow: {
      width: 16,
      tintColor: colors.grey,
      height: 16,
      resizeMode: 'contain',
      transform: [{ rotate: '180deg' }],
    },
    linkWrapper: {
      flexDirection: 'row',
      flex: 1,
      height: 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: colors.light_grey,
    },
  });
export default IconLink;
