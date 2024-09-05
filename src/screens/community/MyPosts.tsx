import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import PostCard from '../../components/community/PostCard';
import { usePrepContext } from '../../contexts/GlobalState';
import { makeRequest } from '../../api/apiClients';
import BackHeader from '../../components/BackHeader';
import { colors } from '../../utils/commonStyle/colors';
import ThreePulseDots from '../../components/commonComponents/ThreePulseDots';
import NoPost from '../../components/commonComponents/NoPost';

const MyPosts = ({ navigation }: { navigation: any }) => {
  const { user, mysPosts, setMyPosts } = usePrepContext();
  const [refreshing, setRefreshing] = useState(false);

  const fetchMyPost = () => {
    makeRequest({
      method: 'POST',
      url: '/my-posts',
      data: {
        userId: user?._id,
      },
    })
      .then((res: any) => {
        setMyPosts && setMyPosts(res?.data?.data || []);
        console.log(res?.data?.data);
        setRefreshing(false);
        console.log(res?.data?.data, 'my posts');
      })
      .catch((err: any) => {
        console.log(err.message, 'err hai');
        setRefreshing(false);
      });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data from an API
    fetchMyPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchMyPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const styles = getStyle();
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
        title={'My Posts'}
      />

      {/* {mysPosts?.map((item: any) => (
          <PostCard navigation={navigation} key={item._id} item={item} />
        ))} */}
      {mysPosts ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item, index) => index.toString()}
          data={mysPosts}
          ListEmptyComponent={
            <NoPost
              title="Oops! There are no posts here yet"
              desc="Tap on 'Create New Post' to share your first update or question!"
              navigation={navigation}
            />
          }
          renderItem={({ item }) => (
            <PostCard navigation={navigation} item={item} />
          )}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ThreePulseDots color={colors.blue} />
        </View>
      )}
    </SafeAreaView>
  );
};

const getStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
};
export default MyPosts;
