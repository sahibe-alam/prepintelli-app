import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { fontSizes, spacing } from '../../utils/commonStyle';
import { colors } from '../../utils/commonStyle/colors';
import Images from '../../resources/Images';
import GetImage from '../commonComponents/GetImage';
import { usePrepContext } from '../../contexts/GlobalState';

const PostWidgets = ({ onPostClick, navigation }: PostWidgetsProps) => {
  const styles = getStyle();
  const { user } = usePrepContext();
  console.log(user?.userDp);
  return (
    <View style={styles.wrapper}>
      <View style={styles.dpWrapper}>
        <Image
          style={styles.dp}
          source={
            user?.userDp?.length > 0 ? { uri: user?.userDp } : Images.userDp
          }
        />
      </View>
      <TouchableOpacity
        onPress={onPostClick}
        style={styles.textClick}
        activeOpacity={0.7}
      >
        <Text style={styles.postText}>Post your doubt or knowledge</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity activeOpacity={0.7}>
        <Image source={Images.pdfIc2} resizeMode="contain" />
      </TouchableOpacity> */}
      <GetImage
        onImagePicked={(path: string) => {
          navigation.navigate('PostScreen', { image: path });
        }}
      >
        <Image source={Images.imageIc} resizeMode="contain" />
      </GetImage>
    </View>
  );
};

type PostWidgetsProps = {
  onPostClick: () => void;
  navigation?: any;
};
const getStyle = () =>
  StyleSheet.create({
    postText: {
      color: colors.grey,
      fontSize: fontSizes.p3,
    },
    textClick: {
      flex: 1,
      paddingLeft: spacing.m,
      justifyContent: 'center',
      borderRadius: 50,
      borderColor: colors.grey,
      height: 38,
      borderWidth: 1,
    },
    dp: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    dpWrapper: {
      width: 38,
      height: 38,
      borderRadius: 100,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.blue,
    },
    wrapper: {
      gap: spacing.m,
      flexDirection: 'row',
      paddingHorizontal: spacing.l,
      paddingVertical: spacing.s,
      borderBottomWidth: 1,
      alignItems: 'center',
      borderColor: colors.light_grey,
    },
  });
export default PostWidgets;
