import { View, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../utils/commonStyle/colors';
import BackHeader from '../../components/BackHeader';
import Button from '../../components/Button';
import { spacing } from '../../utils/commonStyle';
import Questions from '../../components/examPrepComponents/Questions';
import QuestionsProgressBar from '../../components/examPrepComponents/QuestionsProgressBar';

interface PropsType {
  navigation?: any;
  route?: any;
}

interface Question {
  q: string;
  options: string[];
  correctIndex: number;
  userSelected?: number;
}

const PracticeTest: React.FC<PropsType> = (props) => {
  const { navigation, route } = props;
  const { generativeAiData, subjectName, chapterName } = route.params;
  const styles = getStyles();
  const [answers, setAnswers] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [results, setResults] = useState<{
    correctAnswers: number;
    wrongAnswers: number;
    scorePercentage: number;
    notAttempted: number;
  } | null>(null);
  const [questionsWithUserSelected, setQuestionsWithUserSelected] = useState<
    Question[] | null
  >(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questionsArray, setQuestionsArray] = useState<Question[] | null>(
    generativeAiData?.questions || []
  );
  const handleOptionClick = (questionIndex: number, selectedOption: number) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = selectedOption;
      return newAnswers;
    });
  };

  const handleSubmit = (questionIndex: number) => {
    if (results === null && answers[questionIndex] === undefined) {
      handleOptionClick(questionIndex, -1);
    }
    // Calculate total questions
    const totalQuestions = questionsArray?.length || 0;

    // Count correct, wrong, and not attempted questions
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let notAttempted = 0;

    for (let i = 0; i < totalQuestions; i++) {
      const correctIndex = questionsArray && questionsArray[i].correctIndex;
      const userAnswer = answers[i];

      if (userAnswer === -1) {
        // Not attempted
        notAttempted++;
      } else if (userAnswer === undefined) {
        // Not attempted, if the option is undefined
        notAttempted++;
      } else if (userAnswer === correctIndex) {
        // Correct answer
        correctAnswers++;
      } else {
        // Wrong answer
        wrongAnswers++;
      }
    }

    // Calculate score percentage
    const scorePercentage = (correctAnswers / totalQuestions) * 100 || 0;

    // Update results state
    // setResults({correctAnswers, wrongAnswers, scorePercentage, notAttempted});
    let myResults = {
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
      scorePercentage: scorePercentage,
      notAttempted: notAttempted,
    };
    navigation.navigate('Test Result', {
      myResults,
      questionsWithUserSelected,
      subjectName,
      chapterName,
    });
  };

  const handleNext = (questionIndex: number) => {
    if (results === null && answers[questionIndex] === undefined) {
      handleOptionClick(questionIndex, -1);
    }
    if (currentQuestionIndex < (questionsArray?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const userSelected = () => {
    const resultQuestions = (questionsArray || []).map((question, index) => {
      return {
        ...question,
        userSelected: answers[index],
      };
    });
    setQuestionsWithUserSelected(resultQuestions);
  };

  useEffect(() => {
    userSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => navigation.goBack()}
        title={`${currentQuestionIndex + 1}/${questionsArray?.length || 0}`}
        isTimer={true}
      />
      <QuestionsProgressBar
        totalQuestions={questionsArray?.length || 0}
        currentQuestionNumber={currentQuestionIndex + 1}
      />
      <View style={styles.questionWrapper}>
        {questionsArray && (
          <Questions
            onOptionSelect={handleOptionClick}
            totalQuestions={questionsArray?.length || 0}
            currentQuestionNumber={currentQuestionIndex + 1}
            question={questionsArray[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
          />
        )}
      </View>

      <View
        style={[
          styles.actionBtn,
          {
            justifyContent:
              currentQuestionIndex > 0 ? 'space-between' : 'flex-end',
          },
        ]}
      >
        {currentQuestionIndex > 0 && (
          <Button
            onPress={handlePrev}
            btnWidth={'40%'}
            title="Prev"
            outline={true}
          />
        )}
        {currentQuestionIndex < (questionsArray?.length || 0) - 1 ? (
          <Button
            onPress={() => handleNext(currentQuestionIndex)}
            btnWidth="40%"
            title="Next"
          />
        ) : (
          <Button
            onPress={() => {
              handleSubmit(currentQuestionIndex);
            }}
            btnWidth="40%"
            title="Submit test"
          />
        )}
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
      paddingBottom: spacing.m,
    },
    container: {
      backgroundColor: colors.lightBg,
      flex: 1,
    },
  });
export default PracticeTest;
