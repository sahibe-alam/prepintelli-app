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
import { io } from 'socket.io-client';
import { usePrepContext } from '../../contexts/GlobalState';
import { makeRequest } from '../../api/apiClients';
import { BACKEND_URL } from '@env';
import { fontSizes, spacing } from '../../utils/commonStyle';
import Button from '../../components/Button';
const socket = io(BACKEND_URL);
const ExploreCommunity = ({ navigation }: { navigation: any }) => {
  const styles = getStyles();
  const { user } = usePrepContext();
  const [getPosts, setGetPosts] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Listen for new posts
    try {
      socket.on('newPost', ({ examId, post }) => {
        console.log(examId, 'examId');
        console.log(post, 'post');
        if (examId === user?.exams[0]?.examId) {
          setGetPosts((prevPosts: any) => [post, ...prevPosts]);
        }
      });
    } catch (error) {
      console.log(error);
    }

    makeRequest({
      method: 'GET',
      url: `/get-posts/${user?.exams[0]?.examId}`,
    })
      .then((res: any) => {
        setGetPosts(res?.data?.data);
        setIsLoading(true);
      })
      .catch((err: any) => {
        console.log(err.message, 'err hai');
        setIsLoading(true);
      });

    return () => {
      socket.off('newPost');
    };
  }, [user]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data from an API
    onRef();
  }, []);

  const onRef = () => {
    return new Promise(() => {
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => navigation.goBack()}
        isBottomBorder={false}
        title="Explore NEET Community"
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
              renderItem={({ item }) => <PostCard item={item} />}
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
                    onPress={() => navigation.navigate('PostScreen')}
                  />
                </View>
              </View>
            </View>
          )}
        </>
      ) : (
        <>
          <Text style={{ textAlign: 'center' }}>Loading..</Text>
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
    },
    heading: {
      fontSize: fontSizes.h5,
      fontWeight: '500',
      paddingTop: 20,
      textAlign: 'center',
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
