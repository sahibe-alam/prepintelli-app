import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import BackHeader from '../../components/BackHeader';
import { colors } from '../../utils/commonStyle/colors';
import PromptInput from '../../components/examPrepComponents/PromptInput';
import { spacing } from '../../utils/commonStyle';
import ResponseCard from '../../components/commonComponents/ResponseCard';
import { llmApiCall } from '../../api/adapter/llmTutor';
import { usePrepContext } from '../../contexts/GlobalState';
import { updateAskDoubt } from '../../api/adapter/studentPerformance';
import { updateCredit } from '../../api/adapter/updateCredit';
import CustomModal from '../../components/commonComponents/CustomModal';
import NoCreditPopUp from '../../components/NoCreditPopUp';
interface propsType {
  navigation: any;
  route: any;
}
interface IMessage {
  role: string;
  content: string;
}
const AskDoubt: React.FC<propsType> = (props) => {
  const { navigation, route } = props;
  const { user, getCredits, setGetCredits } = usePrepContext();
  const { subject } = route.params;
  const [isNoCredit, setIsNoCredit] = useState(false);
  const systemPrompt = `You are prepIntelli developed by Sahibe alam a software engineer. here you will be helpful ${subject} tutor. explain step by step in easy to understand language. if user ask anything out of ${subject} just reply please ask about ${subject} only.`;
  const assistantPrompt = `Hello ${user?.firstname}, how can I help you about ${subject}😍?`;
  const [conversationList, setConversationList] = React.useState<any>([
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'assistant',
      content: assistantPrompt,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const styles = getStyles();
  const handleInputValue = (value: string) => {
    setInputValue(value);
  };
  const handleSend = async () => {
    let newMsgArray: IMessage[] = [...conversationList];
    if (inputValue.length > 0) {
      // setMsg('');
      if (getCredits > 0) {
        newMsgArray.push({ role: 'user', content: inputValue });
        setConversationList(newMsgArray);
        setLoading(true);
        llmApiCall(newMsgArray, 1000).then((res) => {
          if (res.success) {
            if ('data' in res) {
              setLoading(false);
              setConversationList([...res.data]);
            }
            updateAskDoubt(user?._id);
          }
          updateCredit(user?._id, 1).then((res: any) => {
            setGetCredits && setGetCredits(res?.data?.remainingCredits);
          });
        });
      } else {
        setLoading(false);
        console.log('You dont have credit ');
        setIsNoCredit(true);
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 50);
  }, [conversationList]);
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
        title={`Ask about ${subject}`}
      />
      <View style={styles.wrapper}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollWrapper}
        >
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
      {isNoCredit && (
        <CustomModal
          isModalVisible={isNoCredit}
          isModalHide={() => setIsNoCredit(false)}
        >
          <NoCreditPopUp />
        </CustomModal>
      )}
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    scrollWrapper: {},
    responseWrapper: {
      paddingTop: 6,
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
export default AskDoubt;
