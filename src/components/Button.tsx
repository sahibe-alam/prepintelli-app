import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import {colors} from '../utils/commonStyle/colors';
import {fontSizes} from '../utils/commonStyle';
import ThreePulseDots from './commonComponents/ThreePulseDots';

interface Props {
  onPress?: () => void;
  title?: string;
  outline?: boolean;
  isLoading?: boolean;
  btnWidth?: ViewStyle['width'];
}
const Button: React.FC<Props> = ({
  onPress,
  title = 'Button',
  outline = false,
  isLoading = false,
  btnWidth = '100%',
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{width: btnWidth}}>
      <LinearGradient
        style={[styles.linearGradient, outline && {padding: 2}]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colors.purle, colors.blue]}>
        <View
          style={[
            styles.btnTextWrapper,
            {
              backgroundColor: outline ? colors.white : 'transparent',
              padding: outline ? 10 : 12,
              height: outline ? 48 : 52,
            },
          ]}>
          {isLoading ? (
            <ThreePulseDots color={outline ? colors.purle : colors.white} />
          ) : (
            <Text
              style={[
                styles.buttonText,
                {color: outline ? colors.blue : colors.white},
              ]}>
              {title}
            </Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({
  btnTextWrapper: {
    borderRadius: 16,
    color: colors.white,
    alignContent: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '100%',
  },
  linearGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: fontSizes.p,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.white,
  },
});
