import {View} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {colors} from '../../utils/commonStyle/colors';
import {fontSizes} from '../../utils/commonStyle';
interface PropsType {
  activeStrokeColor?: string;
  progressValueColor?: string;
  progressValueStyle?: any;
  activeStrokeWidth?: number;
  inActiveStrokeWidth?: number;
  inActiveStrokeOpacity?: number;
  maxValue?: number;
  value?: number;
  valueSuffix?: string;
}
const CircleProgess: React.FC<PropsType> = props => {
  const {activeStrokeColor, progressValueColor} = props;
  return (
    <View>
      <CircularProgress
        value={50}
        valueSuffix={'%'}
        maxValue={100}
        activeStrokeWidth={14}
        inActiveStrokeOpacity={0.3}
        activeStrokeColor={activeStrokeColor || colors.blue}
        inActiveStrokeColor={colors.grey}
        inActiveStrokeWidth={14}
        progressValueColor={progressValueColor || colors.blue}
        progressValueStyle={{fontSize: fontSizes.p}}
      />
    </View>
  );
};

export default CircleProgess;
