import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import BackHeader from '../../components/BackHeader';
import { colors } from '../../utils/commonStyle/colors';
import PostCard from '../../components/community/PostCard';
import Comment from '../../components/community/Comment';
import CommentInput from '../../components/community/CommentInput';
import { usePrepContext } from '../../contexts/GlobalState';
import { socket } from '../../utils/socketUtil';
const CommentScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { item } = route.params;
  const commentInputRef = useRef<any>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [renderComments, setComments] = useState<any>(item?.comments || []);
  const hasMounted = useRef(false);
  const { setGetPosts } = usePrepContext();
  const styles = getStyle();
  useEffect(() => {
    socket.on('newComment', ({ postId, _, updated }) => {
      if (postId !== item?._id) {
        return;
      }
      setComments(postId === item?._id ? updated : renderComments);
      setGetPosts &&
        setGetPosts((prevPosts: any) =>
          prevPosts.map((post: any) =>
            post._id === postId ? { ...post, comments: updated } : post
          )
        );
    });

    return () => {
      socket.off('newComment');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePostCardPress = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (hasMounted.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 50);
    } else {
      hasMounted.current = true;
    }
  }, [renderComments]);
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => navigation.goBack()} title="Comments" />
      <ScrollView ref={scrollViewRef} style={styles.scrollWrapper}>
        <View>
          <PostCard
            onPressComment={handlePostCardPress}
            isCommentScreen={false}
            item={item}
          />
          {renderComments?.map((item: any) => (
            <Comment key={item._id} item={item} />
          ))}
        </View>
      </ScrollView>
      <CommentInput ref={commentInputRef} item={item} />
    </SafeAreaView>
  );
};

const getStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
    scrollWrapper: {
      flex: 1,
    },
  });
};
export default CommentScreen;
