import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import React from 'react';
import { colors } from '../../utils/commonStyle/colors';
import { fontSizes, spacing } from '../../utils/commonStyle';
import BackHeader from '../../components/BackHeader';
import Images from '../../resources/Images';

const AboutPrepIntelli = ({ navigation }: { navigation: any }) => {
  const styles = getStyle();
  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <BackHeader
          title="About PrepIntelli"
          onPress={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>
            <View style={styles.logoWrapper}>
              <Image style={styles.logo} source={Images.logo} />
              <Text style={styles.logoText}>PrepIntelli</Text>
            </View>
            <View style={styles.aboutWrapperText}>
              <Text style={styles.about}>
                PrepIntelli is a cutting-edge AI Exam Preparation App designed
                exclusively for practice. It offers personalized study plans,
                interactive practice tests, instant AI chatbot assistance, and
                performance tracking.
              </Text>
              <TouchableOpacity
                style={styles.visitBtn}
                activeOpacity={0.8}
                onPress={() => openLink('https://www.prepintelli.com')}
              >
                <Text style={styles.visitBtnText}>
                  Visit for more: wwww.prepintelli.com
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.aiTeacherImgWrapper}>
              <Image style={styles.aiTeacherImg} source={Images.aiTeacher} />
            </View>
            <View style={styles.followUsWrapper}>
              <Text style={styles.followUs}>Follow Us</Text>
              <View style={styles.socialIcWrapper}>
                <TouchableOpacity
                  style={styles.socialIc}
                  onPress={() => openLink('https://www.facebook.com')}
                >
                  <Image style={styles.socialIcon} source={Images.fbIc} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialIc}
                  onPress={() => openLink('https://www.instagram.com')}
                >
                  <Image style={styles.socialIcon} source={Images.igIc} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialIc}
                  onPress={() => openLink('https://www.linkedin.com')}
                >
                  <Image style={styles.socialIcon} source={Images.linkedInIc} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialIc}
                  onPress={() => openLink('https://www.twitter.com')}
                >
                  <Image style={styles.socialIcon} source={Images.twitterIc} />
                </TouchableOpacity>
              </View>
              <Text style={styles.appVersionText}>App Version: 1.0.0</Text>
            </View>
          </View>
          <Text style={styles.termsText}>
            By using PrepIntelli you agree to our{' '}
            <Text style={{ fontWeight: 'bold' }}>Terms</Text> and{' '}
            <Text style={{ fontWeight: 'bold' }}>Privacy Policy</Text>.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const getStyle = () =>
  StyleSheet.create({
    visitBtnText: {
      color: colors.blue,
      fontSize: fontSizes.p3,
      textAlign: 'center',
    },
    visitBtn: {
      backgroundColor: colors.light_blue,
      padding: spacing.s,
      borderRadius: 5,
      marginTop: spacing.l,
    },
    termsText: {
      color: colors.black,
      fontSize: fontSizes.p3,
      textAlign: 'center',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      paddingBottom: spacing.l,
    },
    appVersionText: {
      color: colors.black,
      fontSize: fontSizes.p2,
      textAlign: 'center',
    },
    followUsWrapper: {
      paddingTop: spacing.xl,
      paddingBottom: spacing.l,
      gap: spacing.m,
    },
    followUs: {
      color: colors.black,
      fontSize: fontSizes.h5,
      fontWeight: '500',
      textAlign: 'center',
    },
    socialIcWrapper: {
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
    },
    socialIcon: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    socialIc: {
      width: 30,
      height: 30,
    },
    aiTeacherImgWrapper: {
      paddingVertical: spacing.xl,
    },
    aiTeacherImg: {
      width: '100%',
      height: 220,
      objectFit: 'contain',
    },
    about: {
      color: colors.black,
      fontSize: fontSizes.p2,
      textAlign: 'center',
    },
    aboutWrapperText: {
      padding: spacing.m,
      backgroundColor: colors.light_grey,
    },
    logoWrapper: {
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    logoText: {
      color: colors.black,
      fontSize: fontSizes.h3,
      fontWeight: '500',
    },
    logo: {
      maxHeight: 50,
      objectFit: 'contain',
      width: 60,
    },
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
      paddingHorizontal: spacing.l,
    },
  });
export default AboutPrepIntelli;
