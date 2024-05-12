import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../utils/commonStyle/colors';
import { fontSizes, spacing } from '../utils/commonStyle';
interface PropsType {
  onPress?: () => void;
  title?: string;
  isTimer?: boolean;
}
const BackHeader: React.FC<PropsType> = ({
  onPress,
  title,
  isTimer = false,
}) => {
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
      {isTimer && (
        <View style={styles.counterWrapper}>
          <View style={styles.counter}>
            <Image
              style={styles.timerIc}
              source={require('../assets/img/timer_ic.png')}
            />
            <Text style={styles.counterText}>10:00</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const getstyles = () =>
  StyleSheet.create({
    counter: {
      backgroundColor: colors.light_purple,
      paddingHorizontal: spacing.m,
      paddingVertical: 4,
      borderRadius: 20,
      alignItems: 'center',
      flexDirection: 'row',
      minWidth: 90,
      justifyContent: 'center',
      gap: 4,
    },
    timerIc: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
    },
    counterText: {
      color: colors.purple,
      fontSize: fontSizes.p,
    },
    counterWrapper: {
      flex: 1,
      alignItems: 'flex-end',
    },
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
