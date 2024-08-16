import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../utils/commonStyle/colors';
import { fontSizes } from '../utils/commonStyle';

const RadioButton = ({
  radioList = [{}, {}],
  onChecked,
  checked,
  marginBottom,
}: any) => {
  const styles = getStyle();
  const onCheckedHandle = (index: number, item: any) => {
    onChecked && onChecked(item);
  };
  return (
    <>
      {radioList.map((item: any, index: number) => {
        return (
          <TouchableOpacity
            style={[
              [
                styles.container,
                { marginBottom: index === -1 ? 0 : marginBottom || 0 },
              ],
            ]}
            key={index}
            onPress={() => onCheckedHandle(index, item)}
          >
            <View style={styles.borderCircle}>
              {checked === item?.value && <View style={styles.checkedCircle} />}
            </View>
            <View>
              <Text numberOfLines={1} style={styles.labelText}>
                {item?.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const getStyle = () =>
  StyleSheet.create({
    checkedCircle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.blue,
    },
    labelText: {
      fontSize: fontSizes.p2,
      color: colors.black,
    },
    borderCircle: {
      width: 26,
      height: 26,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.grey,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
  });
export default RadioButton;
