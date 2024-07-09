import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { colors } from '../../utils/commonStyle/colors';
import BackHeader from '../../components/BackHeader';
import Button from '../../components/Button';
import { fontSizes, spacing } from '../../utils/commonStyle';
import Images from '../../resources/Images';

const GetPro = ({ navigation }: { navigation: any }) => {
  const planList = [
    {
      price: '99',
      actualPrice: '₹129',
      forMonths: '1 Month',
      discount: '10',
      perDay: 'Per day',
      creditsPerDay: '50',
    },
    {
      price: '199',
      actualPrice: '399',
      forMonths: '1 Months',
      discount: '20',
      perDay: 'Per day',
      creditsPerDay: '100',
    },
    {
      price: '375',
      actualPrice: '599',
      forMonths: '1 Months',
      discount: '30',
      perDay: 'Per day',
      creditsPerDay: '150',
    },
  ];
  const styles = getStyle();
  return (
    <View style={styles.container}>
      <BackHeader
        title="Get Pro"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.screenWrapper}>
        <ScrollView style={styles.scrollWrapper}>
          <View style={styles.Titlewrapper}>
            <Text style={styles.title}>
              Unlock practice your exam with prepIntelli pro
            </Text>
          </View>
          <View style={styles.planWrapper}>
            {planList.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.planCard}
                key={index}
              >
                <View style={styles.priceWrapper}>
                  <Text style={styles.price}>₹{item?.price}</Text>
                  <Text style={styles.actualPrice}>₹{item?.actualPrice}</Text>
                  <Text style={styles.perMonth}>1 {item?.forMonths}</Text>
                  <Text style={styles.cardDiscount}>
                    {item?.discount}% discount
                  </Text>
                </View>
                <View style={styles.perDayWrapper}>
                  <Text style={styles.perDay}>{item?.perDay}</Text>
                  <View style={styles.coinWrapper}>
                    <Image style={styles.coinIc} source={Images.coinIc} />
                    <Text style={styles.coinCount}>
                      {item?.creditsPerDay} Credits
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.labelPlan}>Select PRO plan</Text>
            <View style={{ flexDirection: 'row', gap: 8, paddingTop: 2 }}>
              <Text style={styles.discount}>$₹1999</Text>
              <Text style={styles.totalPrice}>$₹999</Text>
              <Text style={styles.perMonth}>/</Text>
              <Text style={styles.perMonth}>Month</Text>
            </View>
          </View>
          <Button btnWidth={120} title="Buy Pro" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const getStyle = () => {
  return StyleSheet.create({
    priceWrapper: {
      paddingHorizontal: spacing.s,
      paddingVertical: spacing.l,
      flexDirection: 'column',
      alignContent: 'center',
      gap: 6,
    },
    coinCount: {
      color: colors.purple,
      fontSize: 10,
      fontWeight: '600',
    },
    perDayWrapper: {
      padding: spacing.l,
      paddingHorizontal: 8,
      borderTopWidth: 1,
      flexDirection: 'column',
      gap: 10,
      alignItems: 'center',
      borderColor: colors.light_grey,
    },
    coinIc: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
    },
    coinWrapper: {
      flexDirection: 'row',
      gap: 2,
      padding: 8,
      minWidth: 80,
      borderRadius: 100,
      backgroundColor: colors.light_purple,
      alignItems: 'center',
      justifyContent: 'center',
    },
    perDay: {
      color: colors.black,
      fontSize: fontSizes.p3,
      fontWeight: '600',
      textAlign: 'center',
    },
    cardDiscount: {
      color: colors.green,
      fontSize: fontSizes.p3,
      textAlign: 'center',
    },
    actualPrice: {
      color: colors.grey,
      fontSize: fontSizes.p,
      textAlign: 'center',
      textDecorationLine: 'line-through',
    },
    price: {
      fontSize: fontSizes.h5,
      color: colors.black,
      textAlign: 'center',
    },
    planCard: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 12,
      overflow: 'hidden',
      borderColor: colors.light_grey,
    },
    planWrapper: {
      paddingHorizontal: spacing.l,
      paddingVertical: spacing.xl,
      flexDirection: 'row',
      gap: 10,
    },
    Titlewrapper: {
      padding: spacing.l,
      backgroundColor: colors.light_purple,
    },
    title: {
      fontSize: fontSizes.p2,
      textAlign: 'center',
      color: colors.purple,
    },
    perMonth: {
      color: colors.grey,
      fontSize: fontSizes.p3,
      textAlign: 'center',
    },
    scrollWrapper: {
      flex: 1,
      paddingBottom: 100,
    },
    totalPrice: {
      color: colors.black,
      fontSize: fontSizes.p3,
    },
    discount: {
      color: colors.red,
      fontSize: fontSizes.p3,
      textDecorationLine: 'line-through',
    },
    labelPlan: {
      fontSize: fontSizes.p2,
      color: colors.black,
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
      padding: spacing.l,
      borderTopWidth: 1,
      width: '100%',
      borderColor: colors.light_grey,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    screenWrapper: {
      //   paddingHorizontal: spacing.l,
      flex: 1,
      position: 'relative',
    },
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
};
export default GetPro;
