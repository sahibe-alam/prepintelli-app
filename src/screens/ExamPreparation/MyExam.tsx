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

import React, {useEffect, useState} from 'react';
import BackHeader from '../../components/BackHeader';
import {colors} from '../../utils/commonStyle/colors';
import {fontSizes, spacing} from '../../utils/commonStyle';
import AccordionItem from '../../components/AccordionItem';
import CustomModal from '../../components/commonComponents/CustomModal';
import DropDownSelect from '../../components/formComponents/DropDownSelect';
import InputField from '../../components/formComponents/InputField';
import Button from '../../components/Button';
import {usePrepContext} from '../../contexts/GlobalState';
import {questionGeneratorLlm} from '../../api/adapter/questionGeneratorLlm';
import {useToast} from 'react-native-toast-notifications';
import SVGComponent from '../../components/commonComponents/svgviewer-react-native-output';
import ThreePulseDots from '../../components/commonComponents/ThreePulseDots';
import {llmApiCall} from '../../api/adapter/llmTutor';
import NoExamTarget from '../../components/NoExamTarget';

interface PropsType {
  navigation: any;
  route: any;
}
const MyExam: React.FC<PropsType> = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [roadMap, setRoadMap] = useState<any>(null);
  const [modalType, setModalType] = useState<any>('');
  const [errorMsg, setErrorMsg] = useState({
    subject: '',
    chapter: '',
  });
  const toast = useToast();
  const styles = getStyles();
  const {width} = useWindowDimensions();
  const {user} = usePrepContext();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Prompt for question generation
  const prompt = `
Generate 10 multiple-choice questions (MCQs) in JSON format for the ${
    user?.exams?.[0]?.exam_short_name || ''
  } exam, ${subject}, focusing on the ${chapter}.

Each question should have the following structure:
- "q": The question itself.
- "options": An array containing four options for the answer.
- "correctIndex": The index (0-based) of the correct answer within the "options" array.

Ensure that the questions are relevant to the specified exam, subject, and chapter or unit.

Return the JSON output without any additional text.

{
  "exam": ${user?.exams?.[0]?.exam_short_name || ''},
  "subject": ${subject}",
  "chapter": ${chapter},
  "questions": 3
}

`;

  const validations = () => {
    if (!subject) {
      setErrorMsg(prev => ({...prev, subject: 'Subject is required'}));
    } else {
      setErrorMsg(prev => ({...prev, subject: ''}));
    }

    if (!chapter) {
      setErrorMsg(prev => ({...prev, chapter: 'Chapter is required'}));
    } else {
      setErrorMsg(prev => ({...prev, chapter: ''}));
    }
  };

  const handlePractice = () => {
    validations();
    setLoading(true);
    if (subject && chapter) {
      questionGeneratorLlm([
        {
          role: 'user',
          content: prompt,
        },
      ])
        .then((res: any) => {
          setChapter('');
          setModalVisible(false);
          setLoading(false);
          const jsonQuestions = JSON.parse(res.data);
          if ('questions' in jsonQuestions) {
            navigation.navigate('Practice test', {
              generativeAiData: jsonQuestions,
              subjectName: subject,
              chapterName: chapter,
            });
          } else {
            toast.show('Something went wrong 😔', {
              type: 'danger',
            });
          }
        })
        .catch((err: any) => {
          setLoading(false);
          console.log(err);
          toast.show('Something went wrong', {
            type: 'danger',
          });
        });
    } else {
      setLoading(false);
    }
  };
  const handleStart = () => {
    if (modalType === 'practice') {
      handlePractice();
    }
    if (modalType === 'doubt') {
      setModalVisible(false);
      navigation.navigate('Ask doubt', {subject: subject});
    }
  };
  const roadMapPrompt = [
    {
      role: 'system',
      content: 'You are a tutor for any exam.',
    },

    {
      role: 'user',
      content: `Please provide a comprehensive roadmap for ${user?.exams?.[0]?.examname}: ${user?.exams?.[0]?.exam_short_name}. My subjects are ${user?.exams?.[0]?.subjects}. Your response should be in HTML code format with proper headings and bullet points. Utilize inline heading font size, with a maximum of 26px. Feel free to add emojis according to relevant keywords.,`,
    },
  ];
  const handleRoadMap = async () => {
    llmApiCall(roadMapPrompt, 3000).then((res: any) => {
      if (res.success) {
        if ('data' in res) {
          extractBodyHTML(res.data?.[2]?.content);
        }
      }
    });
  };
  useEffect(() => {
    if (isModalVisible) {
      setSubject('');
      setChapter('');
      setErrorMsg({
        subject: '',
        chapter: '',
      });
    }
  }, [isModalVisible]);
  function extractBodyHTML(htmlString: string) {
    const bodyStart = htmlString.indexOf('<body>');
    const bodyEnd = htmlString.indexOf('</body>');
    if (bodyStart !== -1 && bodyEnd !== -1) {
      return setRoadMap(htmlString.substring(bodyStart, bodyEnd + 7));
    } else {
      return '';
    }
  }
  return (
    <>
      {user?.exams.length > 0 ? (
        <SafeAreaView style={styles.conatainer}>
          <BackHeader onPress={() => navigation.goBack()} title={'My exam'} />
          <Text style={styles.title}>
            Prepare for {user?.exams[0]?.exam_short_name} exam with your
            personalized ai teacher 🚀
          </Text>
          <View style={styles.cardsWrapper}>
            <TouchableOpacity
              onPress={() => {
                setModalType('practice');
                toggleModal();
              }}
              activeOpacity={0.8}
              style={styles.card}>
              <Image
                style={styles.cardImg}
                source={require('../../assets/img/practice_img.png')}
              />
              <Text style={styles.cardTitle}>Practice test</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalType('doubt');
                toggleModal();
                // navigation.navigate('Ask doubt');
              }}
              activeOpacity={0.8}
              style={styles.card}>
              <Image
                style={styles.cardImg}
                source={require('../../assets/img/ask_img.png')}
              />
              <Text style={styles.cardTitle}>Ask doubt?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Study plan');
              }}
              activeOpacity={0.8}
              style={styles.card}>
              <Image
                style={styles.cardImg}
                source={require('../../assets/img/studyplan_img.png')}
              />
              <Text style={styles.cardTitle}>Study plan</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.accordionWrapper}>
              <AccordionItem
                isOpen={handleRoadMap}
                title={`Roadmap for ${user?.exams[0]?.exam_short_name} exam`}>
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
      <CustomModal isModalVisible={isModalVisible} isModalHide={toggleModal}>
        <View style={styles.modalContent}>
          {!isLoading ? (
            <>
              <DropDownSelect
                DropDownLabel="Select subject"
                data={user?.exams[0]?.subjects || []}
                rowTextForSelection={(item: any) => item}
                buttonTextAfterSelection={(item: any) => item}
                errorMsg={errorMsg?.subject}
                onSelect={(item: any) => {
                  setSubject(item);
                }}
              />
              {modalType === 'practice' && (
                <InputField
                  label="Chapter or unit"
                  placeholder="Type chapter or unit"
                  errorMsg={errorMsg?.chapter}
                  onChangeText={text => {
                    setChapter(text);
                  }}
                  value={chapter}
                />
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <SVGComponent />
              <Text style={styles.loadingText}>
                Your Ai teacher is creating some question for you 😍
              </Text>
              <View
                style={{
                  marginTop: 10,
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <ThreePulseDots color={colors.blue} />
              </View>
            </View>
          )}
        </View>
      </CustomModal>
    </>
  );
};

const getStyles = () =>
  StyleSheet.create({
    loadingText: {
      fontSize: fontSizes.p2,
      lineHeight: 22,
      textAlign: 'center',
      color: colors.blue,
      maxWidth: '80%',
    },
    modalContent: {gap: 16},
    accordionWrapper: {
      flex: 1,
      padding: spacing.l,
    },
    cardTitle: {
      color: colors.blue,
      fontWeight: '600',
      fontSize: fontSizes.p3,
      textAlign: 'center',
      paddingBottom: spacing.s,
    },
    cardImg: {
      width: '100%',
      height: 70,
      resizeMode: 'contain',
    },
    card: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.blue,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.13,
      shadowRadius: 1.62,
      elevation: 4,
    },
    cardsWrapper: {
      flexDirection: 'row',
      paddingTop: spacing.l,
      paddingHorizontal: spacing.l,
      paddingBottom: spacing.m,
      gap: spacing.l,
    },
    title: {
      color: colors.black,
      fontSize: fontSizes.p,
      paddingHorizontal: spacing.l,
      marginTop: spacing.l,
    },
    conatainer: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
export default MyExam;
