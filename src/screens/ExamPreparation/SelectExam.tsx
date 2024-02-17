import {View, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import DropDownSelect from '../../components/formComponents/DropDownSelect';
import {colors} from '../../utils/commonStyle/colors';
import BackHeader from '../../components/BackHeader';
import {spacing} from '../../utils/commonStyle';
import Button from '../../components/Button';
import SubjectSelector from '../../components/ExamPremComponents/SubjectSelector';

interface PropsType {
  navigation: any;
  route: any;
}
const SelectExam: React.FC<PropsType> = ({navigation, route}) => {
  const {title} = route.params;
  const styles = getStyles();
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => navigation.goBack()} title={title} />
      <View style={styles.formWrapper}>
        <DropDownSelect DropDownLabel="Select your target exam?*" />
        <SubjectSelector />
      </View>
      <View style={styles.btnWrapper}>
        <Button
          title="Get start"
          onPress={() => navigation.navigate('Exam Zone', {title: 'Exam Zone'})}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    btnWrapper: {
      paddingHorizontal: spacing.l,
      paddingBottom: spacing.l,
    },
    formWrapper: {
      paddingTop: spacing.l,
      gap: spacing.l,
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    screenName: {
      color: 'black',
    },
  });
export default SelectExam;
