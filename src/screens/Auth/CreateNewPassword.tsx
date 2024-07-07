import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { colors } from '../../utils/commonStyle/colors';
import LogoTitle from '../../components/commonComponents/LogoTitle';
import Button from '../../components/Button';
import { spacing } from '../../utils/commonStyle';
import InputField from '../../components/formComponents/InputField';
import { makeRequest } from '../../api/apiClients';
import { useToast } from 'react-native-toast-notifications';

interface Props {
  route?: any;
  navigation?: any;
}
const CreateNewPassword: React.FC<Props> = (props) => {
  const { navigation } = props;
  const [isShowPassConfirm, setIsShowPassConfirm] = React.useState(true);
  const [isShowPass, setIsShowPass] = React.useState(true);

  const toast = useToast();
  const [passwords, setPasswords] = React.useState({
    password: '',
    confirmPassword: '',
    email: 'sahibe190@gmail.com',
  });
  const [errorMsg, setErrorMsg] = React.useState({
    password: '',
    confirmPassword: '',
  });

  const isPassValid = () => {
    const { password, confirmPassword } = passwords;
    let valid = true;

    if (password.trim() === '') {
      setErrorMsg((prevState) => ({
        ...prevState,
        password: 'Password is required',
      }));
      valid = false;
    } else if (password.trim().length < 6) {
      setErrorMsg((prevState) => ({
        ...prevState,
        password: 'Password must be 6 characters',
      }));
      valid = false;
    } else {
      setErrorMsg((prevState) => ({
        ...prevState,
        password: '',
      }));
    }

    if (confirmPassword.trim() === '') {
      setErrorMsg((prevState) => ({
        ...prevState,
        confirmPassword: 'Confirm password is required',
      }));
      valid = false;
    } else if (password.trim() !== confirmPassword.trim()) {
      setErrorMsg((prevState) => ({
        ...prevState,
        confirmPassword: 'Password and confirm password should be the same',
      }));
      valid = false;
    } else {
      setErrorMsg((prevState) => ({
        ...prevState,
        confirmPassword: '',
      }));
    }

    return valid;
  };

  const loginHandler = () => {
    const valid = isPassValid();
    if (valid) {
      makeRequest({
        method: 'POST',
        url: 'updatepassword',
        data: {
          password: passwords.password,
          email: 'sahibe190@gmail.com',
          confirmpassword: passwords.confirmPassword,
        },
      })
        .then((res: any) => {
          toast.show(res.data.msg, { type: 'success' });
          navigation.navigate('Login');
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  const styles = getStyles();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        centerContent={true}
      >
        <View style={styles.wrapper}>
          <LogoTitle title="Create new password" />
          <InputField
            isPassword={true}
            secureTextEntry={isShowPass}
            onHidePassword={() => setIsShowPass(!isShowPass)}
            errorMsg={errorMsg.password}
            label="New password*"
            placeholder="Enter password"
            onChangeText={(e) => setPasswords({ ...passwords, password: e })}
          />

          <InputField
            isPassword={true}
            secureTextEntry={isShowPassConfirm}
            onHidePassword={() => setIsShowPassConfirm(!isShowPassConfirm)}
            errorMsg={errorMsg.confirmPassword}
            label="Confirm password*"
            placeholder="Enter confirm password"
            onChangeText={(e) =>
              setPasswords({ ...passwords, confirmPassword: e })
            }
          />

          <View style={styles.btnWrapper}>
            <Button title="Create" onPress={loginHandler} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    forgotBtnWrapper: {
      flexDirection: 'row',
    },
    forgotBtn: {
      marginTop: spacing.l,
      borderBottomWidth: 1,
    },
    forgotText: {
      color: colors.black,
    },
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
    errorText: {
      color: 'red',
      marginTop: spacing.s,
    },
  });

export default CreateNewPassword;
