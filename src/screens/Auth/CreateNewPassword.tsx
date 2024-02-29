import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
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
const CreateNewPassword: React.FC<Props> = props => {
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
          <LogoTitle title="Create new password" />
          <InputField label="Password*" placeholder="Enter password" />
          <InputField
            label="Confirm password*"
            placeholder="Enter confirm  password"
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
  });
export default CreateNewPassword;
