import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import BackHeader from '../../components/BackHeader';
import { colors } from '../../utils/commonStyle/colors';
import PostWidgets from '../../components/community/PostWidgets';
import PostCard from '../../components/community/PostCard';
import { usePrepContext } from '../../contexts/GlobalState';
import { makeRequest } from '../../api/apiClients';
import { fontSizes, spacing } from '../../utils/commonStyle';
import Button from '../../components/Button';
import { useToast } from 'react-native-toast-notifications';
import { socket } from '../../utils/socketUtil';
const ExploreCommunity = ({ navigation }: { navigation: any }) => {
  const styles = getStyles();
  const { user, getPosts, setGetPosts } = usePrepContext();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [refreshing, setRefreshing] = useState(false);
  const fetchPosts = async () => {
    makeRequest({
      method: 'GET',
      url: `/get-posts/${user?.exams[0]?.examId}`,
    })
      .then((res: any) => {
        setGetPosts && setGetPosts(res?.data?.data);
        setIsLoading(true);
        setRefreshing(false);
      })
      .catch((err: any) => {
        console.log(err.message, 'err hai');
        setIsLoading(true);
        setRefreshing(false);
        toast.show('Something went wrong', {
          type: 'danger',
        });
      });
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data from an API
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPosts();

    // Listen for new posts
    socket.on('newPost', ({ examId, post }) => {
      if (examId === user?.exams[0]?.examId) {
        setGetPosts &&
          setGetPosts((prevPosts: any) => [post || {}, ...(prevPosts || [])]);
      }
    });
    socket.on('updateLikes', ({ postId, _, updatedLikes }) => {
      setGetPosts &&
        setGetPosts((prevPosts: any) =>
          prevPosts.map((post: any) =>
            post._id === postId ? { ...post, likesBy: updatedLikes } : post
          )
        );
    });

    socket.on('newComment', ({ postId, _, updated }) => {
      setGetPosts &&
        setGetPosts((prevPosts: any) =>
          prevPosts.map((post: any) =>
            post._id === postId ? { ...post, comments: updated } : post
          )
        );
    });

    return () => {
      socket.off('newPost');
      socket.off('updateLikes');
      socket.off('newComment');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => navigation.goBack()}
        isBottomBorder={false}
        title={`${user?.exams[0]?.exam_short_name} Community`}
      />
      <PostWidgets
        navigation={navigation}
        onPostClick={() => navigation.navigate('PostScreen')}
      />

      {isLoading ? (
        <>
          {getPosts?.length > 0 ? (
            <FlatList
              style={styles.scrollWrapper}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              //  hide scrollbar
              showsVerticalScrollIndicator={false}
              data={getPosts}
              renderItem={({ item }) => (
                <PostCard navigation={navigation} item={item} />
              )}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
            />
          ) : (
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
                  <Text style={styles.heading}>Community Feed is Empty 📭</Text>
                  <Text style={styles.desc}>
                    Be the first to share your knowledge and connect with
                    others! 🌟
                  </Text>
                  <Button
                    title="Create Post"
                    onPress={() =>
                      navigation.navigate('PostScreen', { image: '' })
                    }
                  />
                </View>
              </View>
            </View>
          )}
        </>
      ) : (
        <>
          <Text style={{ textAlign: 'center', color: colors.black }}>
            Loading..
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    noPostWrapper: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textDesc: {
      paddingHorizontal: spacing.l,
    },
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
    noPostImg: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    imgWrapper: {
      aspectRatio: 1 / 0.5,
      width: '100%',
    },
    scrollWrapper: {
      backgroundColor: colors.light_blue,
    },
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
};
export default ExploreCommunity;
