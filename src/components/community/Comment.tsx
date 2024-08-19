import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../utils/commonStyle/colors';
import { fontSizes, spacing } from '../../utils/commonStyle';
import Images from '../../resources/Images';
import Lightbox from 'react-native-lightbox-v2';
import timeAgo from '../../utils/timeAgo';
import BottomHalfModal from '../commonComponents/BottomHalfModal';
import CustomModal from '../commonComponents/CustomModal';
import ReportPopUpUi from './ReportPopUpUi';
import { usePrepContext } from '../../contexts/GlobalState';

const Comment = ({
  item,
  postId,
  sharedByUserId,
  handleDeleteComment,
  getCommentID,
}: {
  item: any;
  sharedByUserId: string;
  getCommentID: any;
  postId: string;
  handleDeleteComment: () => void;
}) => {
  const [readMore, setReadMore] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = usePrepContext();
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const styles = getStyle();
  const handleTextLayout = (event: any) => {
    const { lines } = event.nativeEvent;
    if (lines.length > 2) {
      !readMore && setIsTruncated(true);
    }
  };
  console.log(user?._id, sharedByUserId);
  return (
    <>
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
          <TouchableHighlight
            onPress={() => setIsModalVisible(true)}
            underlayColor={colors.light_blue}
            delayLongPress={300}
            onLongPress={() => {
              setIsModalVisible(true);
              getCommentID(item?._id);
            }}
            style={styles.commentWrapper}
          >
            <>
              <View style={styles.userNameWrapper}>
                <View>
                  <Text style={styles.userName}>{item?.userName}</Text>
                  <Text style={styles.postTime}>
                    {timeAgo(item?.commentDate)}
                  </Text>
                </View>
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
            </>
          </TouchableHighlight>
        </View>
      </View>

      <BottomHalfModal
        toggle={isModalVisible}
        setToggle={setIsModalVisible}
        handleTogglePress={() => setIsModalVisible(!isModalVisible)}
      >
        {user?._id !== sharedByUserId ? (
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
              setIsReportModalVisible(true);
            }}
            activeOpacity={0.7}
            style={styles.popBtn}
          >
            <Image style={styles.popBtnImg} source={Images.infoCircle} />
            <Text style={styles.popBtnText}>Report this comment</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
              handleDeleteComment();
            }}
            activeOpacity={0.7}
            style={styles.popBtn}
          >
            <Image
              style={[styles.popBtnImg, { tintColor: colors.red }]}
              source={Images.trashIcon}
            />
            <Text style={[styles.popBtnText, { color: colors.red }]}>
              Delete comment
            </Text>
          </TouchableOpacity>
        )}
      </BottomHalfModal>

      <CustomModal
        isModalVisible={isReportModalVisible}
        isModalHide={() => setIsReportModalVisible(false)}
      >
        <ReportPopUpUi
          postId={postId}
          reportType="comment"
          isCommentReport={true}
          commentId={item?._id}
          isModalHide={() => setIsReportModalVisible(false)}
        />
      </CustomModal>
    </>
  );
};

const getStyle = () => {
  return StyleSheet.create({
    popBtnImg: {
      width: 18,
      height: 18,
      objectFit: 'contain',
      tintColor: colors.black,
    },
    popBtnText: {
      color: colors.black,
      fontSize: fontSizes.p2,
      fontWeight: '500',
    },
    popBtn: {
      paddingVertical: spacing.s,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.s,
    },
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
