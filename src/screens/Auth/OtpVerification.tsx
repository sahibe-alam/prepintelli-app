import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LogoTitle from '../../components/commonComponents/LogoTitle';
import OTPTextInput from 'react-native-otp-textinput';
import { fontSizes, spacing } from '../../utils/commonStyle';
import { colors } from '../../utils/commonStyle/colors';
import Button from '../../components/Button';
import { useToast } from 'react-native-toast-notifications';
import { makeRequest } from '../../api/apiClients';
interface PropsType {
  navigation: any;
  route: any;
}
const OtpVerification: React.FC<PropsType> = ({ navigation, route }) => {
  const { isForgotPassword, email } = route.params || {};
  const [otp, setOtp] = useState('');
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log('finished');
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Cleanup the timeout if the component is unmounted or timeLeft changes
    return () => clearTimeout(timerId);
  }, [timeLeft]);
  const handleSubmit = () => {
    if (otp.length === 4) {
      setLoading(true);
      if (!isForgotPassword) {
        makeRequest({
          url: '/verifyOtpAndSaveUser',
          method: 'POST',
          data: {
            otp: otp,
          },
        })
          .then((res: any) => {
            setLoading(false);
            toast.show(res.data.msg, { type: 'success' });
            navigation.navigate('Login');
          })
          .catch((err: any) => {
            setLoading(false);
            toast.show(err.response.data.msg, { type: 'danger' });
          });
      } else {
        makeRequest({
          url: '/verifyotp',
          method: 'POST',
          data: {
            restotp: otp,
          },
        })
          .then((res: any) => {
            setLoading(false);
            toast.show(res.data.msg, { type: 'success' });
            navigation.navigate('Create new password', {
              email: email,
            });
          })
          .catch((err: any) => {
            setLoading(false);
            toast.show(err.response.data.msg, { type: 'danger' });
          });
      }
    } else {
      toast.show('Please enter 4 digit otp', { type: 'danger' });
    }
  };

  const resendOtp = () => {
    setTimeLeft(60);
    if (timeLeft === 0) {
      setLoading(true);
      makeRequest({
        method: 'POST',
        url: 'resetsetotp',
        data: {
          email,
        },
      })
        .then((res: any) => {
          setLoading(false);
          toast.show(res.data.msg, { type: 'success' });
          if (res?.data?.success) {
            navigation.navigate('OTP', {
              email: email,
              isForgotPassword: true,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response?.data, ': Forgot password error');
          toast.show(err.response.data.msg, { type: 'danger' });
        });
    }
  };

  const styles = getStyles();
  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.wrapper}>
        <LogoTitle title="OTP Verification" />
        <Text style={styles.textDesc}>
          An email has been sent to your address with a verification code.
        </Text>
        <OTPTextInput
          handleTextChange={(text) => setOtp(text)}
          tintColor={colors.purple}
          containerStyle={styles.container}
          textInputStyle={styles.input}
        />
        <View style={styles.resentWrapper}>
          <TouchableOpacity
            disabled={timeLeft > 0}
            style={[styles.btn, { opacity: timeLeft > 0 ? 0.3 : 1 }]}
            onPress={resendOtp}
          >
            <Text style={styles.resendBtn}>Resend OTP</Text>
          </TouchableOpacity>
          <Text style={styles.resendBtn}>{timeLeft}s</Text>
        </View>
        <View style={styles.submitBtnWrapper}>
          <Button isLoading={isLoading} onPress={handleSubmit} title="Verify" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    submitBtnWrapper: {
      paddingTop: spacing.xl,
    },
    resentWrapper: {
      flexDirection: 'row',
      paddingTop: spacing.s,
      justifyContent: 'space-between',
    },
    btn: {
      borderBottomWidth: 1,
      width: 'auto',
    },
    resendBtn: {
      color: colors.black,
      fontSize: fontSizes.p2,
    },
    textDesc: {
      color: colors.black,
      textAlign: 'center',
      fontSize: fontSizes.p2,
      paddingBottom: spacing.l,
    },
    safeview: {
      flex: 1,
      backgroundColor: colors.white,
    },
    wrapper: {
      paddingHorizontal: spacing.l,
      justifyContent: 'center',
      flex: 1,
    },
    container: {
      gap: 2,
    },
    input: {
      borderWidth: 1,
      flex: 1,
      borderRadius: 10,
      borderBottomWidth: 1,
    },
  });
export default OtpVerification;
