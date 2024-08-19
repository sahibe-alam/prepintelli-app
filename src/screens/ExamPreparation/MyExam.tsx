import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import React, { useEffect, useState } from 'react';
import BackHeader from '../../components/BackHeader';
import { colors } from '../../utils/commonStyle/colors';
import { fontSizes, spacing } from '../../utils/commonStyle';
import AccordionItem from '../../components/AccordionItem';
import CustomModal from '../../components/commonComponents/CustomModal';
import DropDownSelect from '../../components/formComponents/DropDownSelect';
import InputField from '../../components/formComponents/InputField';
import Button from '../../components/Button';
import { usePrepContext } from '../../contexts/GlobalState';
import { questionGeneratorLlm } from '../../api/adapter/questionGeneratorLlm';
import { useToast } from 'react-native-toast-notifications';
import SVGComponent from '../../components/commonComponents/svgviewer-react-native-output';
import ThreePulseDots from '../../components/commonComponents/ThreePulseDots';
import { llmApiCall } from '../../api/adapter/llmTutor';
import NoExamTarget from '../../components/NoExamTarget';
import { updateCredit } from '../../api/adapter/updateCredit';
import NoCreditPopUp from '../../components/NoCreditPopUp';
import Images from '../../resources/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PropsType {
  navigation: any;
  route: any;
}
const MyExam: React.FC<PropsType> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNoCredit, setIsNoCredit] = useState(false);
  const [subjectIndex, setSubjectIndex] = useState<number | null>(null);
  const [roadMap, setRoadMap] = useState<any>(null);
  const [modalType, setModalType] = useState<any>('');
  const [isNoProPlanModalVisible, setIsNoProPlanModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    subject: '',
    chapter: '',
    difficulty: '',
    lang: '',
    testTime: '',
  });
  const [getUserInputs, setGetUserInputs] = useState<any>({
    subject: '',
    chapter: '',
    difficulty: '',
    lang: '',
    testTime: 0,
  });
  const toast = useToast();
  const styles = getStyles();
  const { width } = useWindowDimensions();
  const { user, getCredits, planType, setGetCredits } = usePrepContext();

  let error = false;
  const errorObj: { [key: string]: string } = {};
  const isValidError = (errType: string) => {
    if (errType === 'practice') {
      const fieldsToValidate = [
        {
          field: 'subject',
          validation: (value: string) =>
            value.trim() === '' ? 'Subject is required' : '',
        },
        {
          field: 'chapter',
          validation: (value: string) =>
            value.trim() === '' ? 'Chapter is required' : '',
        },
        {
          field: 'difficulty',
          validation: (value: string) =>
            value.trim() === '' ? 'Difficulty is required' : '',
        },
        {
          field: 'lang',
          validation: (value: string) =>
            value.trim() === '' ? 'Language is required' : '',
        },
      ];

      fieldsToValidate.forEach(({ field, validation }) => {
        const newErrorMessage = validation(getUserInputs[field] || '');
        errorObj[field] = newErrorMessage;
        if (newErrorMessage !== '') {
          error = true;
        }
      });
    }
    if (errType === 'doubt') {
      const fieldsToValidate = [
        {
          field: 'subject',
          validation: (value: string) =>
            value.trim() === '' ? 'Subject is required' : '',
        },
      ];

      fieldsToValidate.forEach(({ field, validation }) => {
        const newErrorMessage = validation(getUserInputs[field] || '');
        errorObj[field] = newErrorMessage;
        if (newErrorMessage !== '') {
          error = true;
        }
      });
    }
    return error;
  };
  const toggleModal = (type: string) => {
    if (type === 'doubt') {
      if (getCredits > 0) {
        setModalVisible(!isModalVisible);
        setModalType(type);
      } else {
        setIsNoCredit(true);
      }
    } else {
      if (getCredits > 1) {
        setModalVisible(!isModalVisible);
      } else {
        setIsNoCredit(true);
      }
    }
    setGetUserInputs({
      ...getUserInputs,
      testTime: 0,
    });
  };

  // Prompt for question generation
  const prompt = `
Generate 10 multiple-choice questions (MCQs) in JSON format for the ${
    user?.exams?.[0]?.exam_short_name || ''
  } exam, ${getUserInputs?.subject}, focusing on the ${
    getUserInputs?.chapter
  }, difficulty level ${getUserInputs?.difficulty} and language ${
    getUserInputs?.lang
  }.

Each question should have the following structure:
- "q": The question itself.
- "options": An array containing four options for the answer.
- "correctIndex": The index (0-based) of the correct answer within the "options" array.

Ensure that the questions are relevant to the specified exam, subject, and chapter or unit.
Note: always give new and unique questions.
Return the JSON output without any additional text.

{
  "exam": ${user?.exams?.[0]?.exam_short_name || ''},
  "subject": ${getUserInputs?.subject || ''},",
  "chapter": ${getUserInputs?.chapter || ''},
  "difficulty": ${getUserInputs?.difficulty || ''},
  "lang": ${getUserInputs?.lang || ''},

}

`;

  const handlePractice = () => {
    setLoading(true);
    questionGeneratorLlm([
      {
        role: 'user',
        content: prompt,
      },
    ])
      .then((res: any) => {
        setModalVisible(false);
        setLoading(false);
        const jsonQuestions = JSON.parse(res.data);
        if ('questions' in jsonQuestions) {
          navigation.navigate('Practice test', {
            generativeAiData: jsonQuestions,
            subjectName: getUserInputs?.subject || '',
            chapterName: getUserInputs?.chapter || '',
            testTime: getUserInputs?.testTime || 0,
            subjectIndex: subjectIndex,
          });
        } else {
          toast.show('Something went wrong 😔', {
            type: 'danger',
          });
        }
        updateCredit(user?._id, 2)
          .then((res: any) => {
            setGetCredits && setGetCredits(res?.data?.remainingCredits);
          })
          .then(() => {
            setLoading(false);
          })
          .catch((err: any) => {
            setLoading(false);
            console.log(err);
            toast.show('Something went wrong', {
              type: 'danger',
            });
          });
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
        toast.show('Something went wrong', {
          type: 'danger',
        });
      });
  };
  const handleStart = () => {
    if (modalType === 'practice') {
      const isErr = isValidError('practice');
      setErrorMsg({ ...errorMsg, ...errorObj });
      if (isErr) {
        return;
      }
      if (getCredits > 1) {
        handlePractice();
      } else {
        console.log('You dont have credit ');
      }
    }
    if (modalType === 'doubt') {
      const isErr = isValidError('doubt');
      setErrorMsg({ ...errorMsg, ...errorObj });
      if (isErr) {
        return;
      }
      setModalVisible(false);
      navigation.navigate('Ask doubt', {
        subject: getUserInputs?.subject || '',
      });
    }
  };
  const roadMapPrompt = [
    {
      role: 'system',
      content: 'You are a tutor for any exam.',
    },

    {
      role: 'user',
      content: `Please provide a comprehensive roadmap with syllabus for ${
        user?.exams?.[0]?.examname || user?.exams[0]?.classname
      }: ${user?.exams?.[0]?.exam_short_name}. My subjects are ${
        user?.exams?.[0]?.subjects
      }. Your response should be in HTML code format with proper headings and bullet points. Utilize inline heading font size, with a maximum of 26px. Feel free to add emojis according to relevant keywords.,`,
    },
  ];
  const timeData = [
    {
      time: 'No time limit',
      value: 0,
    },
    {
      time: '10 minutes',
      value: 10,
    },
    {
      time: '15 minutes',
      value: 15,
    },
    {
      time: '20 minutes',
      value: 20,
    },
    {
      time: '25 minutes',
      value: 25,
    },
    {
      time: '30 minutes',
      value: 30,
    },
  ];
  const handleRoadMap = async () => {
    if (!roadMap) {
      llmApiCall(roadMapPrompt, 3000).then((res: any) => {
        if (res.success) {
          if ('data' in res) {
            extractBodyHTML(res.data?.[2]?.content);
          }
        }
      });
    }
  };
  useEffect(() => {
    if (isModalVisible) {
      setGetUserInputs({
        ...getUserInputs,
        testTime: 0,
        difficulty: '',
        subject: '',
        chapter: '',
        lang: '',
      });
      setErrorMsg({
        subject: '',
        chapter: '',
        difficulty: '',
        lang: '',
        testTime: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible]);
  async function extractBodyHTML(htmlString: string) {
    const bodyStart = htmlString.indexOf('<body>');
    const bodyEnd = htmlString.indexOf('</body>');
    if (bodyStart !== -1 && bodyEnd !== -1) {
      const html = htmlString.substring(bodyStart, bodyEnd + 7);
      await AsyncStorage.setItem('roadMap', html);
      return setRoadMap(html);
    } else {
      return '';
    }
  }

  const getHtml = async () => {
    const html = await AsyncStorage.getItem('roadMap');
    if (html) {
      setRoadMap(html);
    }
  };

  useEffect(() => {
    getHtml();
  }, []);
  return (
    <>
      {user?.exams.length > 0 ? (
        <SafeAreaView style={styles.conatainer}>
          <BackHeader
            onPress={() => navigation.navigate('Home')}
            title={'My exam'}
          />
          <Text style={styles.title}>
            Prepare for{' '}
            {user?.exams[0]?.exam_short_name || user?.exams[0].classname} exam
            with your personalized ai teacher 🚀
          </Text>
          <View style={styles.cardsWrapper}>
            <TouchableOpacity
              onPress={() => {
                setModalType('practice');
                toggleModal('practice');
              }}
              activeOpacity={0.8}
              style={styles.card}
            >
              <Image
                style={styles.cardImg}
                source={require('../../assets/img/practice_img.png')}
              />
              <Text style={styles.cardTitle}>Practice test</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalType('doubt');
                toggleModal('doubt');
                // navigation.navigate('Ask doubt');
              }}
              activeOpacity={0.8}
              style={styles.card}
            >
              <Image
                style={styles.cardImg}
                source={require('../../assets/img/ask_img.png')}
              />
              <Text style={styles.cardTitle}>Ask doubt?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (planType !== 'free') {
                  navigation.navigate('Study plan');
                } else {
                  setIsNoProPlanModalVisible(true);
                }
              }}
              activeOpacity={0.8}
              style={styles.card}
            >
              <Image
                style={styles.cardImg}
                source={require('../../assets/img/studyplan_img.png')}
              />
              <Text style={styles.cardTitle}>Study plan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // toast.show('Community feature coming soon 😍!');
                navigation.navigate('Community');
              }}
              activeOpacity={0.8}
              style={styles.card}
            >
              <Image style={styles.cardImg} source={Images.communityImg} />
              <View style={styles.cardTitleWrapper}>
                <Text style={styles.cardTitle}>
                  {user?.exams[0]?.exam_short_name || user?.exams[0].classname}
                  {'\n'}community
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.accordionWrapper}>
              <AccordionItem
                isOpen={handleRoadMap}
                title={`Roadmap for ${
                  user?.exams[0]?.exam_short_name ||
                  user?.exams[0].classname ||
                  ''
                } exam`}
              >
                {roadMap ? (
                  <RenderHtml
                    source={{
                      html: `<div style="color: ${colors.black}">${roadMap} </div>`,
                    }}
                    contentWidth={width}
                  />
                ) : (
                  <ThreePulseDots color={colors.purple} />
                )}
              </AccordionItem>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <NoExamTarget onPress={() => navigation.navigate('Home')} />
      )}

      {/* MODAL FOR PRACTICE  */}
      <CustomModal
        isModalVisible={isModalVisible}
        isModalHide={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          {!isLoading ? (
            <>
              <DropDownSelect
                DropDownLabel="Select subject"
                data={user?.exams[0]?.subjects || []}
                rowTextForSelection={(item: any) =>
                  item.charAt(0).toUpperCase() + item.slice(1)
                }
                buttonTextAfterSelection={(item: any) =>
                  item.charAt(0).toUpperCase() + item.slice(1)
                }
                errorMsg={errorMsg?.subject}
                onSelect={(item: any, index: number) => {
                  setSubjectIndex(index);
                  setGetUserInputs({ ...getUserInputs, subject: item });
                }}
              />
              {modalType === 'practice' && (
                <>
                  <InputField
                    label="Chapter or unit"
                    placeholder="Type chapter or unit"
                    errorMsg={errorMsg?.chapter}
                    onChangeText={(text) => {
                      setGetUserInputs({ ...getUserInputs, chapter: text });
                    }}
                    value={getUserInputs?.chapter}
                  />

                  <DropDownSelect
                    DropDownLabel="Select difficulty level"
                    data={[
                      {
                        id: 1,
                        name: 'Easy',
                      },
                      {
                        id: 2,
                        name: 'Medium',
                      },
                      {
                        id: 3,
                        name: 'Hard',
                      },
                    ]}
                    rowTextForSelection={(item: any) => item?.name}
                    buttonTextAfterSelection={(item: any) => item?.name}
                    errorMsg={errorMsg?.difficulty}
                    onSelect={(item: any) => {
                      setGetUserInputs({
                        ...getUserInputs,
                        difficulty: item?.name,
                      });
                    }}
                  />
                  <DropDownSelect
                    DropDownLabel="Select Language"
                    data={[
                      {
                        id: 1,
                        name: 'English',
                      },
                      {
                        id: 2,
                        name: 'Hindi',
                      },
                    ]}
                    rowTextForSelection={(item: any) => item?.name}
                    buttonTextAfterSelection={(item: any) => item?.name}
                    errorMsg={errorMsg?.lang}
                    onSelect={(item: any) => {
                      setGetUserInputs({ ...getUserInputs, lang: item?.name });
                    }}
                  />
                  <View>
                    <View style={styles.timeWrapper}>
                      <DropDownSelect
                        DropDownLabel="Select time for 10 questions"
                        defaultButtonText="Select time"
                        data={timeData}
                        errorMsg={errorMsg?.testTime}
                        rowTextForSelection={(item: any) => item.time}
                        buttonTextAfterSelection={(item: any) => item.time}
                        onSelect={(item: any) => {
                          // setTestTime(item.value);
                          setGetUserInputs({
                            ...getUserInputs,
                            testTime: item?.value,
                          });
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
              <Button
                isLoading={isLoading}
                onPress={handleStart}
                title={
                  modalType === 'practice' ? 'Start' : 'Chat with ai teacher'
                }
              />
            </>
          ) : (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <SVGComponent />
              <Text style={styles.loadingText}>
                Your Ai teacher is creating some questions for you 😍
              </Text>
              <View
                style={{
                  marginTop: 10,
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <ThreePulseDots color={colors.blue} />
              </View>
            </View>
          )}
        </View>
      </CustomModal>
      {isNoCredit && (
        <CustomModal
          isModalVisible={isNoCredit}
          isModalHide={() => setIsNoCredit(false)}
        >
          <NoCreditPopUp
            upgradeClick={() => {
              navigation.navigate('Get pro');
              setIsNoCredit(false);
            }}
          />
        </CustomModal>
      )}
      <CustomModal
        isModalVisible={isNoProPlanModalVisible}
        isModalHide={() => setIsNoProPlanModalVisible(false)}
      >
        <Text
          style={{
            color: colors.black,
            fontSize: fontSizes.h5,
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          Upgrade Your Plan to Access Personalized Study Plans
        </Text>
        <Text
          style={{
            color: colors.black,
            fontSize: fontSizes.p2,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Unlock custom study plans tailored to your chosen subjects and exam
          schedule.
        </Text>

        <Button
          title={'Upgrade Now'}
          onPress={() => navigation.navigate('Get pro')}
        />
      </CustomModal>
    </>
  );
};

const getStyles = () =>
  StyleSheet.create({
    cardTitleWrapper: {
      flex: 1,
    },
    timeWrapper: {
      flexDirection: 'row',
      gap: 16,
    },
    input: {
      height: 48,
      padding: 8,
      fontSize: fontSizes.p2,
      color: colors.black,
      borderWidth: 1,
      flex: 1,
      borderRadius: 10,
      borderColor: colors.grey,
    },
    loadingText: {
      fontSize: fontSizes.p2,
      lineHeight: 22,
      textAlign: 'center',
      color: colors.blue,
      maxWidth: '80%',
    },
    modalContent: { gap: 16 },
    accordionWrapper: {
      flex: 1,
      padding: spacing.l,
    },
    cardTitle: {
      color: colors.blue,
      fontWeight: '600',
      fontSize: fontSizes.p3,
      textAlign: 'center',
    },
    cardImg: {
      height: 60,
      width: 60,
      resizeMode: 'contain',
    },
    card: {
      borderWidth: 1,
      borderColor: colors.light_blue,
      borderRadius: 10,
      flexDirection: 'row',
      backgroundColor: colors.light_blue,
      padding: 4,
      shadowColor: '#000',
      alignItems: 'center',
      width: '48%',
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.13,
      shadowRadius: 1.62,
    },
    cardsWrapper: {
      flexDirection: 'row',
      paddingTop: spacing.l,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: spacing.l,
      paddingHorizontal: spacing.l,
      paddingBottom: spacing.m,
    },
    title: {
      color: colors.black,
      fontSize: fontSizes.p2,
      paddingHorizontal: spacing.l,
      marginTop: spacing.l,
    },
    conatainer: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
export default MyExam;
