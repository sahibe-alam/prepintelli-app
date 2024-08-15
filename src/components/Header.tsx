import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import { colors } from '../utils/commonStyle/colors';
import { fontSizes } from '../utils/commonStyle';
import { usePrepContext } from '../contexts/GlobalState';
import { makeRequest } from '../api/apiClients';
import { useFocusEffect } from '@react-navigation/native';
import Gradient from './Gradient';
import Images from '../resources/Images';

const Header = ({ navigation }: { navigation: any }) => {
  const { user, getCredits, setGetCredits, setPlanType } = usePrepContext();
  console.log(getCredits);
  useFocusEffect(
    useCallback(() => {
      makeRequest({
        url: 'get-credits',
        method: 'POST',
        data: {
          userId: user?._id,
        },
      }).then((res: any) => {
        console.log(res?.data?.remainingCredits);
        setGetCredits && setGetCredits(res?.data?.planDetails?.dailyCredits);
        setPlanType && setPlanType(res?.data?.planDetails?.plan);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, setGetCredits])
  );
  return (
    <View style={styles.header}>
      <View style={styles.userDetails}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Profile');
            navigation.navigate('Profile');
          }}
          activeOpacity={0.7}
          style={styles.dpWrapper}
        >
          <Image
            style={styles.dp}
            source={
              user?.userDp?.url ? { uri: user?.userDp?.url } : Images.userDp
            }
          />
          <Gradient style={styles.gradientMenuIcon}>
            <Image style={styles.menuIcon} source={Images.menuIc} />
          </Gradient>
        </TouchableOpacity>
        <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
          Hi, {user?.firstname}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Credits uses');
        }}
        activeOpacity={0.7}
        style={styles.coinWrapper}
      >
        <Image
          style={styles.coinIcon}
          source={require('../assets/img/coin_ic.png')}
        />
        <Text style={styles.coinCount}>{getCredits}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  coinContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  menuIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  gradientMenuIcon: {
    position: 'absolute',
    padding: 2,
    bottom: 0,
    right: -4,
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    borderBottomWidth: 1,
    borderColor: colors.light_grey,
  },
  dpWrapper: {
    borderRadius: 50,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: colors.purple,
    position: 'relative',
  },
  dp: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    objectFit: 'cover',
  },
  userName: {
    color: colors.black,
    fontSize: fontSizes.p2,
    fontWeight: '700',
    maxWidth: 200,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  coinWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    padding: 4,
    maxWidth: 100,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 20,
  },
  coinCount: {
    color: colors.black,
    fontSize: fontSizes.p4,
    fontWeight: '700',
  },
  coinIcon: {
    maxWidth: 18,
    height: 18,
    objectFit: 'contain',
  },
});
export default Header;
