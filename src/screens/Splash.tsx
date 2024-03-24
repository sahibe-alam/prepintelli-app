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
import {usePrepContext} from '../contexts/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props {
  navigation?: any;
  route?: any;
  markAppLaunched?: any;
}
const Splash: React.FC<Props> = ({navigation}) => {
  const {orientation} = usePrepContext();

  const markAppLaunched = async () => {
    try {
      await AsyncStorage.setItem('appLaunchedBefore', 'true');
    } catch (error) {
      console.log('Error marking app as launched:', error);
    }
  };
  const getStartHandler = () => {
    markAppLaunched();
    navigation.navigate('Login');
  };

  const styles = getStyle(orientation || ''); // Ensure orientation is always a string
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={'white'} />
        <View style={styles.splashWrapper}>
          <View style={[styles.branding]}>
            <Image
              style={styles.logo}
              source={require('../../src/assets/img/Logo.png')}
            />
            <Text style={styles.logoText}>prepIntelli</Text>
            <Text style={styles.tagline}>
              PrepIntelli app: Your AI-powered {'\n'} exam preparation companion
            </Text>
          </View>
          <View style={styles.imgWrapper}>
            <Image
              style={styles.splashImage}
              source={require('../../src/assets/img/splash-image.png')}
            />
          </View>
        </View>
        <Button onPress={getStartHandler} title="Let's start" />
      </View>
    </SafeAreaView>
  );
};

const getStyle = (orientation: string) =>
  StyleSheet.create({
    splashImage: {
      objectFit: 'contain',
      width: '100%',
      height: '100%',
    },
    splashWrapper: {
      flex: 1,
      flexDirection: orientation === 'PORTRAIT' ? 'column' : 'row',
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingHorizontal: spacing.l,
      justifyContent: 'space-between',
      paddingBottom: spacing.xl,
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
      justifyContent: 'center',
      flex: 1,
    },
    tagline: {
      color: colors.black,
      fontSize: fontSizes.p,
      textAlign: 'center',
      fontWeight: '600',
    },
    imgWrapper: {
      verticalAlign: 'bottom',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      paddingHorizontal: orientation === 'PORTRAIT' ? spacing.xl : 0,
      paddingVertical: orientation === 'PORTRAIT' ? 0 : spacing.xl,
    },
  });

export default Splash;
