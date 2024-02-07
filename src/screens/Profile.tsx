import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.screenName}>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenName: {
    color: 'black',
  },
});
export default Profile;
