import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useReducer, useState} from 'react';
import {colors} from '../../utils/commonStyle/colors';
import LogoTitle from '../../components/commonComponents/LogoTitle';
import Button from '../../components/Button';
import {spacing} from '../../utils/commonStyle';
import InputField from '../../components/formComponents/InputField';
import {isValidEmail} from '../../utils/validation';
import {setLoginToken, setUserID} from '../../utils/commonServices';
import {makeRequest} from '../../api/apiClients';
import {useToast} from 'react-native-toast-notifications';
import {getUserDetails} from '../../api/adapter/getUserDetails';
import {usePrepContext} from '../../contexts/GlobalState';

interface Props {
  navigation?: any;
  route?: any;
}
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'EMAIL':
      return {...state, email: action.payload};
    case 'PASSWORD':
      return {...state, password: action.payload};
    default:
      return state;
  }
};

const initialState = {
  email: '',
  password: '',
};
const LoginScreen: React.FC<Props> = props => {
  const {navigation} = props;
  const [loginDate, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setLoading] = useState(false);
  const {setUser} = usePrepContext();
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState<{
    email: string;
    password: string;
  }>({email: '', password: ''});

  const isValid = () => {
    let isError = false;
    let errorObj: {email?: string; password?: string} = {};
    const fieldsToValidate = [
      {
        field: 'email',
        validation: (value: string) =>
          value.trim() === ''
            ? 'Email is required'
            : '' || isValidEmail(value)
            ? ''
            : 'Enter valid email',
      },
      {
        field: 'password',
        validation: (value: string) =>
          value.trim() === ''
            ? 'Password is required'
            : '' || value.length >= 6
            ? ''
            : 'Password must be at least 6 characters',
      },
    ];

    fieldsToValidate.forEach(({field, validation}) => {
      const error = validation(loginDate[field]);
      if (error) {
        isError = true;
        errorObj = {
          ...errorObj,
          [field]: error,
        };
      }
    });
    setErrorMessage({
      email: errorObj.email || '',
      password: errorObj.password || '',
    });
    return isError;
  };
  const loginHandler = async () => {
    let isError: boolean = isValid();
    setLoading(true);
    if (isError) {
      setLoading(false);
    }
    if (!isError) {
      makeRequest({
        url: '/login',
        method: 'POST',
        data: {
          email: loginDate.email.trim().toLowerCase(),
          password: loginDate.password.trim(),
        },
      })
        .then((res: any) => {
          if (res.data.success) {
            setLoginToken(res.data.data.token);
            setUserID(res.data.data._id);
            getUserDetails(res.data.data._id).then((res: any) => {
              setUser && setUser(res.data[0]);
              setLoading(false);
              navigation.navigate('Main');
            });
          } else {
            console.log(res?.data);
            toast.show(res?.data.msg, {type: 'danger'});
            setLoading(false);
          }
        })

        .catch((err: any) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  const styles = getStyles();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        centerContent={true}>
        <View style={styles.wrapper}>
          <LogoTitle title="Login" />
          <InputField
            errorMsg={errorMessage.email}
            value={loginDate.email.trim().toLowerCase()}
            onChangeText={text =>
              dispatch({type: 'EMAIL', payload: text.trim()})
            }
            label="Email"
            placeholder="Enter email id"
          />
          <View>
            <InputField
              errorMsg={errorMessage.password}
              value={loginDate.password.trim()}
              onChangeText={text =>
                dispatch({type: 'PASSWORD', payload: text.trim()})
              }
              label="Password"
              placeholder="Enter password"
            />
            <View style={styles.forgotBtnWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Forgot password');
                }}
                style={styles.forgotBtn}>
                <Text style={styles.forgotText}>Forgot password</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <Button
              isLoading={isLoading}
              title="Login"
              onPress={loginHandler}
            />

            <View>
              <View style={{paddingVertical: spacing.s}}>
                <Text style={styles.t_and_c}>OR</Text>
              </View>

              <Button
                title="Create new account"
                outline={true}
                onPress={() => navigation.navigate('Sign Up')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.t_and_c_wrapper}>
        <Text style={styles.t_and_c}>
          By continuing, I accept PrepIntelli's
        </Text>
        <TouchableOpacity style={styles.btnLink}>
          <Text style={styles.linkText}>Terms of use</Text>
        </TouchableOpacity>
      </View>
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
  });
export default LoginScreen;
