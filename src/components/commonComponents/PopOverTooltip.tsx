import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Popover from 'react-native-popover-view';
import Images from '../../resources/Images';
import { colors } from '../../utils/commonStyle/colors';
const PopOverTooltip = ({ iconStyle, content }: any) => {
  return (
    <Popover
      from={
        <TouchableOpacity
          style={{
            width: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            overflow: 'hidden',
          }}
        >
          <Image
            style={[{ width: 18, height: 18 }, iconStyle]}
            source={Images.infoCircle}
          />
        </TouchableOpacity>
      }
    >
      <View style={{ padding: 10 }}>
        <Text style={{ color: colors.black, fontSize: 12 }}>{content}</Text>
      </View>
    </Popover>
  );
};

export default PopOverTooltip;
