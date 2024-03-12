import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BackHeader from '../../components/BackHeader';
import {colors} from '../../utils/commonStyle/colors';
import PromptInput from '../../components/examPrepComponents/PromptInput';
import {spacing} from '../../utils/commonStyle';
import ResponseCard from '../../components/commonComponents/ResponseCard';
import {llmApiCall} from '../../api/adapter/llmTutor';
interface propsType {
  navigation: any;
}
interface IMessage {
  role: string;
  content: string;
}
const AskDoubt: React.FC<propsType> = props => {
  const [conversationList, setConversationList] = React.useState<any>([
    {
      role: 'system',
      content: 'You are a helpful math tutor.',
    },
    {
      role: 'assistant',
      content: 'Hello Sahibe, how can I help you about math?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const styles = getStyles();
  const {navigation} = props;
  const handleInputValue = (value: string) => {
    setInputValue(value);
  };
  const handleSend = () => {
    let newMsgArray: IMessage[] = [...conversationList];

    if (inputValue.length > 0) {
      newMsgArray.push({role: 'user', content: inputValue});
      setConversationList(newMsgArray);
    }

    setLoading(true);
    // setMsg('');
    llmApiCall(newMsgArray).then(res => {
      if (res.success) {
        if ('data' in res) {
          setLoading(false);
          setConversationList([...res.data]);
        }
      }
    });
  };
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, [conversationList]);
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
        title="Ask about [xyz subject]"
      />
      <View style={styles.wrapper}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollWrapper}>
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
