import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LogoTitle from '../../components/commonComponents/LogoTitle';
import OTPTextInput from 'react-native-otp-textinput';
import {fontSizes, spacing} from '../../utils/commonStyle';
import {colors} from '../../utils/commonStyle/colors';
import Button from '../../components/Button';
import {useToast} from 'react-native-toast-notifications';
import {makeRequest} from '../../api/apiClients';
interface PropsType {
  navigation: any;
}
const OtpVerification: React.FC<PropsType> = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const hadleSubmit = () => {
    if (otp.length === 4) {
      setLoading(true);
      makeRequest({
        url: '/verifyOtpAndSaveUser',
        method: 'POST',
        data: {
          otp: otp,
        },
      })
        .then((res: any) => {
          setLoading(false);
          toast.show(res.data.msg, {type: 'success'});
          navigation.navigate('Login');
        })
        .catch((err: any) => {
          setLoading(false);
          toast.show(err.response.data.msg, {type: 'danger'});
        });
    } else {
      toast.show('Please enter 4 digit otp', {type: 'danger'});
    }
  };

  const styles = getSyles();
  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.wrapper}>
        <LogoTitle title="OTP Verification" />
        <Text style={styles.textDesc}>
          An email has been sent to your address with a verification code.
        </Text>
        <OTPTextInput
          handleTextChange={text => setOtp(text)}
          tintColor={colors.purple}
          containerStyle={styles.container}
          textInputStyle={styles.input}
        />
        <View style={styles.resentWrapper}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.resendBtn}>Resend password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitBtnWrapper}>
          <Button isLoading={isLoading} onPress={hadleSubmit} title="Verify" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const getSyles = () =>
  StyleSheet.create({
    submitBtnWrapper: {
      paddingTop: spacing.xl,
    },
    resentWrapper: {
      flexDirection: 'row',
      paddingTop: spacing.s,
    },
    btn: {
      borderBottomWidth: 1,
      width: 'auto',
    },
    resendBtn: {
      color: colors.black,
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
