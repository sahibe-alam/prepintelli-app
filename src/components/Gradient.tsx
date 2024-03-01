import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/commonStyle/colors';
import {ViewStyle} from 'react-native';
interface GradientProps {
  children?: React.ReactNode;
  style?: ViewStyle; // Define style prop with ViewStyle type
}
const Gradient: React.FC<GradientProps> = ({children, style}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={style}
      colors={[colors.purle, colors.blue]}>
      {children}
    </LinearGradient>
  );
};

export default Gradient;
