import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';
import {fontSizes, spacing} from '../utils/commonStyle';
interface PropsType {
  onPress?: () => void;
  title?: string;
}
const BackHeader: React.FC<PropsType> = ({onPress, title}) => {
  const styles = getstyles();
  return (
    <View style={styles.backHeader}>
      <TouchableOpacity style={styles.backBtn} onPress={onPress}>
        <Image
          style={styles.backArrow}
          source={require('../assets/img/header_back_arrow.png')}
        />
      </TouchableOpacity>
      <Text style={styles.backTitle}>{title}</Text>
    </View>
  );
};

const getstyles = () =>
  StyleSheet.create({
    backBtn: {
      padding: 10,
      paddingLeft: 0,
    },
    backTitle: {
      color: colors.black,
      fontSize: fontSizes.h5,
    },
    backArrow: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
    },
    backHeader: {
      backgroundColor: colors.white,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 0,
      paddingHorizontal: spacing.l,
      borderBottomWidth: 1,
      borderColor: colors.light_grey,
    },
  });
export default BackHeader;
