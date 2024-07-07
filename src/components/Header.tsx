import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useCallback } from 'react';
import { colors } from '../utils/commonStyle/colors';
import { fontSizes } from '../utils/commonStyle';
import { usePrepContext } from '../contexts/GlobalState';
import { makeRequest } from '../api/apiClients';
import { useFocusEffect } from '@react-navigation/native';

const Header = () => {
  const { user, getCredits, setGetCredits } = usePrepContext();
  useFocusEffect(
    useCallback(() => {
      makeRequest({
        url: 'get-credits',
        method: 'POST',
        data: {
          userId: user?._id,
        },
      }).then((res: any) => {
        setGetCredits && setGetCredits(res?.data?.remainingCredits);
      });
    }, [user, setGetCredits])
  );
  return (
    <View style={styles.header}>
      <View style={styles.userDetails}>
        <View style={styles.dpWrapper}>
          <Image
            style={styles.dp}
            source={require('../assets/img/user_icon.png')}
          />
        </View>
        <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
          Hi, {user?.firstname}
        </Text>
      </View>
      <View style={styles.coinWrapper}>
        <Image
          style={styles.coinIcon}
          source={require('../assets/img/coin_ic.png')}
        />
        <Text style={styles.coinCount}>{getCredits}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
    gap: 5,
    padding: 4,
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
