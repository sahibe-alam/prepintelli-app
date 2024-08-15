import { View, StyleSheet, Text, Image } from 'react-native';
import React from 'react';
import { colors } from '../utils/commonStyle/colors';
import Gradient from '../components/Gradient';
import { usePrepContext } from '../contexts/GlobalState';
import { fontSizes } from '../utils/commonStyle';
import Images from '../resources/Images';
import GetImage from './commonComponents/GetImage';

const DpWrapper = ({
  isPencil = false,
  onImgDp,
  dp,
}: {
  isPencil?: boolean;
  dp?: string;
  onImgDp?: (imagePath: string) => void;
}) => {
  const { deviceWidth } = usePrepContext();
  const { user } = usePrepContext();
  const styles = getSyle(deviceWidth || 0);
  return (
    <View style={styles.gradientWrapper}>
      <View style={styles.borderRadius}>
        <Gradient>
          <View style={styles.gradient}>
            <Text style={styles.userName}>
              {user?.firstname} {user?.lastname}
            </Text>
          </View>
        </Gradient>
      </View>
      <View style={styles.dpWrapper}>
        <Image
          source={
            dp
              ? dp
              : user?.userDp?.url
              ? { uri: user?.userDp?.url }
              : Images.userDp
          }
          style={styles.dp}
        />
        {isPencil && (
          <GetImage
            onImagePicked={(img) => {
              onImgDp && onImgDp(img);
            }}
          >
            <Image
              source={require('../assets/img/pencil_ic.png')}
              style={styles.editIcon}
            />
          </GetImage>
        )}
      </View>
    </View>
  );
};

const getSyle = (deviceWidth: number) =>
  StyleSheet.create({
    dp: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
      overflow: 'hidden',
    },
    editIcon: {
      width: 32,
      height: 32,
      position: 'absolute',
      bottom: -4,
      right: -4,
    },
    borderRadius: {
      borderRadius: deviceWidth,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
    },
    gradient: {
      aspectRatio: 1,
      width: deviceWidth * 2,
      borderRadius: 500,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    gradientWrapper: {
      width: '100%',
      position: 'relative',
      height: 130,
      marginBottom: 50,
    },
    scrollWrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    userName: {
      textAlign: 'center',
      fontSize: fontSizes.h5,
      paddingBottom: 60,
      color: colors.white,
      fontWeight: '600',
    },
    dpWrapper: {
      width: 80,
      height: 80,
      borderRadius: 50,
      position: 'absolute',
      bottom: -40,
      alignSelf: 'center',
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.blue,
    },
  });
export default DpWrapper;
