import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackHeader from '../../components/BackHeader';
import {colors} from '../../utils/commonStyle/colors';
import {fontSizes, spacing} from '../../utils/commonStyle';
import CircleProgress from '../../components/commonComponents/CircleProgress';
import Button from '../../components/Button';

interface PropsType {
  navigation?: any;
  results?: any;
  route?: any;
}
const TestResult: React.FC<PropsType> = props => {
  const {navigation} = props;
  const {myesults, questionsWithUserSelected} = props.route.params;
  // Now you can use the title variable in the other screen
  const styles = getStylle();
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => navigation.goBack()} title="Test Result" />
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.title}>Scores card</Text>
          <View style={styles.scoresCardWrapper}>
            <View style={styles.cardTextWrapper}>
              <Text style={styles.cardText}>
                <Text style={styles.boldText}>Subject:</Text> Physics
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.boldText}>Chapter or unit:</Text> Law of
                motion
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.boldText}>Time spend:</Text> 8m 20s
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.boldText}>Total questions:</Text> 10
              </Text>
            </View>
          </View>
          <View style={styles.resultWrapper}>
            <View style={styles.resultBarWrapper}>
              <View
                style={[
                  styles.resultBar,
                  {backgroundColor: colors.light_green},
                ]}>
                <Text style={styles.correctText}>
                  Correct answers {myesults?.correctAnswers}
                </Text>
                <Image
                  style={styles.resultIc}
                  source={require('../../assets/img/correct_ic.png')}
                />
              </View>
              <View
                style={[styles.resultBar, {backgroundColor: colors.light_red}]}>
                <Text style={[styles.correctText, {color: colors.red}]}>
                  Wrong answers {myesults?.wrongAnswers}
                </Text>
                <Image
                  style={styles.resultIc}
                  source={require('../../assets/img/wrong_ic.png')}
                />
              </View>
              <View
                style={[styles.resultBar, {backgroundColor: colors.light_red}]}>
                <Text style={[styles.correctText, {color: colors.red}]}>
                  Not attempt {myesults?.notAttempted}
                </Text>
                <Image
                  style={styles.resultIc}
                  source={require('../../assets/img/wrong_ic.png')}
                />
              </View>
            </View>
            <CircleProgress value={myesults?.scorePercentage || 0} />
          </View>
        </View>
        <View style={styles.btnWrapper}>
          <Button
            onPress={() =>
              navigation.navigate('Answers Sheet', {questionsWithUserSelected})
            }
            title="View answers"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const getStylle = () =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'space-between',
    },
    btnWrapper: {
      paddingHorizontal: spacing.l,
      paddingBottom: spacing.m,
    },
    resultBarWrapper: {
      gap: spacing.m,
    },
    resultIc: {
      width: 16,
      height: 16,
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    correctText: {
      color: colors.green,
      fontSize: fontSizes.p3,
    },
    resultBar: {
      padding: 6,
      borderRadius: 8,
      gap: 8,
      alignSelf: 'flex-start',
      alignContent: 'center',
      flexDirection: 'row',
    },
    cardTextWrapper: {
      gap: 6,
    },
    cardText: {
      fontSize: fontSizes.p3,
      color: colors.purle,
    },
    boldText: {
      fontWeight: '600',
    },
    scoresCardWrapper: {
      marginHorizontal: spacing.l,
      backgroundColor: colors.light_purple,
      borderRadius: 10,
      padding: spacing.m,
    },
    resultWrapper: {
      marginTop: spacing.xxl,
      marginHorizontal: spacing.l,
      backgroundColor: colors.light_blue,
      borderRadius: 10,
      gap: spacing.m,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: spacing.m,
    },
    title: {
      fontSize: fontSizes.h3,
      textAlign: 'center',
      color: colors.black,
      fontWeight: '600',
      paddingVertical: spacing.l,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
  });
export default TestResult;
