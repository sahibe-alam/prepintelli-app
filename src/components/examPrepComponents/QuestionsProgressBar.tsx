import {View, StyleSheet, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import {spacing} from '../../utils/commonStyle';
import {colors} from '../../utils/commonStyle/colors';

interface QuestionsProgressBarProps {
  totalQuestions?: number;
  currentQuestionNumber?: number;
}

const QuestionsProgressBar: React.FC<QuestionsProgressBarProps> = ({
  totalQuestions = 10,
  currentQuestionNumber = 5,
}) => {
  const [progressWidth] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progressWidth, {
      toValue: (currentQuestionNumber / totalQuestions) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentQuestionNumber, totalQuestions, progressWidth]);

  const widthInterpolate = progressWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const styles = getStyles();
  return (
    <View style={styles.wrapper}>
      <View style={styles.bgProgress}>
        <Animated.View
          style={{
            height: 10,
            backgroundColor: colors.purle,
            width: widthInterpolate,
          }}
        />
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    bgProgress: {
      height: 10,
      backgroundColor: colors.light_purple,
      borderRadius: 20,
      overflow: 'hidden',
    },
    wrapper: {
      paddingHorizontal: spacing.l,
      marginVertical: spacing.m,
    },
  });

export default QuestionsProgressBar;
