import {View, Text} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {colors} from '../../utils/commonStyle/colors';
import {fontSizes} from '../../utils/commonStyle';

const CircleProgess = () => {
  return (
    <View>
      <CircularProgress
        value={50}
        valueSuffix={'%'}
        maxValue={100}
        activeStrokeWidth={20}
        inActiveStrokeOpacity={0.3}
        activeStrokeColor={colors.purle}
        inActiveStrokeWidth={20}
        progressValueColor={colors.purle}
        progressValueStyle={{fontSize: fontSizes.p}}
      />
    </View>
  );
};

export default CircleProgess;
