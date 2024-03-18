import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import BackHeader from '../../components/BackHeader';
import {colors} from '../../utils/commonStyle/colors';
import {fontSizes, spacing} from '../../utils/commonStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
interface PropsType {
  navigation: any;
  questionsWithUserSelected: any;
  route: any;
}
const AnswersSheet: React.FC<PropsType> = (props: PropsType) => {
  const {navigation} = props;
  const {questionsWithUserSelected} = props.route.params;
  const styles = getStyles();
  console.log(questionsWithUserSelected);
  return (
    <SafeAreaView style={styles.conainer}>
      <BackHeader onPress={() => navigation.goBack()} title="Answers Sheet" />
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        {questionsWithUserSelected?.map((item: any, index: number) => {
          return (
            <View style={styles.questionContainer} key={index}>
              <View style={styles.qWrapper}>
                <Text style={styles.qNumber}>Q{index + 1}.</Text>
                <Text style={styles.question}>{item?.q}</Text>
              </View>
              {item?.options.map((option: string, index: number) => {
                let backgroundColor = colors.light_grey;
                let textColor = colors.black;
                let icon = null;

                if (index === item?.correctIndex && item?.userSelected !== -1) {
                  backgroundColor = colors.light_green;
                  textColor = colors.green;
                  icon = require('../../assets/img/correct_ic.png');
                } else if (index === item?.userSelected) {
                  backgroundColor = colors.light_red;
                  textColor = colors.red;
                  icon = require('../../assets/img/wrong_ic.png');
                } else {
                  backgroundColor = colors.light_grey;
                  textColor = colors.black;
                  icon = null;
                }
                return (
                  <View
                    key={index}
                    style={[
                      styles.optionsWrapper,
                      {backgroundColor: backgroundColor},
                    ]}>
                    <View style={[styles.iconWrapper]}>
                      <Image style={styles.resultIc} source={icon} />
                      {/* {index === 3 && (
                        <Image
                          style={styles.resultIc}
                          source={require('../../assets/img/wrong_ic.png')}
                        />
                      )} */}
                    </View>
                    <Text style={[styles.optionText, {color: textColor}]}>
                      {option}
                    </Text>
                  </View>
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
    doubtBtnText: {
      color: colors.blue,
    },
    doubtBtn: {
      backgroundColor: colors.light_blue,
      padding: spacing.s,
      borderRadius: 10,
      alignSelf: 'flex-end',
    },
    questionContainer: {
      paddingBottom: 6,
      marginBottom: spacing.xl,
      borderColor: colors.light_grey,
      borderBottomWidth: 1,
    },
    resultIc: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    selected: {
      width: 10,
      height: 10,
      borderRadius: 50,
    },
    iconWrapper: {
      width: 16,
      marginTop: 1,
      height: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionText: {
      flex: 1,
      fontSize: fontSizes.p2,
    },
    optionsWrapper: {
      padding: spacing.s,
      borderRadius: 10,
      marginBottom: spacing.xl,
      flexDirection: 'row',
      gap: 6,
      backgroundColor: colors.light_grey,
    },
    qNumber: {
      color: colors.black,
      marginTop: 2,
      fontWeight: '600',
      fontSize: fontSizes.p2,
    },
    question: {
      flex: 1,
      color: colors.black,
      fontSize: fontSizes.p,
    },
    qWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: spacing.s,
      gap: 4,
    },
    scrollWrapper: {
      paddingTop: spacing.l,
      paddingHorizontal: spacing.l,
    },
    conainer: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
export default AnswersSheet;
