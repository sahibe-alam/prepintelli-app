import {View, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';
import BackHeader from '../components/BackHeader';
import {ScrollView} from 'react-native-gesture-handler';
import Gradient from '../components/Gradient';
import {usePrepContext} from '../contexts/GlobalState';
import {fontSizes} from '../utils/commonStyle';

interface PropsType {
  navigation: any;
}

const Profile: React.FC<PropsType> = ({navigation}) => {
  const {deviceWidth} = usePrepContext();
  const styles = getSyle(deviceWidth || 0);
  return (
    <View style={styles.container}>
      <BackHeader title="My profile" onPress={() => navigation.goBack()} />
      <ScrollView style={styles.scrollWrapper}>
        <View style={styles.gradientWrapper}>
          <View style={styles.borderRadius}>
            <Gradient>
              <View style={styles.gradient} />
            </Gradient>
          </View>
          <View style={styles.dpWrapper} />
        </View>
      </ScrollView>
    </View>
  );
};

const getSyle = (deviceWidth: number) =>
  StyleSheet.create({
    borderRadius: {
      borderRadius: deviceWidth,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
    },
    gradient: {
      aspectRatio: 1,
      width: deviceWidth * 2,
      borderRadius: 500,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    gradientWrapper: {
      width: '100%',
      position: 'relative',
      height: 140,
      marginBottom: 50,
    },
    scrollWrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    userName: {
      color: colors.black,
      textAlign: 'center',
      fontSize: fontSizes.h5,
    },
    dpWrapper: {
      width: 100,
      height: 100,
      borderRadius: 50,
      position: 'absolute',
      bottom: -50,
      alignSelf: 'center',
      borderWidth: 2,
      borderColor: colors.black,
      overflow: 'hidden',
    },
  });
export default Profile;
