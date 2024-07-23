import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import React from 'react';
import { colors } from '../../utils/commonStyle/colors';
import BackHeader from '../../components/BackHeader';
import { fontSizes, spacing } from '../../utils/commonStyle';
import { usePrepContext } from '../../contexts/GlobalState';
import Images from '../../resources/Images';

const CreditsUses = ({ navigation }: { navigation: any }) => {
  const { getCredits } = usePrepContext();
  const styles = getStyle();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <BackHeader
          onPress={() => {
            navigation.goBack();
          }}
          title="My Credits"
        />
        <View style={styles.coinWrapperContainer}>
          <Text style={{ color: colors.black, fontSize: fontSizes.h3 }}>
            Available credits
          </Text>
          <View style={styles.coinWrapper}>
            <Text style={{ color: colors.black, fontSize: fontSizes.h4 }}>
              {getCredits}
            </Text>
            <Image style={styles.coinIcon} source={Images.coinIc} />
          </View>
        </View>
        <Text style={styles.heading}>Credits deduction ℹ</Text>
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardText}>10 MCQ practice test 📚</Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Text style={styles.cardText}>2</Text>
              <Image style={styles.coinIconDeduction} source={Images.coinIc} />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>For each query 🤔</Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Text style={styles.cardText}>1</Text>
              <Image style={styles.coinIconDeduction} source={Images.coinIc} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyle = () => {
  return StyleSheet.create({
    heading: {
      color: colors.black,
      fontSize: fontSizes.h5,
      textAlign: 'center',
      marginVertical: spacing.m,
    },
    cardText: {
      color: colors.purple,
      fontSize: fontSizes.p2,
      textAlign: 'center',
    },
    cardWrapper: {
      flexDirection: 'row',
      gap: 12,
    },
    card: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: colors.light_purple,
      padding: 10,
      borderWidth: 1,
      flex: 1,
      gap: 10,
      borderColor: colors.grey,
      borderRadius: 6,
    },
    coinIconDeduction: {
      width: 20,
      height: 20,
      objectFit: 'contain',
      tintColor: colors.purple,
    },
    coinWrapperContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      justifyContent: 'space-between',
      paddingVertical: spacing.xxl,
    },
    coinWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      padding: 10,
      paddingHorizontal: 30,
      borderWidth: 1,
      borderColor: colors.grey,
      borderRadius: 50,
    },
    coinIcon: {
      maxWidth: 30,
      height: 30,
      objectFit: 'contain',
    },
    wrapper: {
      paddingHorizontal: spacing.l,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
  });
};
export default CreditsUses;
