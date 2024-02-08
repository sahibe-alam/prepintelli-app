import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/commonStyle/colors';

const Gradient = ({children}: {children: React.ReactNode}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[colors.purle, colors.blue]}>
      {children}
    </LinearGradient>
  );
};

export default Gradient;
