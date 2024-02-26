import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/commonStyle/colors';
import LogoTitle from '../../components/commonComponents/LogoTitle';
import Button from '../../components/Button';
import {spacing} from '../../utils/commonStyle';
import InputField from '../../components/formComponents/InputField';

interface Props {
  navigation?: any;
  route?: any;
}
const SignUp: React.FC<Props> = props => {
  const {navigation} = props;
  const loginHandler = () => {
    navigation.navigate('OTP');
  };
  const styles = getStyles();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        centerContent={true}>
        <View style={styles.wrapper}>
          <LogoTitle title="Sign up" />
          <InputField label="First name*" placeholder="Enter first name" />
          <InputField label="Last name*" placeholder="Enter last name" />
          <InputField label="Email*" placeholder="Enter email id" />
          <InputField label="Mobile*" placeholder="Enter mobile number" />
          <InputField label="Date of birth*" placeholder="Date" />
          <InputField label="Password*" placeholder="Enter password" />
          <InputField
            label="Confirm password*"
            placeholder="Enter confirm password"
          />

          <View style={styles.btnWrapper}>
            <Button title="Sign up" onPress={loginHandler} />
            <View style={styles.t_and_c_wrapper}>
              <Text style={styles.t_and_c}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text style={styles.linkText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    scrollWrapper: {
      flexGrow: 1,
    },
    t_and_c_wrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: spacing.l,
      gap: 2,
      flexWrap: 'wrap',
    },
    linkText: {
      color: colors.blue,
    },
    btnLink: {
      borderBottomWidth: 1,
      borderColor: colors.blue,
    },
    t_and_c: {
      color: colors.black,
      textAlign: 'center',
    },
    btnWrapper: {
      paddingTop: spacing.l,
    },
    wrapper: {
      paddingHorizontal: spacing.l,
      flex: 1,
      gap: spacing.l,
      paddingTop: spacing.xl,
      height: '100%',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
  });
export default SignUp;
