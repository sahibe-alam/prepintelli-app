import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { colors } from '../../utils/commonStyle/colors';
import { spacing } from '../../utils/commonStyle';
import BackHeader from '../../components/BackHeader';

const HowItsWork = ({ navigation }: { navigation: any }) => {
  const styles = getStyle();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <BackHeader title="How it works" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    </View>
  );
};

const getStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
      paddingHorizontal: spacing.l,
    },
  });
export default HowItsWork;
