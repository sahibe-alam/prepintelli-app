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
  navigation?: any;
}
const options = ['1', '2', '3', '4'];
const AnswersSheet: React.FC<PropsType> = props => {
  const {navigation} = props;
  const styles = getStyles();

  return (
    <SafeAreaView style={styles.conainer}>
      <BackHeader onPress={() => navigation.goBack()} title="Answers Sheet" />
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <View style={styles.questionContainer}>
          <View style={styles.qWrapper}>
            <Text style={styles.qNumber}>Q1.</Text>
            <Text style={styles.question}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusamus, dolorum.
            </Text>
          </View>
          {options.map((item: string, index: number) => {
            let backgroundColor = colors.light_grey;
            let textColor = colors.black;

            if (index === 1) {
              backgroundColor = colors.light_green;
              textColor = colors.green;
            } else if (index === 3) {
              backgroundColor = colors.light_red;
              textColor = colors.red;
            } else {
              backgroundColor = colors.light_grey;
              textColor = colors.black;
            }
            return (
              <View
                key={index}
                style={[
                  styles.optionsWrapper,
                  {backgroundColor: backgroundColor},
                ]}>
                <View style={[styles.iconWrapper]}>
                  {index === 1 && (
                    <Image
                      style={styles.resultIc}
                      source={require('../../assets/img/correct_ic.png')}
                    />
                  )}
                  {index === 3 && (
                    <Image
                      style={styles.resultIc}
                      source={require('../../assets/img/wrong_ic.png')}
                    />
                  )}
                </View>
                <Text style={[styles.optionText, {color: textColor}]}>
                  {item}
                </Text>
              </View>
            );
          })}
          <TouchableOpacity style={styles.doubtBtn}>
            <Text style={styles.doubtBtnText}>Ask doubt🤔</Text>
          </TouchableOpacity>
        </View>
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
      paddingBottom: spacing.s,
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
      marginBottom: spacing.xl,
      gap: 4,
    },
    scrollWrapper: {
      flex: 1,
      paddingTop: spacing.l,
      paddingHorizontal: spacing.l,
    },
    conainer: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
export default AnswersSheet;
