import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fontSizes, spacing } from '../../utils/commonStyle';
import Images from '../../resources/Images';
import { colors } from '../../utils/commonStyle/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { usePrepContext } from '../../contexts/GlobalState';
import { makeRequest } from '../../api/apiClients';
import Lightbox from 'react-native-lightbox-v2';
import BottomHalfModal from '../commonComponents/BottomHalfModal';
import { useToast } from 'react-native-toast-notifications';

type PostCardProps = {
  item: any;
  navigation?: any;
  isCommentScreen?: boolean;
  onPressComment?: () => void;
};
const PostCard: React.FC<PostCardProps> = ({
  item,
  navigation,
  isCommentScreen = true,
  onPressComment = () => {},
}) => {
  const [readMore, setReadMore] = React.useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const styles = getStyle();
  const [likes, setLikes] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const { user, setGetPosts } = usePrepContext();
  const [isLikeDisable, setIsLikeDisable] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toast = useToast();
  const handleTextLayout = (event: any) => {
    const { lines } = event.nativeEvent;
    if (lines.length > 2) {
      !readMore && setIsTruncated(true);
    }
  };
  function timeAgo(dateString: string) {
    const date: any = new Date(dateString);
    const now: any = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
    }
  }

  const handleLike = () => {
    setIsLike(!isLike);
    setIsLikeDisable(true);
    setLikes((prevLikes) => prevLikes + (isLike ? -1 : 1));
    makeRequest({
      method: 'POST',
      url: '/like-post',
      data: {
        postId: item?._id,
        userId: user?._id,
      },
    })
      .then((res: any) => {
        setLikes(Number(res?.data?.data?.likesBy?.length));
        isUserLiked(res?.data?.data?.likesBy);
        setIsLikeDisable(false);
      })
      .catch((err: any) => {
        setIsLikeDisable(false);
        console.log(err.message, 'err hai');
      });
  };

  const isUserLiked = (totalLikes: any) => {
    return totalLikes?.some((like: any) => {
      return like?.userId === user?._id;
    });
  };
  useEffect(() => {
    // convert string to number
    setLikes(Number(item?.likesBy?.length));
    setIsLike(isUserLiked(item?.likesBy));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const deletePost = () => {
    makeRequest({
      method: 'POST',
      url: '/delete-post',
      data: {
        postId: item?._id,
      },
    })
      .then(() => {
        toast.show('Post deleted successfully', {
          type: 'success',
        });
        // remove deleted post from getPosts
        setGetPosts &&
          setGetPosts((prevPosts: any) =>
            prevPosts.filter((post: any) => post._id !== item?._id)
          );
      })
      .catch((err: any) => {
        console.log(err.message, 'err hai');
      });
  };
  const deletePostHandler = () => {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deletePost();
        },
      },
    ]);
  };
  console.log(item?.sharedBy?.userId, user?._id, 'shared by');
  return (
    <>
      <View style={styles.cardWrapper}>
        <View style={styles.headerContainer}>
          <View style={styles.cardHeader}>
            <View style={styles.dpWrapper}>
              <Image
                style={styles.dp}
                source={
                  item?.sharedBy?.profilePic
                    ? { uri: item?.sharedBy?.profilePic }
                    : Images.userDp
                }
              />
            </View>
            <View>
              <Text style={styles.userName}>{item?.sharedBy?.userName}</Text>
              <Text style={styles.postTime}>{timeAgo(item?.createdAt)}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={styles.dotsBtn}
            activeOpacity={0.7}
          >
            <Image
              style={styles.dots}
              source={Images.ThreeDotsVertical}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.postContainer}>
          {item?.content && (
            <Text
              style={styles.postText}
              numberOfLines={isTruncated ? 2 : undefined}
              onTextLayout={handleTextLayout}
            >
              {item?.content}
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
        {/* if not exist null  in array then render */}
        {item?.postImages[0] !== null &&
          item?.postImages?.map((item: any, index: number) => (
            <View key={index} style={styles.postMediaWrapper}>
              {/* @ts ignore */}
              {/* @ts-ignore */}
              <Lightbox
                doubleTapZoomEnabled={true}
                activeProps={{
                  resizeMode: 'contain',
                }}
                backgroundColor="rgba(0, 0, 0, 0.8)"
              >
                <Image
                  style={styles.postImage}
                  source={{
                    uri: item,
                  }}
                />
              </Lightbox>
            </View>
          ))}
        <View style={styles.footerContainer}>
          <View style={styles.footerContent}>
            <View style={styles.likeContainer}>
              <Image style={styles.dots} source={Images.gradientLike} />
              <Text style={styles.engagementText}>{likes} likes</Text>
            </View>
            <Text style={styles.engagementText}>
              {item?.comments?.length} comments
            </Text>
          </View>
          <View style={styles.postActions}>
            <TouchableOpacity
              onPress={handleLike}
              style={styles.postActionBtn}
              activeOpacity={0.7}
              disabled={isLikeDisable}
            >
              <Image
                style={[
                  styles.dots,
                  {
                    tintColor: isLike ? colors.blue : colors.black,
                  },
                ]}
                source={isLike ? Images.solidThumb : Images.handThumbsUp}
              />
              <Text
                style={[
                  styles.engagementTextAction,
                  {
                    color: isLike ? colors.blue : colors.black,
                  },
                ]}
              >
                Like
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (isCommentScreen) {
                  navigation.navigate('Comment Screen', { item });
                }
                onPressComment();
              }}
              style={styles.postActionBtn}
              activeOpacity={0.7}
            >
              <Image style={styles.dots} source={Images.chatIc} />
              <Text style={styles.engagementTextAction}>Comment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* // bottom half modal */}
      <BottomHalfModal
        toggle={isModalVisible}
        setToggle={setIsModalVisible}
        handleTogglePress={() => setIsModalVisible(!isModalVisible)}
      >
        <TouchableOpacity activeOpacity={0.7} style={styles.popBtn}>
          <Image style={styles.popBtnImg} source={Images.shareIcon} />
          <Text style={styles.popBtnText}>Share</Text>
        </TouchableOpacity>
        {item?.sharedBy?.userId !== user?._id ? (
          <TouchableOpacity activeOpacity={0.7} style={styles.popBtn}>
            <Image style={styles.popBtnImg} source={Images.infoCircle} />
            <Text style={styles.popBtnText}>Report</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Edit post', { item });
              }}
              activeOpacity={0.7}
              style={styles.popBtn}
            >
              <Image style={styles.popBtnImg} source={Images.edit} />
              <Text style={[styles.popBtnText]}>Edit Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deletePostHandler}
              activeOpacity={0.7}
              style={styles.popBtn}
            >
              <Image
                style={[styles.popBtnImg, { tintColor: colors.red }]}
                source={Images.trashIcon}
              />
              <Text style={[styles.popBtnText, { color: colors.red }]}>
                Delete
              </Text>
            </TouchableOpacity>
          </>
        )}
      </BottomHalfModal>
    </>
  );
};
// aspect 1/1
const getStyle = () => {
  return StyleSheet.create({
    popBtnImg: {
      width: 18,
      height: 18,
      objectFit: 'contain',
    },
    popBtn: {
      marginBottom: spacing.l,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.s,
    },
    popBtnText: {
      color: colors.black,
      fontSize: fontSizes.p2,
      fontWeight: '500',
    },
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
