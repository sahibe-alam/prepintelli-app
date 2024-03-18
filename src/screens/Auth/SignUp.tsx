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

interface Props {
  navigation?: any;
  route?: any;
}

// Define action types
type ActionType =
  | {type: 'FNAME'; payload: string}
  | {type: 'LNAME'; payload: string}
  | {type: 'EMAIL'; payload: string}
  | {type: 'MOBILE'; payload: string}
  | {type: 'DOB'; payload: string}
  | {type: 'PASSWORD'; payload: string}
  | {type: 'CPASSWORD'; payload: string};

// Define initial state interface
interface StateType {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dob: string;
  password: string;
  cPassword: string;
}

// Define reducer function
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'FNAME':
      return {...state, firstName: action.payload};
    case 'LNAME':
      return {...state, lastName: action.payload};
    case 'EMAIL':
      return {...state, email: action.payload};
    case 'MOBILE':
      return {...state, mobile: action.payload};
    case 'DOB':
      return {...state, dob: action.payload};
    case 'PASSWORD':
      return {...state, password: action.payload};
    case 'CPASSWORD':
      return {...state, password: action.payload};
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
  cPassword: '',
};
const SignUp: React.FC<Props> = props => {
  const {navigation} = props;
  const [state, dispatch] = useReducer(reducer, initialState);
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
  let errorObj = {};
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
          value.trim() === '' ? 'Email is required' : '',
      },
    ];

    fieldsToValidate.forEach(({field, validation}) => {
      const newErrorMessage = validation(state[field] || '');
      errorObj[field] = newErrorMessage;
      if (newErrorMessage !== '') {
        error = true;
      }
    });
    return error;
  };
  const registerUser = async () => {
    const isError = isValidError();
    setErrorMessage(errorObj);
  };
  console.log(errorMessage);
  const styles = getStyles();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        centerContent={true}>
        <View style={styles.wrapper}>
          <LogoTitle title="Sign up" />
          <InputField
            onChangeText={text => {
              dispatch({type: 'FNAME', payload: text});
            }}
            value={state.firstName}
            label="First name*"
            placeholder="Enter first name"
          />
          <InputField
            onChangeText={text => {
              dispatch({type: 'LNAME', payload: text});
            }}
            value={state.lastName}
            label="Last name*"
            placeholder="Enter last name"
          />
          <InputField
            keyboardType="email-address"
            onChangeText={text => {
              dispatch({type: 'EMAIL', payload: text});
            }}
            value={state.email}
            label="Email*"
            placeholder="Enter email id"
          />
          <InputField
            keyboardType="number-pad"
            onChangeText={text => {
              dispatch({type: 'MOBILE', payload: text});
            }}
            value={state.mobile}
            label="Mobile*"
            placeholder="Enter mobile number"
          />
          <InputField label="Date of birth*" placeholder="Date" />
          <InputField
            onChangeText={text => {
              dispatch({type: 'PASSWORD', payload: text});
            }}
            value={state.password}
            label="Password*"
            placeholder="Enter password"
          />
          <InputField
            label="Confirm password*"
            onChangeText={text => {
              dispatch({type: 'CPASSWORD', payload: text});
            }}
            value={state.password}
            placeholder="Enter confirm password"
          />

          <View style={styles.btnWrapper}>
            <Button onPress={() => registerUser()} title="Sign up" />
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
