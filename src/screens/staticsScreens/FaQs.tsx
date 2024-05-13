import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BackHeader from '../../components/BackHeader';
import { colors } from '../../utils/commonStyle/colors';
import AccordionItem from '../../components/AccordionItem';
import { fontSizes, spacing } from '../../utils/commonStyle';

const FaQs = ({ navigation }: AboutPrepIntelliPropsType) => {
  const accordionData = [
    {
      title: 'What is PrepIntelli?',
      content:
        ' PrepIntelli is a Ai based platform that helps you prepare for your exam. ',
    },
    {
      title: 'Who can use PrepIntelli?',
      content:
        'PrepIntelli is a Ai based platform that helps you prepare for your exam. ',
    },
    {
      title: 'How does PrepIntelli work?',
      content:
        'PrepIntelli is a Ai based platform that helps you prepare for your exam. ',
    },
  ];
  const styles = getStyle();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <BackHeader title="FAQs" onPress={() => navigation.goBack()} />
        <ScrollView style={styles.scrollWrapper}>
          {accordionData.map((item, index) => (
            <View style={styles.accordionWrapper} key={index}>
              <AccordionItem title={item?.title}>
                <Text style={styles.accordionContent}>{item?.content}</Text>
              </AccordionItem>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

type AboutPrepIntelliPropsType = {
  navigation: any;
};

const getStyle = () =>
  StyleSheet.create({
    accordionContent: {
      color: colors.black,
      fontSize: fontSizes.p2,
    },
    accordionWrapper: {
      marginBottom: spacing.l,
    },
    scrollWrapper: {
      flex: 1,
      padding: spacing.l,
    },
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
export default FaQs;
