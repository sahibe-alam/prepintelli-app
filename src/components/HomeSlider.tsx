import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';
import {fontSizes} from '../utils/commonStyle';
import SliderWrapper from './SliderWrapper';

const HomeSlider = () => {
  const data = [
    {
      title: (
        <Text style={[styles.moduleTag]}>
          🚀 AI-Powered Exam{'\n'}Preparation for any exam
        </Text>
      ),
      desc: 'Prepare for exams with AI-powered modules',
      image: require('../assets/img/exam_ai_img.png'),
    },
    {
      title: (
        <Text style={[styles.moduleTag]}>
          🌟 Master any language with AI-Powered speaking practice 🎙️
        </Text>
      ),
      image: require('../assets/img/lang_ai_img.png'),
      desc: 'Practice languages in live voice chats with our AI powered language learning modules',
    },
  ];

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <>
        <View key={index} style={[styles.slideItem]}>
          <View style={styles.slideContent}>
            <Text style={[styles.moduleTag]}>{item.title}</Text>
            <View style={styles.imgWrapper}>
              <Image source={item.image} style={styles.slideImg} />
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      <SliderWrapper sliderData={data} renderItem={renderItem} />
    </>
  );
};
const styles = StyleSheet.create({
  imgWrapper: {
    width: '30%',
    flex: 1,
    maxWidth: '30%',
  },
  slideImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  slideContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  desc: {
    color: colors.grey,
    fontSize: fontSizes.p2,
  },
  moduleTag: {
    color: colors.white,
    fontSize: fontSizes.p,
    fontWeight: 'bold',
    maxWidth: '70%',
    flex: 1,
  },
  slideItem: {
    marginHorizontal: 20,
    flex: 1,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.blue,
    justifyContent: 'center',
    padding: 10,
  },
});
export default HomeSlider;
