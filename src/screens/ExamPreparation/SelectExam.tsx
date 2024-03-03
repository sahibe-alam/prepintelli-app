import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import DropDownSelect from '../../components/formComponents/DropDownSelect';
import {colors} from '../../utils/commonStyle/colors';
import BackHeader from '../../components/BackHeader';
import {spacing} from '../../utils/commonStyle';
import Button from '../../components/Button';
import SubjectSelector from '../../components/examPrepComponents/SubjectSelector';

interface PropsType {
  navigation: any;
  route: any;
}
const SelectExam: React.FC<PropsType> = ({navigation, route}) => {
  const {title, type, dropdownLabel, dropdownLabel2, inputLabel} = route.params;
  const styles = getStyles();
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => navigation.goBack()} title={title} />
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        centerContent={true}>
        <View style={styles.inputsWrapper}>
          <View style={styles.formWrapper}>
            <DropDownSelect DropDownLabel={dropdownLabel} />
            {type === 'acdmc' && (
              <DropDownSelect DropDownLabel={dropdownLabel2} />
            )}
            <SubjectSelector label={inputLabel} />
          </View>
          <View style={styles.btnWrapper}>
            <Button
              title="Get start"
              onPress={() =>
                navigation.navigate('Exam Zone', {
                  title: 'Exam prepration zone',
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    inputsWrapper: {
      flex: 1,
    },
    scrollWrapper: {
      flexGrow: 1,
    },
    btnWrapper: {
      paddingHorizontal: spacing.l,
      paddingBottom: spacing.l,
    },
    formWrapper: {
      paddingTop: spacing.l,
      paddingHorizontal: spacing.l,
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
