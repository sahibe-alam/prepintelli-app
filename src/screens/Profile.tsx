import {View, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';
import BackHeader from '../components/BackHeader';
import {ScrollView} from 'react-native-gesture-handler';
import DpWrapper from '../components/DpWrapper';
import IconLink from '../components/IconLink';
import {spacing} from '../utils/commonStyle';

interface PropsType {
  navigation: any;
}

const Profile: React.FC<PropsType> = ({navigation}) => {
  const styles = getSyle();

  const links = [
    {
      icon: require('../assets/img/dp.png'),
      linkText: 'Edit profile',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      icon: require('../assets/img/dp.png'),
      linkText: 'Practice reminder',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      icon: require('../assets/img/dp.png'),
      linkText: 'How it works',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      icon: require('../assets/img/dp.png'),
      linkText: 'About us',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      icon: require('../assets/img/dp.png'),
      linkText: 'fAQs',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      icon: require('../assets/img/dp.png'),
      linkText: 'Log out',
      onPress: () => navigation.navigate('Profile'),
    },
  ];
  return (
    <View style={styles.container}>
      <BackHeader title="My profile" onPress={() => navigation.goBack()} />
      <ScrollView style={styles.scrollWrapper}>
        <DpWrapper />
        <View style={styles.iconLinkWrapper}>
          {links.map((item, index) => (
            <IconLink key={index} {...item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const getSyle = () =>
  StyleSheet.create({
    iconLinkWrapper: {
      paddingHorizontal: spacing.l,
    },
    scrollWrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
  });
export default Profile;
