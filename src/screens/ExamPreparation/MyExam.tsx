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

import React, {useState} from 'react';
import BackHeader from '../../components/BackHeader';
import {colors} from '../../utils/commonStyle/colors';
import {fontSizes, spacing} from '../../utils/commonStyle';
import AccordionItem from '../../components/AccordionItem';
import CustomModal from '../../components/commonComponents/CustomModal';
import DropDownSelect from '../../components/formComponents/DropDownSelect';
import InputField from '../../components/formComponents/InputField';
import Button from '../../components/Button';

interface PropsType {
  navigation: any;
  route: any;
}
const MyExam: React.FC<PropsType> = ({navigation}) => {
  const source = {
    html: `
    <div>
  <p style="font-size: 26px; color: black;">Study Plan for Class 10th</p>
  <p style="font-size: 18px; color: black;">Subjects:</p>
  <ul style="font-size: 14px; color: black;">
    <li>Mathematics</li>
    <li>Science</li>
    <li>English</li>
    <li>Social Studies</li>
    <li>Hindi</li>
  </ul>
  <p style="font-size: 18px; color: black;">Study Plan:</p>
  <ul style="font-size: 14px; color: black;">
    <li>Allocate specific time slots for each subject every day.</li>
    <li>Focus on understanding concepts rather than rote memorization.</li>
    <li>Take regular breaks to avoid burnout.</li>
    <li>Practice previous years' question papers for each subject.</li>
    <li>Seek help from teachers or classmates for difficult topics.</li>
    <li>Maintain a healthy balance between study, rest, and recreation.</li>
  </ul>
</div>

    `,
  };
  const styles = getStyles();
  const {width} = useWindowDimensions();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleStart = () => {
    setModalVisible(false);
    navigation.navigate(
      modalType === 'practice' ? 'Practice test' : 'Ask doubt',
    );
  };
  return (
    <>
      <SafeAreaView style={styles.conatainer}>
        <BackHeader onPress={() => navigation.goBack()} title={'My exam'} />
        <Text style={styles.title}>Prepare [xyz] exam with ai 🚀</Text>
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
            <AccordionItem title="Road map for [xyz] exam">
              <RenderHtml source={source} contentWidth={width} />
            </AccordionItem>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* MODAL FOR PRACTICE  */}
      <CustomModal isModalVisible={isModalVisible} isModalHide={toggleModal}>
        <View style={styles.modalContent}>
          <DropDownSelect DropDownLabel="Select subject" />
          {modalType === 'practice' && (
            <InputField
              label="Chapter or unit"
              placeholder="Type chapter or unit"
            />
          )}
          <Button
            onPress={handleStart}
            title={modalType === 'practice' ? 'Start' : 'Chat with ai teacher'}
          />
        </View>
      </CustomModal>
    </>
  );
};

const getStyles = () =>
  StyleSheet.create({
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
