import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackHeader from '../../components/BackHeader';
import {colors} from '../../utils/commonStyle/colors';
import {fontSizes, spacing} from '../../utils/commonStyle';
import AccordionItem from '../../components/AccordionItem';

interface PropsType {
  navigation: any;
  route: any;
}
const MyExam: React.FC<PropsType> = ({navigation}) => {
  const styles = getStyles();
  return (
    <SafeAreaView style={styles.conatainer}>
      <BackHeader onPress={() => navigation.goBack()} title={'My exam'} />
      <Text style={styles.title}>Prepare [xyz] exam with ai 🚀</Text>
      <View style={styles.cardsWrapper}>
        <TouchableOpacity activeOpacity={0.8} style={styles.card}>
          <Image
            style={styles.cardImg}
            source={require('../../assets/img/practice_img.png')}
          />
          <Text style={styles.cardTitle}>Practice test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Ask doubt');
          }}
          activeOpacity={0.8}
          style={styles.card}>
          <Image
            style={styles.cardImg}
            source={require('../../assets/img/ask_img.png')}
          />
          <Text style={styles.cardTitle}>Ask doubt?</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.card}>
          <Image
            style={styles.cardImg}
            source={require('../../assets/img/studyplan_img.png')}
          />
          <Text style={styles.cardTitle}>Study plan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.accordionWrapper}>
        <AccordionItem title="Road map for [xyz] exam">
          <Text style={{color: 'black'}}>Content 1</Text>
        </AccordionItem>
      </View>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    accordionWrapper: {
      paddingHorizontal: spacing.l,
      marginTop: spacing.xl,
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
