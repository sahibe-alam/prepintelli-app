import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useReducer, useState } from 'react';
import { colors } from '../../utils/commonStyle/colors';
import LogoTitle from '../../components/commonComponents/LogoTitle';
import Button from '../../components/Button';
import { spacing } from '../../utils/commonStyle';
import InputField from '../../components/formComponents/InputField';
import {
  isValidEmail,
  isValidIndianMobileNumber,
} from '../../utils/validation';
import DateSelector from '../../components/commonComponents/DateSelector';
import { makeRequest } from '../../api/apiClients';
import { useToast } from 'react-native-toast-notifications';

interface Props {
  navigation?: any;
  route?: any;
}

// Define action types
type ActionType =
  | { type: 'FNAME'; payload: string }
  | { type: 'LNAME'; payload: string }
  | { type: 'EMAIL'; payload: string }
  | { type: 'MOBILE'; payload: string }
  | { type: 'DOB'; payload: string }
  | { type: 'PASSWORD'; payload: string }
  | { type: 'CPASSWORD'; payload: string };

// Define initial state interface
interface StateType {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dob: string;
  education: string;
  password: string;
  cPassword: string;
  [key: string]: string; // Add index signature
}

// Define reducer function
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'FNAME':
      return { ...state, firstName: action.payload };
    case 'LNAME':
      return { ...state, lastName: action.payload };
    case 'EMAIL':
      return { ...state, email: action.payload };
    case 'MOBILE':
      return { ...state, mobile: action.payload };
    case 'DOB':
      return { ...state, dob: action.payload };
    case 'PASSWORD':
      return { ...state, password: action.payload };
    case 'CPASSWORD':
      return { ...state, cPassword: action.payload };
    default:
      return state;
  }
};

const initialState: StateType = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  dob: '',
  password: '',
  education: 'school student',
  cPassword: '',
};
const SignUp: React.FC<Props> = (props) => {
  const { navigation } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    password: '',
    cPassword: '',
  });
  let error = false;
  const errorObj: { [key: string]: string } = {};
  const toast = useToast();
  const isValidError = () => {
    const fieldsToValidate = [
      {
        field: 'firstName',
        validation: (value: string) =>
          value.trim() === '' ? 'First is required' : '',
      },
      {
        field: 'lastName',
        validation: (value: string) =>
          value.trim() === '' ? 'Fast is required' : '',
      },
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
        field: 'mobile',
        validation: (value: string) =>
          value.trim() === ''
            ? 'Mobile is required'
            : '' || isValidIndianMobileNumber(value)
            ? ''
            : 'Enter valid mobile number',
      },
      {
        field: 'dob',
        validation: (value: string) =>
          value.trim() === '' ? 'Date of birth is required' : '',
      },
      {
        field: 'password',
        validation: (value: string) =>
          value.trim() === ''
            ? 'Password is required'
            : '' || value.length < 6
            ? 'Password should be at least 8 characters long'
            : '',
      },
      {
        field: 'cPassword',
        validation: (value: string) =>
          value.trim() === ''
            ? 'Confirm password is required'
            : '' || value !== state.password
            ? 'Password does not match'
            : '',
      },
    ];

    fieldsToValidate.forEach(({ field, validation }) => {
      const newErrorMessage = validation(state[field] || '');
      errorObj[field] = newErrorMessage;
      if (newErrorMessage !== '') {
        error = true;
      }
    });
    return error;
  };
  const registerUser = async () => {
    setLoading(true);
    const isError = isValidError();
    if (isError) {
      setLoading(false);
      toast.show('Please enter valid details', { type: 'danger' });
    }
    const errorMessageObj: {
      firstName: string;
      lastName: string;
      email: string;
      mobile: string;
      dob: string;
      password: string;
      cPassword: string;
    } = {
      firstName: errorObj.firstName || '',
      lastName: errorObj.lastName || '',
      email: errorObj.email || '',
      mobile: errorObj.mobile || '',
      dob: errorObj.dob || '',
      password: errorObj.password || '',
      cPassword: errorObj.cPassword || '',
    };
    setErrorMessage(errorMessageObj);
    if (!isError) {
      makeRequest({
        url: '/register',
        method: 'POST',
        data: {
          email: state.email,
          firstname: state.firstName,
          lastname: state.lastName,
          mobile: state.mobile,
          education: state.education,
          dateofbirth: state.dob,
          password: state.password,
          confirmpassword: state.cPassword,
        },
      })
        .then((response: any) => {
          setLoading(false);
          if (response.status === 200) {
            navigation.navigate('OTP');
          }
        })
        .catch((error: any) => {
          setLoading(false);
          toast.show(error.response.data?.msg, {
            type: 'danger',
          });
          console.log('error ', error.response.data);
        });
    }
  };
  const styles = getStyles();
  return (
    <SafeAreaView style={styles.container}>
      <LogoTitle title="Sign up" />

      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        centerContent={true}
      >
        <View style={styles.wrapper}>
          <InputField
            errorMsg={errorMessage.firstName}
            onChangeText={(text) => {
              dispatch({ type: 'FNAME', payload: text });
            }}
            value={state.firstName}
            label="First name*"
            placeholder="Enter first name"
          />
          <InputField
            errorMsg={errorMessage.lastName}
            onChangeText={(text) => {
              dispatch({ type: 'LNAME', payload: text });
            }}
            value={state.lastName}
            label="Last name*"
            placeholder="Enter last name"
          />
          <InputField
            errorMsg={errorMessage.email}
            keyboardType="email-address"
            onChangeText={(text) => {
              dispatch({ type: 'EMAIL', payload: text.toLocaleLowerCase() });
            }}
            value={state.email.toLocaleLowerCase()}
            label="Email*"
            placeholder="Enter email id"
          />
          <InputField
            errorMsg={errorMessage.mobile}
            keyboardType="number-pad"
            onChangeText={(text) => {
              dispatch({ type: 'MOBILE', payload: text });
            }}
            value={state.mobile}
            label="Mobile*"
            placeholder="Enter mobile number"
          />
          <DateSelector
            errorMsg={errorMessage.dob}
            onDateChange={(date) => {
              const formattedDate = date.toString();
              dispatch({ type: 'DOB', payload: formattedDate });
            }}
          />

          <InputField
            errorMsg={errorMessage.password}
            onChangeText={(text) => {
              dispatch({ type: 'PASSWORD', payload: text });
            }}
            value={state.password}
            label="Password*"
            placeholder="Enter password"
          />
          <InputField
            errorMsg={errorMessage.cPassword}
            onChangeText={(text) => {
              dispatch({ type: 'CPASSWORD', payload: text });
            }}
            value={state.cPassword}
            label="Confirm password*"
            placeholder="Enter confirm password"
          />
          <View style={styles.btnWrapper}>
            <Button
              isLoading={isLoading}
              onPress={() => registerUser()}
              title="Sign up"
            />
            <View style={styles.t_and_c_wrapper}>
              <Text style={styles.t_and_c}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}
              >
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
