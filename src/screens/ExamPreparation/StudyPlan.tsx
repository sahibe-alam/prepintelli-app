import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import BackHeader from '../../components/BackHeader';
import {colors} from '../../utils/commonStyle/colors';
import PromptInput from '../../components/examPrepComponents/PromptInput';
import {spacing} from '../../utils/commonStyle';
import ResponseCard from '../../components/commonComponents/ResponseCard';
interface propsType {
  navigation: any;
}
const StudyPlan: React.FC<propsType> = props => {
  const styles = getStyles();
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
        title="Create [xyz exam] study plan"
      />
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.responseWrapper}>
            <ResponseCard />
            <ResponseCard isLeft={false} />
            <ResponseCard />
            <ResponseCard isLeft={false} />
            <ResponseCard />
            <ResponseCard isLeft={false} />
            <ResponseCard />
            <ResponseCard isLeft={false} />
            <ResponseCard />
            <ResponseCard isLeft={false} />
          </View>
        </ScrollView>
        <View style={styles.inputWrapper}>
          <PromptInput placeholder="Ask doubt?" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
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
export default StudyPlan;
