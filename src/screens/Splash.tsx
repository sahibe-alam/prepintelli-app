import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';
import Button from '../components/Button';
import {fontSizes, spacing} from '../utils/commonStyle';

interface Props {
  navigation?: any;
  route?: any;
}
const Splash: React.FC<Props> = ({navigation}) => {
  const getStartHandler = () => {
    navigation.navigate('Main');
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View style={styles.branding}>
        <Image
          style={styles.logo}
          source={require('../../src/assets/img/Logo.png')}
        />
        <Text style={styles.logoText}>prepIntelli</Text>
        <Text style={styles.tagline}>
          Your AI guide to exam success {'\n'} and language proficiency
        </Text>
      </View>
      <View style={styles.imgWrapper}>
        <Image
          style={{objectFit: 'contain', flex: 1, width: '100%'}}
          source={require('../../src/assets/img/splash-image.png')}
        />
      </View>
      <SafeAreaView style={{width: '100%', paddingBottom: spacing.m}}>
        <Button title="Let's start" onPress={getStartHandler} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.white,
    paddingHorizontal: spacing.l,
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  logoText: {
    fontSize: fontSizes.h1,
    color: colors.black,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: spacing.l,
  },
  logo: {
    objectFit: 'contain',
    width: 70,
    height: 70,
  },
  branding: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20%',
  },
  tagline: {
    color: colors.black,
    fontSize: fontSizes.p,
    textAlign: 'center',
    fontWeight: '600',
  },
  imgWrapper: {
    verticalAlign: 'bottom',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default Splash;
