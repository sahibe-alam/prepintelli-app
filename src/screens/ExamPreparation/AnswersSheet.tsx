import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import BackHeader from '../../components/BackHeader';
import {colors} from '../../utils/commonStyle/colors';
import {fontSizes, spacing} from '../../utils/commonStyle';
import CustomModal from '../../components/commonComponents/CustomModal';
import PromptInput from '../../components/examPrepComponents/PromptInput';
import ResponseCard from '../../components/commonComponents/ResponseCard';
import {llmApiCall} from '../../api/adapter/llmTutor';

interface PropsType {
  navigation: any;
  questionsWithUserSelected: any;
  route: any;
}
interface IMessage {
  role: string;
  content: string;
}
const AnswersSheet: React.FC<PropsType> = (props: PropsType) => {
  const {navigation} = props;
  const {questionsWithUserSelected, subjectName} = props.route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [doubtQuestion, setDoubtQuestion] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const [conversationList, setConversationList] = React.useState<any>([]);
  const toggleModal = (question?: any, questionIndex?: number) => {
    setModalVisible(!isModalVisible);
    setDoubtQuestion([question, questionIndex]);
    setConversationList([
      ...conversationList,
      {
        role: 'system',
        content: `You are ${subjectName} tutor. you need to explain ${question?.q} this question option is ${question?.options}. if user ask anything out of ${subjectName} just reply please ask about ${subjectName} only.`,
      },
      {
        role: 'assistant',
        content: `Feel free to ask 😍 me about question number ${
          questionIndex !== undefined && questionIndex + 1
        }.`,
      },
    ]);
  };
  console.log(doubtQuestion, 'sa');
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

  const getOptionIcon = (
    index: number,
    correctIndex: number,
    userSelected: number,
  ) => {
    if (index === userSelected) {
      if (index === correctIndex) {
        return {optionIcon: require('../../assets/img/correct_ic.png')};
      } else {
        return {optionIcon: require('../../assets/img/wrong_ic.png')};
      }
    } else if (index === correctIndex) {
      return {optionIcon: require('../../assets/img/correct_ic.png')};
    } else {
      return {optionIcon: null};
    }
  };
  const handleInputValue = (value: string) => {
    setInputValue(value);
  };
  const handleSend = () => {
    let newMsgArray: IMessage[] = [...conversationList];
    if (inputValue.trim().length > 0) {
      newMsgArray.push({role: 'user', content: inputValue});
      setConversationList(newMsgArray);
      setLoading(true);
    }
    // setMsg('');
    llmApiCall(newMsgArray, 1000).then(res => {
      if (res.success) {
        if ('data' in res) {
          setLoading(false);
          setConversationList([...res.data]);
        }
      }
    });
  };
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 50);
  }, [conversationList]);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <BackHeader onPress={() => navigation.goBack()} title="Answers Sheet" />
        <ScrollView contentContainerStyle={styles.scrollWrapper}>
          {questionsWithUserSelected?.map((item: any, index: number) => {
            const isLastIndex = index === questionsWithUserSelected.length - 1;

            return (
              <View
                style={[
                  styles.questionContainer,
                  {
                    borderBottomWidth: isLastIndex ? 0 : 1,
                  },
                ]}
                key={index}>
                <View style={styles.questionWrapper}>
                  <Text style={styles.questionNumber}>Q{index + 1}.</Text>
                  <Text style={styles.questionText}>{item?.q}</Text>
                </View>
                {item?.userSelected === -1 && (
                  <View style={styles.unAttemptedWrapper}>
                    <View style={styles.unAttemptedTextWrapper}>
                      <Text style={styles.unAttemptedText}>
                        Unattempted question ☹️
                      </Text>
                    </View>
                  </View>
                )}
                {item.options.map((option: string, optionIndex: number) => {
                  const {backgroundColor, textColor} = getBackgroundColor(
                    optionIndex,
                    item.correctIndex,
                    item.userSelected,
                  );
                  const {optionIcon} = getOptionIcon(
                    optionIndex,
                    item.correctIndex,
                    item.userSelected,
                  );
                  return (
                    <TouchableOpacity
                      key={optionIndex}
                      activeOpacity={1}
                      style={[styles.optionWrapper, {backgroundColor}]}>
                      {optionIcon && (
                        <View style={styles.optionIconWrapper}>
                          <Image
                            source={optionIcon}
                            style={styles.optionIcon}
                            resizeMode="contain"
                          />
                        </View>
                      )}
                      <Text style={[styles.optionText, {color: textColor}]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  style={styles.doubtBtn}
                  onPress={() => toggleModal(item, index)}>
                  <Text style={styles.doubtBtnText}>Ask doubt🤔</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>

      {/* Question doubt ask modal  */}
      <CustomModal
        isFullHeight={true}
        isModalVisible={isModalVisible}
        isModalHide={() => {
          toggleModal();
          setConversationList([]);
        }}>
        <View style={styles.modalWrapper}>
          {doubtQuestion && (
            <View style={styles.modalHeader}>
              <Text style={styles.questionTextModal}>
                <Text style={styles.questionNumber}>
                  Question {doubtQuestion[1] + 1}:
                </Text>{' '}
                {doubtQuestion[0]?.q}
              </Text>
            </View>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollWrapperModal}>
            <View style={styles.responseWrapper}>
              {conversationList.slice(1).map((item: any, index: number) => (
                <ResponseCard
                  isLeft={item?.role === 'user' ? false : true}
                  content={item?.content}
                  key={index}
                />
              ))}
              {isLoading && <ResponseCard forLoader={true} isLeft={true} />}
            </View>
          </ScrollView>
          <View style={styles.inputWrapper}>
            <PromptInput
              onInputChange={handleInputValue}
              placeholder="Ask doubt?"
              onPress={handleSend}
            />
          </View>
        </View>
      </CustomModal>
    </>
  );
};

const getStyles = () =>
  StyleSheet.create({
    questionTextModal: {
      color: colors.black,
      fontSize: fontSizes.p2,
    },
    modalHeader: {
      borderBottomWidth: 1,
      borderColor: colors.light_grey,
      marginBottom: spacing.s,
      paddingVertical: spacing.s,
    },
    scrollWrapperModal: {},
    responseWrapper: {},
    modalWrapper: {
      flex: 1,
    },
    inputWrapper: {
      paddingHorizontal: 0,
      paddingBottom: spacing.m,
    },
    optionIconWrapper: {},
    optionIcon: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
      marginTop: 1,
    },
    unAttemptedTextWrapper: {
      borderRadius: 4,
      overflow: 'hidden',
    },
    unAttemptedWrapper: {
      flexDirection: 'row',
      marginBottom: spacing.m,
    },
    unAttemptedText: {
      color: colors.black,
      fontSize: 10,
      backgroundColor: '#fff6a3',
      padding: 6,
    },
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
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 4,
      marginBottom: spacing.m,
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
