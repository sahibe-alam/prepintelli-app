import {StyleSheet, SafeAreaView, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';
import BackHeader from '../components/BackHeader';
import ExamType from '../components/ExamType';
import {spacing} from '../utils/commonStyle';
interface PropsType {
  navigation: any;
  route: any;
}
const typeExam = [
  {
    title: 'Competitive exam',
    type: 'comptv',
  },
  {
    title: 'College exam',
    type: 'clg',
  },
  {
    title: 'Academics exam',
    type: 'acdmc',
  },
];
const TargetExam: React.FC<PropsType> = ({navigation, route}) => {
  const {title} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => navigation.goBack()} title={title} />
      <View style={styles.typeWrapper}>
        {(typeExam as Array<any>).map((item, index) => (
          <ExamType key={index} title={item.title} type={item.type} />
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
