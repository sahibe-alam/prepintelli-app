import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import PostCard from '../../components/community/PostCard';
import { usePrepContext } from '../../contexts/GlobalState';
import { makeRequest } from '../../api/apiClients';
import { ScrollView } from 'react-native-gesture-handler';
import BackHeader from '../../components/BackHeader';
import { colors } from '../../utils/commonStyle/colors';

const MyPosts = ({ navigation }: { navigation: any }) => {
  const { user } = usePrepContext();
  const [mysPosts, setMyPosts] = useState<any | null>(null);
  useEffect(() => {
    makeRequest({
      method: 'POST',
      url: '/my-posts',
      data: {
        userId: user?._id,
      },
    }).then((res: any) => {
      setMyPosts(res?.data?.data);
      console.log(res?.data?.data, 'my posts');
    });
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
      <ScrollView>
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
