import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import {colors} from '../utils/commonStyle/colors';
import {fontSizes, spacing} from '../utils/commonStyle';

interface Props {
  onPress?: () => void;
  title?: string;
  outline?: boolean;
}
const Button: React.FC<Props> = ({
  onPress,
  title = 'Button',
  outline = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.btn]}>
      <LinearGradient
        style={[styles.linearGradient, outline && {padding: 2}]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colors.purle, colors.blue]}>
        <Text
          style={[
            styles.buttonText,
            // eslint-disable-next-line react-native/no-inline-styles
            outline && {
              padding: 12,
              backgroundColor: colors.white,
              color: colors.purle,
            },
          ]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({
  btn: {
    width: '100%',
  },
  linearGradient: {
    borderRadius: 16,
  },
  buttonText: {
    fontSize: fontSizes.p,
    fontWeight: '600',
    textAlign: 'center',
    borderRadius: 16,
    padding: spacing.m,
    color: colors.white,
    backgroundColor: 'transparent',
    width: '100%',
    borderColor: 'transparent',
  },
});
