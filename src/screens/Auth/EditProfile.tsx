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
interface PropsType {
  navigation: any;
}

const EditProfile: React.FC<PropsType> = ({ navigation }) => {
  const styles = getStyle();

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
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <BackHeader title="My profile" onPress={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.scrollWrapper}>
          <DpWrapper isPencil={true} />

          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <InputField value="Sahibe" />
            </View>
            <View style={styles.inputWrapper}>
              <InputField value="Alam" />
            </View>
            <View style={styles.inputWrapper}>
              <InputField value="sahibe190@gmail.com" />
            </View>
            <View style={styles.inputWrapper}>
              <InputField value="9627-xxxx-xxxx" />
            </View>
            <View
              style={[styles.inputWrapper, { flexDirection: 'row', gap: 10 }]}
            >
              <RadioButton radioList={radioList} onChecked={() => {}} />
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
              onPress={() => navigation.goBack()}
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
      width: '60%',
      overflow: 'hidden',
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
      width: '100%',
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
