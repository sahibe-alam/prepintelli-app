import React, {useRef, useEffect} from 'react';
import {Animated, Easing, View, StyleSheet} from 'react-native';
import {colors} from '../../utils/commonStyle/colors';

const PulseDot = ({
  delay,
  color = colors.purple,
}: {
  delay: number;
  color?: string;
}) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    setTimeout(() => {
      startAnimation();
    }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 1.2],
  });
  const styles = getStyles(color);

  return (
    <Animated.View style={[styles.dot, {transform: [{scale: pulseScale}]}]} />
  );
};
const ThreePulseDots = ({color = colors.purple}: {color?: string}) => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <PulseDot color={color} delay={0} />
      <PulseDot color={color} delay={300} />
      <PulseDot color={color} delay={600} />
    </View>
  );
};

const getStyles = (color?: string) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 10,
      backgroundColor: color,
      marginHorizontal: 6,
    },
  });
export default ThreePulseDots;
