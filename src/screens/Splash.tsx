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
import {fontSizes} from '../utils/commonStyle/fontSizes';

export default function Splash() {
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
          Your AI Guide to Exam Success and Language Proficiency
        </Text>
      </View>
      <View style={{flex: 1, position: 'relative'}}>
        <Image
          style={{objectFit: 'contain', flex: 1}}
          source={require('../../src/assets/img/splash-image.png')}
        />
      </View>
      <SafeAreaView style={{width: '100%', paddingBottom: 10}}>
        <Button />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 22,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    fontSize: fontSizes.h1,
    color: colors.black,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 20,
  },
  logo: {
    objectFit: 'contain',
    width: 70,
  },
  branding: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20%',
  },
  tagline: {
    color: colors.black,
    fontSize: fontSizes.h5,
    textAlign: 'center',
    fontWeight: '700',
  },
});
