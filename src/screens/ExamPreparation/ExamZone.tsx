import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import BackHeader from '../../components/BackHeader';
import {colors} from '../../utils/commonStyle/colors';

interface PropsType {
  navigation: any;
  route: any;
}
const ExamZone: React.FC<PropsType> = ({navigation}) => {
  const styles = getStyles();
  return (
    <SafeAreaView style={styles.conatainer}>
      <BackHeader onPress={() => navigation.goBack()} title="Exam Zone" />
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    conatainer: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
export default ExamZone;
