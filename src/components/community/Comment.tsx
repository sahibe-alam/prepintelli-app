import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../utils/commonStyle/colors';
import { fontSizes, spacing } from '../../utils/commonStyle';
import Images from '../../resources/Images';
import Lightbox from 'react-native-lightbox-v2';
import timeAgo from '../../utils/timeAgo';
const Comment = ({ item }: { item: any }) => {
  const [readMore, setReadMore] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const styles = getStyle();
  const handleTextLayout = (event: any) => {
    const { lines } = event.nativeEvent;
    if (lines.length > 2) {
      !readMore && setIsTruncated(true);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.dpWrapper}>
          <Image
            style={styles.dp}
            source={
              item?.profilePic ? { uri: item?.profilePic } : Images.userDp
            }
          />
        </View>
        <View style={styles.commentWrapper}>
          <View style={styles.userNameWrapper}>
            <View>
              <Text style={styles.userName}>{item?.userName}</Text>
              <Text style={styles.postTime}>{timeAgo(item?.commentDate)}</Text>
            </View>
            <TouchableOpacity style={styles.dotsBtn} activeOpacity={0.7}>
              <Image
                style={styles.dots}
                source={Images.ThreeDotsVertical}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.postContainer}>
            {item?.comment && (
              <Text
                style={[
                  styles.postText,
                  { paddingBottom: item?.commentImg ? 10 : 0 },
                ]}
                numberOfLines={isTruncated ? 2 : undefined}
                onTextLayout={handleTextLayout}
              >
                {item?.comment}
              </Text>
            )}
            {isTruncated && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setReadMore(!readMore);
                  setIsTruncated(!isTruncated);
                }}
              >
                <Text style={styles.readMore}>see more</Text>
              </TouchableOpacity>
            )}
          </View>
          {item?.commentImg && (
            <View style={styles.postMediaWrapper}>
              {/* @ts-ignore */}
              <Lightbox
                activeProps={{
                  resizeMode: 'contain',
                }}
                backgroundColor="rgba(0, 0, 0, 0.8)"
              >
                <Image
                  style={styles.postImage}
                  source={{ uri: item?.commentImg }}
                />
              </Lightbox>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const getStyle = () => {
  return StyleSheet.create({
    postImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 5,
    },
    postMediaWrapper: {
      width: '40%',
      aspectRatio: 1 / 1,
      borderRadius: 5,
    },
    userNameWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dots: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
    },
    dotsBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 20,
      height: 20,
    },
    commentWrapper: {
      flex: 1,
      backgroundColor: colors.light_grey,
      padding: spacing.s,
      borderRadius: 10,
    },
    readMore: {
      fontSize: fontSizes.p3,
      color: colors.grey,
      paddingVertical: 4,
      fontWeight: '500',
    },
    postText: {
      fontSize: fontSizes.p3,
      color: colors.black,
    },
    postContainer: {
      paddingTop: spacing.m,
    },
    postTime: {
      fontSize: 12,
      color: colors.grey,
    },
    userName: {
      fontSize: fontSizes.p3,
      fontWeight: '500',
      color: colors.black,
    },
    wrapper: {
      flexDirection: 'row',
      gap: spacing.s,
    },
    dp: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    dpWrapper: {
      width: 30,
      height: 30,
      borderRadius: 100,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.grey,
    },
    container: {
      paddingHorizontal: spacing.l,
      marginBottom: spacing.xl,
    },
  });
};
export default Comment;
