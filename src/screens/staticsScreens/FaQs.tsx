import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import BackHeader from '../../components/BackHeader';
import { colors } from '../../utils/commonStyle/colors';
import AccordionItem from '../../components/AccordionItem';
import { fontSizes, spacing } from '../../utils/commonStyle';
import { makeRequest } from '../../api/apiClients';

const FaQs = ({ navigation }: AboutPrepIntelliPropsType) => {
  const [faq, setFaq] = useState<any>([]);

  useEffect(() => {
    makeRequest({
      method: 'GET',
      url: '/cms',
    })
      .then((res: any) => {
        setFaq(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  const styles = getStyle();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <BackHeader title="FAQs" onPress={() => navigation.goBack()} />
        <ScrollView style={styles.scrollWrapper}>
          {faq?.faqs?.reverse().map((item: any, index: number) => (
            <View style={styles.accordionWrapper} key={index}>
              <AccordionItem title={item?.title}>
                <Text style={styles.accordionContent}>{item?.desc}</Text>
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
