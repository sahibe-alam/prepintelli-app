import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../utils/commonStyle/colors';
import BackHeader from '../../components/BackHeader';
import Button from '../../components/Button';
import { fontSizes, spacing } from '../../utils/commonStyle';
import Images from '../../resources/Images';
import { makeRequest } from '../../api/apiClients';
import RazorpayCheckout from 'react-native-razorpay';
import { usePrepContext } from '../../contexts/GlobalState';
import { RAZAPAY_API_KEY } from '@env';
import { getPro } from '../../api/adapter/getPro';
import Gradient from '../../components/Gradient';
import { useToast } from 'react-native-toast-notifications';
import { useShowMessage } from '../../utils/showMessage';
const GetPro = ({ navigation }: { navigation: any }) => {
  const { planType, user } = usePrepContext();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [isCouponGetting, setIsCouponGetting] = useState(false);
  const [coupon, setCoupon] = useState<any | null>(null);
  const [getPlan, setGetPlan] = useState<any>({});
  const styles = getStyle();
  const toast = useToast();
  const selectedPlanSelected = (index: number) => {
    setSelectedPlan(index);
    setGetPlan(plans[index]);
  };
  useEffect(() => {
    makeRequest({
      method: 'GET',
      url: '/get-plans',
    }).then((res: any) => {
      setPlans(res?.data);
      setGetPlan(res?.data[0]);
    });
  }, []);
  const handlePayment = () => {
    const options = {
      description: 'Credits towards consultation',
      image:
        'https://res.cloudinary.com/prepintelli/image/upload/v1723822975/assets/itneileo69y4ljy7tnwo.png',
      currency: 'INR',
      key: RAZAPAY_API_KEY,
      amount: getPlanPrice() * 100,
      name: 'PrepIntelli Ai - powered exam preparation app',
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: user?.email,
        contact: user?.mobile,
        name: user?.firstname + ' ' + user?.lastname,
      },
      theme: { color: colors.purple },
    };

    RazorpayCheckout.open(options)
      .then((data: any) => {
        // handle success
        // Alert.alert(`Success: ${data.razorpay_payment_id}`);
        getPro(
          user?._id,
          getPlan?.planType,
          getPlan?.forMonths,
          getPlan?.creditsPerDay,
          data.razorpay_payment_id,
          getPlanPrice()
        )
          .then(() => {
            navigation.navigate('Main');
            // Alert.alert(`Success: ${data.razorpay_payment_id}`);
            toast.show(
              `${getPlan?.planType.toUpperCase()} Upgraded Successful 🥳`,
              {
                type: 'success',
                duration: 3000,
              }
            );
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error: any) => {
        // handle failure
        toast.show('Payment Failed', {
          type: 'danger',
          duration: 3000,
        });
        // Alert.alert(`Error: ${error.code} | ${error.description}`);
        console.log(error);
      });
  };
  const showMessage = useShowMessage();
  const getCoupon = () => {
    if (couponCode !== '') {
      setIsCouponGetting(true);
      makeRequest({
        method: 'POST',
        url: '/get-coupon',
        data: {
          code: couponCode,
        },
      })
        .then((res: any) => {
          setCoupon(res?.data?.data);
          showMessage(res?.data?.msg || 'Congratulations coupon applied 🥳');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setCouponCode('');
          setIsCouponGetting(false);
        });
    } else {
      toast.show('Please enter coupon code', {
        type: 'default',
        duration: 2000,
      });
    }
  };

  const getPlanPrice = () => {
    const price = coupon
      ? getPlan?.price - (coupon?.discountValue * getPlan?.price) / 100
      : getPlan?.price;
    return price.toFixed(2);
  };

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
          <Gradient style={styles.gradient}>
            <Text style={styles.title} numberOfLines={2}>
              Supercharge Your Exam Prep {'\n'} with prepIntelli 😍
            </Text>
          </Gradient>
          <View style={styles.choosePlanWrapper}>
            <Text style={styles.choosePlanText}> Choose your plan: </Text>
          </View>
          <View style={styles.planWrapper}>
            {plans?.map((item: any, index) => (
              <View key={index} style={styles.planCardWrapper}>
                <TouchableOpacity
                  onPress={() => selectedPlanSelected(index)}
                  activeOpacity={0.5}
                  style={[
                    styles.planCard,
                    selectedPlan === index && styles.active,
                  ]}
                >
                  <View style={styles.priceWrapper}>
                    {/* Capitalize text */}
                    <Text style={styles.planTypeText}>
                      {item?.planType.toUpperCase()}
                    </Text>
                    <View style={styles.priceContent}>
                      <Text style={styles.price}>
                        {item?.price > 0 ? '₹' : ''}
                        {item?.price}
                      </Text>
                      <Text style={styles.actualPrice}>
                        ₹{item?.actualPrice}
                      </Text>
                      <Text style={styles.perMonth}>
                        {item?.forMonths} Month
                      </Text>
                      <Text style={styles.cardDiscount}>
                        {item?.discount}% discount
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.perDayWrapper,
                      selectedPlan === index && styles.active,
                    ]}
                  >
                    <Text style={styles.perDay}>{item?.perDay}</Text>
                    <View style={styles.coinWrapper}>
                      <Image style={styles.coinIc} source={Images.coinIc} />
                      <Text style={styles.coinCount}>
                        {item?.creditsPerDay} Credits
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {planType === item?.planType && (
                  <View style={styles.currentPlan}>
                    <Text style={styles.currentPlanText}>Current plan</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
          <View style={styles.couponWrapper}>
            <TextInput
              placeholderTextColor={colors.grey}
              style={styles.couponInput}
              value={couponCode}
              onChangeText={(text) => setCouponCode(text.toUpperCase().trim())}
              placeholder="Enter coupon code"
            />
            <TouchableOpacity onPress={getCoupon} style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>
                {isCouponGetting ? 'Wait...' : 'Apply'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.choosePlanWrapper}>
            <Text style={[styles.choosePlanText, { paddingBottom: 10 }]}>
              Included in All Plans:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                paddingBottom: 6,
              }}
            >
              <Text>✅</Text>
              <Text style={{ color: colors.black, fontSize: fontSizes.p2 }}>
                Personalized Study Plans
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                paddingBottom: 6,
              }}
            >
              <Text>✅</Text>
              <Text style={{ color: colors.black, fontSize: fontSizes.p2 }}>
                Specific Question Doubt Resolution
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                paddingBottom: 6,
              }}
            >
              <Text>✅</Text>
              <Text style={{ color: colors.black, fontSize: fontSizes.p2 }}>
                Test Question explanation
              </Text>
            </View>
          </View>
        </ScrollView>
        {getPlan?.price > 0 && (
          <>
            <View style={styles.bottomBar}>
              {coupon && (
                <View style={styles.couponWrapperApplied}>
                  <Text style={styles.couponApplied}>
                    Coupon Applied 🎉 :{' '}
                    <Text style={{ fontWeight: '700' }}>{coupon?.code}</Text>
                  </Text>
                  <Text style={styles.discountCoupon}>
                    {' '}
                    {coupon?.discountValue}% extra discount:{' '}
                    <Text style={{ fontWeight: '700' }}>
                      - ₹
                      {(getPlan?.price * (coupon?.discountValue / 100)).toFixed(
                        2
                      )}
                    </Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => setCoupon(null)}
                    style={styles.closeBtn}
                  >
                    <Image style={styles.closeIc} source={Images.redCloseIc} />
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.bottomBarContent}>
                <View>
                  <Text style={styles.labelPlan}>
                    Selected {getPlan?.planType} plan
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 8, paddingTop: 2 }}>
                    <Text style={styles.discount}>
                      {' '}
                      ₹{getPlan?.actualPrice}
                    </Text>
                    <Text style={styles.totalPrice}>₹{getPlanPrice()}</Text>
                    <Text style={styles.perMonth}>/</Text>
                    <Text style={styles.perMonth}>Month</Text>
                  </View>
                </View>
                <Button
                  btnWidth={120}
                  title="Buy Plan"
                  onPress={() => {
                    handlePayment();
                  }}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const getStyle = () => {
  return StyleSheet.create({
    choosePlanText: {
      color: colors.black,
      fontSize: fontSizes.h5,
      fontWeight: '600',
    },
    choosePlanWrapper: {
      paddingHorizontal: spacing.l,
      paddingTop: spacing.l,
    },
    discountCoupon: {
      color: colors.green,
      fontSize: fontSizes.p2,
    },
    couponWrapperApplied: {
      backgroundColor: colors.light_green,
      padding: 10,
      marginBottom: 10,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.green,
      position: 'relative',
      gap: 4,
    },
    closeIc: {
      width: 20,
      height: 20,
    },
    closeBtn: {
      position: 'absolute',
      right: -10,
      top: -10,
      padding: 4,
    },
    couponApplied: {
      color: colors.green,
      fontSize: fontSizes.p3,
      textTransform: 'uppercase',
    },
    gradient: {
      padding: spacing.l,
    },
    priceContent: {
      paddingVertical: 10,
      paddingHorizontal: 6,
      flexDirection: 'column',
      gap: 4,
    },
    planTypeText: {
      color: colors.blue,
      fontSize: fontSizes.p4,
      fontWeight: '600',
      textAlign: 'center',
      paddingVertical: 8,
      backgroundColor: colors.light_blue,
    },
    currentPlanText: {
      color: colors.green,
      fontSize: 10,
      textAlign: 'center',
      lineHeight: 16,
    },
    currentPlan: {
      marginVertical: 12,
      padding: 4,
      borderRadius: 40,
      backgroundColor: colors.light_green,
    },
    applyBtnText: {
      color: colors.white,
      fontSize: fontSizes.p3,
      fontWeight: '600',
    },
    applyBtn: {
      backgroundColor: colors.blue,
      height: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    couponWrapper: {
      margin: spacing.l,
      borderWidth: 1,
      borderColor: colors.blue,
      borderRadius: 8,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
    },
    couponInput: {
      fontSize: fontSizes.p2,
      flex: 1,
      color: colors.black,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    active: {
      backgroundColor: colors.light_blue,
      borderColor: colors.blue,
      // scale
      transform: [{ scale: 1.05 }],
    },
    priceWrapper: {
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
      width: 14,
      height: 14,
      marginBottom: 1,
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
      borderWidth: 1,
      borderColor: '#f3d9ff',
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
      color: colors.darkGrey,
      fontSize: fontSizes.p,
      textAlign: 'center',
      textDecorationLine: 'line-through',
    },
    price: {
      fontSize: fontSizes.h5,
      color: colors.black,
      textAlign: 'center',
    },
    planCardWrapper: {
      flex: 1,
    },
    planCard: {
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
      width: '100%',
    },
    Titlewrapper: {
      padding: spacing.l,
      backgroundColor: colors.light_blue,
    },
    title: {
      fontSize: fontSizes.p2,
      textAlign: 'center',
      color: colors.white,
      fontWeight: '500',
    },
    perMonth: {
      color: colors.darkGrey,
      fontSize: fontSizes.p3,
      textAlign: 'center',
    },
    scrollWrapper: {
      flex: 1,
    },
    totalPrice: {
      color: colors.black,
      fontSize: fontSizes.p3,
      fontWeight: '600',
    },
    discount: {
      color: colors.red,
      fontSize: fontSizes.p3,
      textDecorationLine: 'line-through',
    },
    labelPlan: {
      fontSize: fontSizes.p2,
      color: colors.black,
      textTransform: 'capitalize',
    },
    bottomBarContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bottomBar: {
      alignSelf: 'center',
      padding: spacing.l,
      borderTopWidth: 1,
      width: '100%',
      borderColor: colors.light_grey,
    },
    screenWrapper: {
      //   paddingHorizontal: spacing.l,
      flex: 1,
      position: 'relative',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
};
export default GetPro;
