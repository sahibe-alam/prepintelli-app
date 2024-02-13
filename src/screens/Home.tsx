import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';
import {fontSizes, spacing} from '../utils/commonStyle';
import ModuleCard from '../components/ModuleCard';
import HomeSlider from '../components/HomeSlider';
interface PropsType {
  navigation?: any;
  route?: any;
}
const Home: React.FC<PropsType> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.sliderWrapper}>
          <HomeSlider />
        </View>
        <Text style={styles.modulesHeading}>Smart Study, Smart AI</Text>
        <View style={styles.moduleWrapper}>
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: fontSizes.h5,
    fontWeight: 'bold',
  },
});
export default Home;
