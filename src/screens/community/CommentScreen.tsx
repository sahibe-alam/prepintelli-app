import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import BackHeader from '../../components/BackHeader';
import { colors } from '../../utils/commonStyle/colors';
import PostCard from '../../components/community/PostCard';
import Comment from '../../components/community/Comment';
import CommentInput from '../../components/community/CommentInput';
import { usePrepContext } from '../../contexts/GlobalState';
import { socket } from '../../utils/socketUtil';
import { makeRequest } from '../../api/apiClients';
import { useShowMessage } from '../../utils/showMessage';
const CommentScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { itemPost } = route.params;
  const commentInputRef = useRef<any>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [renderComments, setComments] = useState<any>(itemPost?.comments || []);
  const hasMounted = useRef(false);
  const [commentId, setCommentId] = useState<any>(null);
  const { setGetPosts } = usePrepContext();
  const showMessage = useShowMessage();
  const styles = getStyle();
  useEffect(() => {
    socket.on('newComment', ({ postId, _, updated }) => {
      if (postId !== itemPost?._id) {
        return;
      }
      setComments(postId === itemPost?._id ? updated : renderComments);
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

  const handleDeleteComment = async () => {
    makeRequest({
      method: 'POST',
      url: '/delete-comment',
      data: {
        postId: itemPost?._id,
        commentId: commentId,
      },
    })
      .then(() => {
        setComments((prevComments: any) =>
          prevComments?.filter((comment: any) => comment?._id !== commentId)
        );
        setCommentId(null);
        setGetPosts &&
          setGetPosts((prevPosts: any) =>
            prevPosts?.map((post: any) =>
              post?._id === itemPost?._id
                ? {
                    ...post,
                    comments: post?.comments?.filter(
                      (comment: any) => comment?._id !== commentId
                    ),
                  }
                : post
            )
          );

        showMessage('Comment deleted successfully');
      })
      .catch(() => {
        showMessage('Something went wrong. Please try again');
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => navigation.goBack()} title="Comments" />
      <ScrollView ref={scrollViewRef} style={styles.scrollWrapper}>
        <View>
          <PostCard
            onPressComment={handlePostCardPress}
            isCommentScreen={false}
            item={itemPost}
          />
          {renderComments?.map((item: any) => (
            <Comment
              sharedByUserId={itemPost?.sharedBy?.userId}
              getCommentID={(id: any) => setCommentId(id)}
              handleDeleteComment={handleDeleteComment}
              postId={itemPost._id}
              key={item._id}
              item={item}
            />
          ))}
        </View>
      </ScrollView>
      <CommentInput ref={commentInputRef} item={itemPost} />
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
