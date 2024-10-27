import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Button from '../Button';
import { colors } from '../../utils/commonStyle/colors';
import { fontSizes, spacing } from '../../utils/commonStyle';

const NoPost = ({
  navigation,
  title = 'Community Feed is Empty 📭',
  desc = 'Be the first to share your knowledge and connect with others! 🌟',
}: {
  navigation: any;
  title?: string;
  desc?: string;
}) => {
  const styles = getStyles();
  return (
    <View style={styles.noPostWrapper}>
      <View>
        <View style={styles.imgWrapper}>
          <Image
            style={styles.noPostImg}
            source={{
              uri: 'https://res.cloudinary.com/prepintelli/image/upload/v1722527652/assets/jdi0dfp7ztji8khmmnyw.png',
            }}
          />
        </View>
        <View style={styles.textDesc}>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
          <Button
            title="Create New Post"
            onPress={() => navigation.navigate('PostScreen', { image: '' })}
          />
        </View>
      </View>
    </View>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    desc: {
      textAlign: 'center',
      paddingVertical: 10,
      fontSize: fontSizes.p2,
      paddingBottom: 20,
      color: colors.black,
    },
    heading: {
      fontSize: fontSizes.h5,
      fontWeight: '500',
      paddingTop: 20,
      textAlign: 'center',
      color: colors.black,
    },
    textDesc: {
      paddingHorizontal: spacing.l,
    },
    noPostImg: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    imgWrapper: {
      aspectRatio: 1 / 0.5,
      width: '100%',
    },
    noPostWrapper: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
export default NoPost;
