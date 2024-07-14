import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { fontSizes, spacing } from '../../utils/commonStyle';
import Images from '../../resources/Images';
import { colors } from '../../utils/commonStyle/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PostCard = ({
  userName,
  dp,
  postTime,
  postText,
  postMedia,
  likes,
  comments,
}: any) => {
  const [readMore, setReadMore] = React.useState(false);
  const styles = getStyle();
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.cardHeader}>
          <View style={styles.dpWrapper}>
            <Image style={styles.dp} src={dp} />
          </View>
          <View>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.postTime}>{postTime}</Text>
          </View>
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
        <Text style={styles.postText} numberOfLines={readMore ? undefined : 2}>
          {postText}
        </Text>
        {!readMore && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setReadMore(!readMore)}
          >
            <Text style={styles.readMore}>See more</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.postMediaWrapper}>
        <Image style={styles.postImage} src={postMedia} />
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.footerContent}>
          <View style={styles.likeContainer}>
            <Image style={styles.dots} source={Images.gradientLike} />
            <Text style={styles.engagementText}>{likes} likes</Text>
          </View>
          <Text style={styles.engagementText}>{comments} comments</Text>
        </View>
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.postActionBtn} activeOpacity={0.7}>
            <Image style={styles.dots} source={Images.handThumbsUp} />
            <Text style={styles.engagementTextAction}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postActionBtn} activeOpacity={0.7}>
            <Image style={styles.dots} source={Images.chatIc} />
            <Text style={styles.engagementTextAction}>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
// aspect 1/1
const getStyle = () => {
  return StyleSheet.create({
    cardWrapper: {
      backgroundColor: colors.white,
      marginBottom: spacing.m,
      paddingVertical: spacing.m,
      marginVertical: spacing.s,
    },
    postActionBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    engagementTextAction: {
      color: colors.black,
      fontSize: fontSizes.p2,
    },
    postActions: {
      flexDirection: 'row',
      gap: spacing.xxl,
      paddingTop: spacing.m,
    },
    engagementText: {
      color: colors.black,
      fontSize: 12,
    },
    footerContainer: {
      paddingHorizontal: spacing.l,
    },
    footerContent: {
      paddingVertical: 6,
      borderColor: colors.light_grey,
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      justifyContent: 'space-between',
    },
    likeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    postImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    postMediaWrapper: {
      width: '100%',
      aspectRatio: 1 / 1,
      backgroundColor: colors.light_grey,
    },
    postText: {
      fontSize: fontSizes.p3,
      color: colors.black,
    },
    readMore: {
      fontSize: fontSizes.p3,
      color: colors.grey,
      paddingVertical: 4,
      fontWeight: '500',
    },
    postContainer: {
      paddingVertical: spacing.m,
      paddingHorizontal: spacing.l,
    },
    dots: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    dotsBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 24,
      height: 24,
    },
    headerContainer: {
      paddingHorizontal: spacing.l,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
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
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.s,
    },
    dp: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    dpWrapper: {
      width: 36,
      height: 36,
      borderRadius: 100,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.grey,
    },
  });
};
export default PostCard;
