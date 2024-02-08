import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';
import {fontSizes, spacing} from '../utils/commonStyle';
import ModuleCard from '../components/ModuleCard';

const Home = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.modulesHeading}>Smart Study, Smart AI</Text>
        <View style={styles.moduleWrapper}>
          <ModuleCard cardTitle="Exam preparation" moduleType="exam" />
          <ModuleCard cardTitle="Language learning" moduleType="lang" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: fontSizes.h5,
    fontWeight: 'bold',
  },
});
export default Home;
