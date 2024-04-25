import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {fontSizes, spacing} from '../../utils/commonStyle';
import {colors} from '../../utils/commonStyle/colors';

interface PropsTypes {
  question?: any;
  totalQuestions?: number;
  currentQuestionNumber?: number;
  onOptionSelect?: (questionIndex: number, optionIndex: number) => void;
  setSelectedOption?: (questionIndex: number, optionIndex: number) => void;
  answers?: any;
  currentQuestionIndex?: number;
}
const Questions: React.FC<PropsTypes> = props => {
  const {
    question,
    currentQuestionNumber,
    onOptionSelect,
    answers,
    currentQuestionIndex,
  } = props;
  const styles = getStyles();

  const handleOption = (index: number) => {
    if (currentQuestionNumber !== undefined) {
      if (onOptionSelect) {
        onOptionSelect(currentQuestionNumber - 1, index);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.qWrapper}>
        <Text style={styles.qNumber}>{currentQuestionNumber}.</Text>
        <Text style={styles.question}>{question?.q}</Text>
      </View>
      {question?.options.map((item: string, index: number) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleOption(index)}
            key={index}
            style={[
              styles.optionsWrapper,
              {
                backgroundColor:
                  answers?.[currentQuestionIndex || 0] === index
                    ? colors.light_blue
                    : colors.light_grey,
              },
            ]}>
            <View
              style={[
                styles.radioWrapper,
                {
                  borderColor:
                    answers?.[currentQuestionIndex || 0] === index
                      ? colors.blue
                      : colors.grey,
                },
              ]}>
              <View
                style={[
                  styles.selected,
                  {
                    backgroundColor:
                      answers?.[currentQuestionIndex || 0] === index
                        ? colors.blue
                        : colors.light_grey,
                  },
                ]}
              />
            </View>
            <Text
              style={[
                styles.optionText,
                {
                  color:
                    answers?.[currentQuestionIndex || 0] === index
                      ? colors.blue
                      : colors.black,
                },
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    selected: {
      width: 10,
      height: 10,
      borderRadius: 50,
    },
    radioWrapper: {
      width: 16,
      backgroundColor: colors.light_grey,
      borderRadius: 50,
      marginTop: 1,
      height: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
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
    },
    qNumber: {color: colors.black, fontWeight: '600', fontSize: fontSizes.p2},
    question: {
      flex: 1,
      color: colors.black,
      fontSize: fontSizes.p,
    },
    qWrapper: {
      flexDirection: 'row',
      marginBottom: spacing.xl,
      gap: 4,
    },
    container: {
      paddingHorizontal: spacing.l,
    },
  });
export default Questions;
