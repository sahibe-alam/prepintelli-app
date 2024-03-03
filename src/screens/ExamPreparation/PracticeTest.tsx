import {View, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../utils/commonStyle/colors';
import BackHeader from '../../components/BackHeader';
import Button from '../../components/Button';
import {spacing} from '../../utils/commonStyle';
import QuestionsProgreeBar from '../../components/examPrepComponents/QuestionsProgreeBar';
import Questions from '../../components/examPrepComponents/Questions';

interface PropsType {
  navigation?: any;
}
const PracticeTest: React.FC<PropsType> = props => {
  const {navigation} = props;
  const styles = getStyles();

  const handleSubmit = () => {
    navigation.navigate('Test Result');
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => navigation.goBack()}
        title="02/10"
        isTimer={true}
      />
      <QuestionsProgreeBar />
      <View style={styles.questionWrapper}>
        <Questions />
      </View>

      <View style={styles.actionBtn}>
        {/* <Button btnWidth={'40%'} title="Prev" outline={true} />
        <Button btnWidth="40%" title="Next" /> */}

        <Button onPress={handleSubmit} title="Sunmit test" />
      </View>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    questionWrapper: {
      flex: 1,
    },
    actionBtn: {
      flexDirection: 'row',
      paddingHorizontal: spacing.l,
      justifyContent: 'space-between',
      paddingBottom: spacing.m,
    },
    container: {
      backgroundColor: colors.lightBg,
      flex: 1,
    },
  });
export default PracticeTest;
