import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
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
import { useToast } from 'react-native-toast-notifications';
interface PropsType {
  navigation: any;
}

const EditProfile: React.FC<PropsType> = ({ navigation }) => {
  const styles = getStyle();
  const { user, setUser } = usePrepContext();
  const toast = useToast();
  const [userDetails, setUserDetails] = React.useState<any>({
    firstName: user?.firstname,
    lastName: user?.lastname,
    email: user?.email,
    mobile: user?.mobile,
    dob: user?.dateofbirth,
    education: user?.education,
  });
  console.log(userDetails);
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
    makeRequest({
      url: 'update-profile',
      method: 'POST',
      data: {
        userId: user?._id,
        firstname: userDetails?.firstName,
        lastname: userDetails?.lastName,
        email: userDetails?.email,
        mobile: userDetails?.mobile,
        dateofbirth: userDetails?.dob,
        education: userDetails?.education,
      },
    }).then((res: any) => {
      console.log(res?.data?.user);
      setUser && setUser(res?.data?.user);

      toast.show(res?.data?.msg, { type: 'default', duration: 3000 });
    });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <BackHeader title="My profile" onPress={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.scrollWrapper}>
          <DpWrapper isPencil={true} />

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
              <TouchableOpacity style={styles.deleteBtn}>
                <Text style={styles.deleteBtnText}>Delete account</Text>
              </TouchableOpacity>
            </View>
            <Button
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
