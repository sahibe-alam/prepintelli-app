import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BackHeader from '../../components/BackHeader';
import {colors} from '../../utils/commonStyle/colors';
import {fontSizes, spacing} from '../../utils/commonStyle';

interface PropsType {
  navigation: any;
  questionsWithUserSelected: any;
  route: any;
}

const AnswersSheet: React.FC<PropsType> = (props: PropsType) => {
  const {navigation} = props;
  const {questionsWithUserSelected} = props.route.params;

  const styles = getStyles();
  const getBackgroundColor = (
    index: number,
    correctIndex: number,
    userSelected: number,
  ) => {
    if (index === userSelected) {
      if (index === correctIndex) {
        return {backgroundColor: colors.light_green, textColor: colors.green};
      } else {
        return {backgroundColor: colors.light_red, textColor: colors.red};
      }
    } else if (index === correctIndex) {
      return {backgroundColor: colors.light_green, textColor: colors.green};
    } else {
      return {backgroundColor: colors.light_grey, textColor: colors.black};
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => navigation.goBack()} title="Answers Sheet" />
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        {questionsWithUserSelected?.map((item: any, index: number) => {
          return (
            <View style={styles.questionContainer} key={index}>
              <View style={styles.questionWrapper}>
                <Text style={styles.questionNumber}>Q{index + 1}.</Text>
                <Text style={styles.questionText}>{item?.q}</Text>
              </View>
              {item.options.map((option: string, optionIndex: number) => {
                const {backgroundColor, textColor} = getBackgroundColor(
                  optionIndex,
                  item.correctIndex,
                  item.userSelected,
                );
                return (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[styles.optionWrapper, {backgroundColor}]}>
                    <Text style={[styles.optionText, {color: textColor}]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity style={styles.doubtBtn}>
                <Text style={styles.doubtBtnText}>Ask doubt🤔</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
    scrollWrapper: {
      paddingTop: spacing.l,
      paddingHorizontal: spacing.l,
    },
    questionContainer: {
      paddingBottom: 6,
      marginBottom: spacing.xl,
      borderColor: colors.light_grey,
      borderBottomWidth: 1,
    },
    questionWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: spacing.s,
      gap: 4,
    },
    questionNumber: {
      color: colors.black,
      marginTop: 2,
      fontWeight: '600',
      fontSize: fontSizes.p2,
    },
    questionText: {
      flex: 1,
      color: colors.black,
      fontSize: fontSizes.p,
    },
    optionWrapper: {
      padding: spacing.s,
      borderRadius: 10,
      marginBottom: spacing.xl,
    },
    optionText: {
      fontSize: fontSizes.p2,
    },
    doubtBtn: {
      backgroundColor: colors.light_blue,
      padding: spacing.s,
      borderRadius: 10,
      alignSelf: 'flex-end',
    },
    doubtBtnText: {
      color: colors.blue,
    },
  });

export default AnswersSheet;
