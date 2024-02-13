import {Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';
import BackHeader from '../components/BackHeader';

interface PropsType {
  navigation: any;
  route: any;
}
const CreateLearnLang: React.FC<PropsType> = ({navigation, route}) => {
  const {title} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => navigation.goBack()} title={title} />
      <Text style={{color: colors.black}}>langiage learning </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
export default CreateLearnLang;
