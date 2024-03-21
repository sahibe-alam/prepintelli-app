import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';
import {fontSizes, spacing} from '../utils/commonStyle';
import HomeSlider from '../components/HomeSlider';
import ExamType from '../components/ExamType';
interface PropsType {
  navigation?: any;
  route?: any;
}
const Home: React.FC<PropsType> = ({navigation}) => {
  const typeExam = [
    {
      title: 'Competitive exam',
      type: 'comptv',
      dropdownLabel: 'Select your target exam?*',
      inputLabel: 'Type your exam subjects*',
      examDetailsUrl: '/combinedCompetitiveExamAndInsertSubject',
      actionType: 'fetchCompetitiveExams',
    },
    {
      title: 'College exam',
      type: 'clg',
      dropdownLabel: 'Select your course?*',
      inputLabel: 'Type your exam subjects*',
      examDetailsUrl: '/combinedCollegeExamAndInsertSubject',
      actionType: 'fetchCollegeExams',
    },
    {
      title: 'Academics exam',
      type: 'acdmc',
      dropdownLabel: 'Select board*',
      dropdownLabel2: 'Select class*',
      inputLabel: 'Type your exam subjects*',
      examDetailsUrl: 'combinedAcademicExamAndInsertSubject',
      actionType: 'fetchBoard',
      classAction: 'fetchClass',
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.sliderWrapper}>
          <HomeSlider />
        </View>
        <Text style={styles.modulesHeading}>Target your exam, With Ai </Text>
        {/* <View style={styles.moduleWrapper}>
          <ModuleCard
            onPress={() =>
              navigation.navigate('Create Exam', {
                itemId: 86,
                title: 'Target your exam with ai 🔥',
              })
            }
            cardTitle="Exam preparation"
            moduleType="exam"
          />
          <ModuleCard
            onPress={() =>
              navigation.navigate('Create Learn Lang', {
                itemId: 86,
                title: 'Target learning language with ai 🔥',
              })
            }
            cardTitle="Language learning"
            moduleType="lang"
          />
        </View> */}
        <View style={styles.typeWrapper}>
          {(typeExam as Array<any>).map((item, index) => (
            <ExamType
              onPress={() => navigation.navigate('Select Exam', item)}
              key={index}
              title={item.title}
              type={item.type}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  typeWrapper: {
    marginTop: spacing.m,
  },
  sliderWrapper: {
    marginTop: 4,
    marginBottom: spacing.xl,
  },
  moduleWrapper: {
    paddingHorizontal: spacing.l,
    paddingTop: spacing.m,
    flexDirection: 'row',
    gap: spacing.m,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modulesHeading: {
    color: 'black',
    paddingHorizontal: spacing.l,
    fontSize: fontSizes.p,
    fontWeight: 'bold',
  },
});
export default Home;
