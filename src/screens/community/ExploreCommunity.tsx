import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import BackHeader from '../../components/BackHeader';
import { colors } from '../../utils/commonStyle/colors';
import PostWidgets from '../../components/community/PostWidgets';
import PostCard from '../../components/community/PostCard';

const ExploreCommunity = ({ navigation }: { navigation: any }) => {
  const styles = getStyles();

  const posts = [
    {
      id: 1,
      userName: 'Sahibe Alam',
      dp: 'https://media.licdn.com/dms/image/D4D03AQEwCUTdH_0Cow/profile-displayphoto-shrink_200_200/0/1703095236438?e=2147483647&v=beta&t=ZhsfRTt2nMUEEEwiWl-KCOM4_8XJIDr0B2-oDXCUR7k',
      postTime: '10 hrs ago',
      postText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      postMedia:
        'https://cache.careers360.mobi/media/article_images/2019/7/29/NEET-exam-pattern.jpg',
      likes: 120,
      comments: 10,
    },
    {
      id: 2,
      userName: 'Abhishek patel',
      dp: 'https://static.tnn.in/thumb/msid-109859759,thumbsize-8618,width-1280,height-720,resizemode-75/109859759.jpg',
      postTime: '10 hrs ago',
      postText:
        'The SC said currently it was determining the nature of the leak, and not if it actually happened. "You don t have to order a re-test for whole exam only because 2 students engaged in malpractice. Therefore, we must be careful about the nature of leak. Before we order a re-test we must be conscious of extent of leak as we are dealing with 23 lakh students',
      postMedia:
        'https://img.etimg.com/thumb/width-1200,height-1200,imgsize-96994,resizemode-75,msid-111575670/news/india/neet-ug-2024-supreme-court-hearing-paper-leak.jpg',
      likes: 120,
      comments: 10,
    },
  ];
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollWrapper}
      >
        {posts.map((item: any, index) => (
          <PostCard
            key={index}
            userName={item.userName}
            dp={item.dp}
            postTime={item.postTime}
            postText={item.postText}
            postMedia={item.postMedia}
            likes={item.likes}
            comments={item.comments}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = () => {
  return StyleSheet.create({
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
