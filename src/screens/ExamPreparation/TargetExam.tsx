import {StyleSheet, SafeAreaView, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/commonStyle/colors';
import BackHeader from '../../components/BackHeader';
import ExamType from '../../components/ExamType';
import {spacing} from '../../utils/commonStyle';
interface PropsType {
  navigation: any;
  route: any;
}
const typeExam = [
  {
    title: 'Competitive exam',
    type: 'comptv',
    dropdownLabel: 'Select your target exam?*',
    inputLabel: 'Type your exam subjects*',
  },
  {
    title: 'College exam',
    type: 'clg',
    dropdownLabel: 'Select your target exam?*',
    inputLabel: 'Type your exam subjects*',
  },
  {
    title: 'Academics exam',
    type: 'acdmc',
    dropdownLabel: 'Select board*',
    dropdownLabel2: 'Select class*',
    inputLabel: 'Type your exam subjects*',
  },
];
const TargetExam: React.FC<PropsType> = ({navigation, route}) => {
  const {title} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => navigation.goBack()} title={title} />
      <View style={styles.typeWrapper}>
        {(typeExam as Array<any>).map((item, index) => (
          <ExamType
            onPress={() => navigation.navigate('Select Exam', item)}
            key={index}
            title={item.title}
            type={item.type}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  typeWrapper: {
    marginTop: spacing.l,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
export default TargetExam;
