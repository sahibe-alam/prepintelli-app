import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import BackHeader from '../../components/BackHeader';
import DpWrapper from '../../components/DpWrapper';
import { fontSizes, spacing } from '../../utils/commonStyle';
import { colors } from '../../utils/commonStyle/colors';
import InputField from '../../components/formComponents/InputField';
import Button from '../../components/Button';
import RadioButton from '../../components/RadioButton';
import { usePrepContext } from '../../contexts/GlobalState';
import { makeRequest } from '../../api/apiClients';
import { useShowMessage } from '../../utils/showMessage';
import { removeLoginToken } from '../../utils/commonServices';
interface PropsType {
  navigation: any;
}

const EditProfile: React.FC<PropsType> = ({ navigation }) => {
  const styles = getStyle();
  const { user, setUser } = usePrepContext();
  const [isLoading, setLoading] = React.useState(false);
  const [getNewDp, setGetNewDp] = React.useState('');
  const showMessage = useShowMessage();
  const [userDetails, setUserDetails] = React.useState<any>({
    firstName: user?.firstname,
    lastName: user?.lastname,
    email: user?.email,
    mobile: user?.mobile,
    dob: user?.dateofbirth,
    education: user?.education,
    userDp: user?.userDp?.url,
  });
  const radioList = [
    {
      label: 'School student',
      value: 'student',
    },
    {
      label: 'College student',
      value: 'college',
    },
  ];
  const updateUser = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('userId', user?._id);
    formData.append('firstname', userDetails?.firstName);
    formData.append('lastname', userDetails?.lastName);
    formData.append('email', userDetails?.email);
    formData.append('mobile', userDetails?.mobile);
    formData.append('education', userDetails?.education);
    if (getNewDp !== '') {
      console.log(getNewDp, 'getNewDp');
      formData.append('profileImage', {
        uri: getNewDp,
        type: 'image/jpg',
        name: 'image.jpg',
      });
    }
    console.log(formData, 'formData');
    makeRequest({
      url: '/update-profile',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res: any) => {
        setUser && setUser(res?.data?.user);
        showMessage(res?.data?.msg);
        setLoading(false);
        navigation.goBack();
      })
      .catch((err: any) => {
        console.log(err, 'err');
        setLoading(false);
        showMessage('Something went wrong');
      });
  };

  const deleteUser = () => {
    makeRequest({
      method: 'DELETE',
      url: `/delete-permanent-account/${user?._id}`,
    }).then((res: any) => {
      setUser && setUser(null);
      navigation.navigate('Login');
      removeLoginToken();
      showMessage(res?.data?.msg);
    });
  };
  const userDeleteHandler = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteUser(),
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <BackHeader title="My profile" onPress={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.scrollWrapper}>
          <DpWrapper
            dp={getNewDp}
            onImgDp={(userDp) => {
              setUserDetails({ ...userDetails, userDp });
              setGetNewDp(userDp);
            }}
            isPencil={true}
          />

          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <InputField
                value={userDetails?.firstName}
                onChangeText={(text) =>
                  setUserDetails({ ...userDetails, firstName: text })
                }
              />
            </View>
            <View style={styles.inputWrapper}>
              <InputField
                value={userDetails?.lastName}
                onChangeText={(text) =>
                  setUserDetails({ ...userDetails, lastName: text })
                }
              />
            </View>
            <View style={styles.inputWrapper}>
              <InputField
                value={userDetails?.email}
                onChangeText={(text) => {
                  setUserDetails({ ...userDetails, email: text });
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <InputField
                value={userDetails?.mobile}
                onChangeText={(text: any) => {
                  setUserDetails({ ...userDetails, mobile: text });
                }}
                keyboardType={'number-pad'}
              />
            </View>
            <View
              style={[styles.inputWrapper, { flexDirection: 'row', gap: 10 }]}
            >
              <RadioButton
                checked={userDetails?.education}
                radioList={radioList}
                onChecked={(item: any) => {
                  setUserDetails({ ...userDetails, education: item?.value });
                }}
              />
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <View style={[styles.deleteBtnWrapper]}>
              <TouchableOpacity
                onPress={userDeleteHandler}
                style={styles.deleteBtn}
              >
                <Text style={styles.deleteBtnText}>Delete account</Text>
              </TouchableOpacity>
            </View>
            <Button
              isLoading={isLoading}
              title="Save"
              onPress={() => updateUser()}
              btnWidth={'40%'}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const getStyle = () =>
  StyleSheet.create({
    deleteBtnWrapper: {
      overflow: 'hidden',
      flex: 1,
      backgroundColor: colors.light_red,
      borderRadius: 10,
    },
    deleteBtnText: {
      color: colors.red,
      textAlign: 'center',
      fontSize: fontSizes.p,
    },

    deleteBtn: {
      alignContent: 'center',
      justifyContent: 'center',
      flex: 1,
      height: 48,
    },
    btnWrapper: {
      flexDirection: 'row',
      paddingHorizontal: spacing.l,
      gap: spacing.m,
    },
    inputWrapper: {
      paddingBottom: spacing.l,
    },
    formWrapper: {
      paddingHorizontal: spacing.l,
      paddingTop: spacing.l,
      flex: 1,
    },
    scrollWrapper: {
      flexGrow: 1,
      paddingBottom: spacing.l,
      justifyContent: 'space-between',
    },
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
export default EditProfile;
