import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../utils/commonStyle/colors';
import { ViewStyle, StyleProp } from 'react-native'; // Import StyleProp

interface GradientProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>; // Use StyleProp to allow multiple style types
}

const Gradient: React.FC<GradientProps> = ({ children, style }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={style}
      colors={[colors.purple, colors.blue]}
    >
      {children}
    </LinearGradient>
  );
};

export default Gradient;
