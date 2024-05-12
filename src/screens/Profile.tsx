import { View, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../utils/commonStyle/colors';
import BackHeader from '../components/BackHeader';
import { ScrollView } from 'react-native-gesture-handler';
import DpWrapper from '../components/DpWrapper';
import IconLink from '../components/IconLink';
import { spacing } from '../utils/commonStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface PropsType {
  navigation: any;
}

const Profile: React.FC<PropsType> = ({ navigation }) => {
  const styles = getSyle();
  const logoutHandler = async () => {
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('userID');
    navigation.navigate('Login');
  };
  const links = [
    {
      icon: require('../assets/img/edit_profile.png'),
      linkText: 'Edit profile',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      icon: require('../assets/img/alarm_ic.png'),
      linkText: 'Practice reminder',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      icon: require('../assets/img/how_ic.png'),
      linkText: 'How it works',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      icon: require('../assets/img/about_ic.png'),
      linkText: 'About us',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      icon: require('../assets/img/faq_ic.png'),
      linkText: 'fAQs',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      icon: require('../assets/img/logout_ic.png'),
      linkText: 'Log out',
      onPress: logoutHandler,
    },
  ];

  return (
    <View style={styles.container}>
      <BackHeader title="My profile" onPress={() => navigation.goBack()} />
      <ScrollView style={styles.scrollWrapper}>
        <DpWrapper />
        <View style={styles.iconLinkWrapper}>
          {links.map((item, index) => (
            <IconLink key={index} {...item} onPress={item.onPress} />
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
