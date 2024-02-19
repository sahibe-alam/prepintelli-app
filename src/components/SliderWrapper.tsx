import * as React from 'react';
import {Text, View, StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {colors} from '../utils/commonStyle/colors';

interface SliderWrapperProps {
  sliderData: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
}
const SliderWrapper: React.FC<SliderWrapperProps> = ({
  sliderData = ['#26292E', '#899F9C', '#B3C680'],
  renderItem = ({item, index}) => (
    <Text style={{backgroundColor: item, flex: 1}}>{index}</Text>
  ),
}) => {
  const {width} = useWindowDimensions();
  const PAGE_WIDTH = width;
  const progressValue = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: 120,
  };

  return (
    <View style={styles.slideContainer}>
      <Carousel
        {...baseOptions}
        style={{width: PAGE_WIDTH}}
        loop
        pagingEnabled={true}
        snapEnabled={true}
        autoPlay={true}
        autoPlayInterval={1500}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 0,
        }}
        data={sliderData}
        renderItem={renderItem as any}
      />
      {!!progressValue && (
        <View style={styles.dotWrapper}>
          {sliderData?.map((backgroundColor, index) => {
            return (
              <PaginationItem
                backgroundColor={colors.light_grey}
                animValue={progressValue}
                index={index}
                key={index}
                length={sliderData?.length}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
}> = props => {
  const {animValue, index, length, backgroundColor} = props;
  const width = 5;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: 'black',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
      }}>
      <Animated.View
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    position: 'relative',
  },
  dotWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    gap: 6,
    position: 'absolute',
    bottom: 10,
  },
});

export default SliderWrapper;
