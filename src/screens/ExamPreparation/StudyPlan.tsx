import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BackHeader from '../../components/BackHeader';
import {colors} from '../../utils/commonStyle/colors';
import PromptInput from '../../components/examPrepComponents/PromptInput';
import {spacing} from '../../utils/commonStyle';
import ResponseCard from '../../components/commonComponents/ResponseCard';
import {llmApiCall} from '../../api/adapter/llmTutor';
import {usePrepContext} from '../../contexts/GlobalState';
import {fileDownloader} from '../../utils/fileDownloader';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Button from '../../components/Button';

interface propsType {
  navigation: any;
  route: any;
}
interface IMessage {
  role: string;
  content: string;
}
const StudyPlan: React.FC<propsType> = props => {
  const {navigation} = props;
  const {user} = usePrepContext();
  const [html, setHtml] = useState<null | string>(null);

  const prompt = `you are an exam planner assisting students in creating personalized study plans. Begin by asking the user about their upcoming exam in a step-by-step manner,.
  ask following question or any question related to students exam in details to students.
  1-Exam duration?
  2-Exam format?
  3-Exam mode?
  4-Exam marks?
  5-Strengths and weaknesses?
  6-Time available for per day study?
  7-Learning style?
  8-Study schedule preference?
  9-Available resources?
  10-Practice materials?
  11-Exam goals?
  12-Study session breakdown?
  13-Motivation strategies?

  Based on above question you need to suggest best study plan to students for upcoming ${user?.exams[0]?.exam_short_name} and divide student time for each subject according to their weakness and strengths.
  note: You need to ask question in plan text but make sure when you generate study plan it should be only in HTML code format without any plan text in it.
`;

  const userPrompt = `
Hello! I'm ${user?.firstname}, give a personalized study plan for my upcoming ${user?.exams[0]?.exam_short_name} exam. The subjects I'll be tackling include ${user?.exams[0]?.subjects} .
let me tell you what want to you for my study plan.
1: give tips on how to study?
2: what should i remember when i attend exam?
3: what to handle my weakness?
4: how get maximum score in exam?
5: how to prepare for exam?
6: give me additional tip and guidance for exam?
7: how to prepare for exam?
8: Create time table for study
AND you suggest according to you about my exam 

these plan should we heading and bullet point format
note: do not ask all question at once. ask one by one 
`;

  const [conversationList, setConversationList] = React.useState<any>([
    {
      role: 'system',
      content: prompt,
    },
    {
      role: 'user',
      content: userPrompt,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const styles = getStyles();
  const handleInputValue = (value: string) => {
    setInputValue(value);
  };

  // msg sent handler and get response
  const handleSend = () => {
    let newMsgArray: IMessage[] = [...conversationList];

    if (inputValue.length > 0) {
      newMsgArray.push({role: 'user', content: inputValue});
      setConversationList(newMsgArray);
    }

    setLoading(true);
    // setMsg('');
    llmApiCall(newMsgArray, 4000)
      .then(res => {
        if (res.success) {
          if ('data' in res) {
            setLoading(false);
            setConversationList([...res.data]);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Generate html to pdf handler
  const generatePdf = async (html_code: string) => {
    const options = {
      html: html_code,
      fileName: 'Study Plan',
      directory: 'Documents',
      base64: false,
    };
    await RNHTMLtoPDF.convert(options).then(file => {
      const localUrl = `file://${file.filePath}`;
      fileDownloader(localUrl, null, 'pdf').then(res => {
        console.log('success', res);
      });
    });
  };

  // scroll bottom when new response added
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 50);
  }, [conversationList]);

  useEffect(() => {
    handleSend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function extractBodyHTML(htmlString: string) {
    const bodyStart = htmlString.indexOf('<body>');
    const bodyEnd = htmlString.indexOf('</body>');

    if (bodyStart !== -1 && bodyEnd !== -1) {
      return setHtml(htmlString.substring(bodyStart, bodyEnd + 7));
    } else {
      return '';
    }
  }
  useEffect(() => {
    conversationList?.forEach((element: any) => {
      if (element.role === 'assistant') {
        extractBodyHTML(element.content);
      }
    });
  }, [conversationList]);

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
        title={'Create Study Plan'}
      />
      <View style={styles.wrapper}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollWrapper}>
          <View style={styles.responseWrapper}>
            {conversationList.slice(2).map((item: any, index: number) => {
              return (
                <View key={index}>
                  <ResponseCard
                    isLeft={item?.role === 'user' ? false : true}
                    content={item?.content}
                    key={index}
                  />
                </View>
              );
            })}
            {html && (
              <Button
                title={'Download study plan'}
                onPress={() => generatePdf(html)}
              />
            )}
            {isLoading && <ResponseCard forLoader={true} isLeft={true} />}
          </View>
        </ScrollView>
        {!html && (
          <View style={styles.inputWrapper}>
            <PromptInput
              onInputChange={handleInputValue}
              placeholder="Ask doubt?"
              onPress={handleSend}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    scrollWrapper: {},
    responseWrapper: {
      paddingTop: 6,
      paddingBottom: spacing.s,
      paddingHorizontal: spacing.l,
    },
    inputWrapper: {
      paddingHorizontal: spacing.l,
      paddingBottom: spacing.m,
    },
    wrapper: {
      flex: 1,
      justifyContent: 'space-between',
    },
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
export default StudyPlan;
