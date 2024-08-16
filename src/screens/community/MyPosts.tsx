import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import PostCard from '../../components/community/PostCard';
import { usePrepContext } from '../../contexts/GlobalState';
import { makeRequest } from '../../api/apiClients';
import BackHeader from '../../components/BackHeader';
import { colors } from '../../utils/commonStyle/colors';

const MyPosts = ({ navigation }: { navigation: any }) => {
  const { user } = usePrepContext();
  const [mysPosts, setMyPosts] = useState<any | null>(null);
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
        setMyPosts(res?.data?.data);
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {mysPosts?.map((item: any) => (
          <PostCard navigation={navigation} key={item._id} item={item} />
        ))}
      </ScrollView>
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
