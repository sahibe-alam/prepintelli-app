import SelectDropdown from 'react-native-select-dropdown';
import React, { useState } from 'react';
import { fontSizes, spacing } from '../../utils/commonStyle';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../utils/commonStyle/colors';

interface PropsType {
  onSelect?: (selectedItem: any, index: number) => void;
  data?: any;
  searchPlaceHolder?: string;
  defaultButtonText?: string;
  DropDownLabel?: string;
  rowTextForSelection?: any;
  buttonTextAfterSelection?: any;
  errorMsg?: string;
  isSearch?: boolean | undefined;
}
const DropDownSelect: React.FC<PropsType> = ({
  DropDownLabel = 'Label',
  searchPlaceHolder = 'Search',
  defaultButtonText = 'Select an option',
  onSelect,
  rowTextForSelection = (item: any) => item?.label,
  buttonTextAfterSelection = (item: any) => item?.label,
  errorMsg,
  data,
  isSearch = undefined,
}) => {
  const [isSelected, setIsSelected] = React.useState(null);
  const examNames = [
    {
      label: 'option 1',
      value: 'option1',
    },
    {
      label: 'option 2',
      value: 'option2',
    },
  ];
  const [viewWidth, setViewWidth] = useState(0);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setViewWidth(width);
  };

  const styles = getStyles(viewWidth);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{DropDownLabel}</Text>
      <View onLayout={handleLayout}>
        <SelectDropdown
          search={isSearch}
          searchPlaceHolder={searchPlaceHolder}
          searchPlaceHolderColor={colors.black}
          selectedRowStyle={styles.selectedRowStyle}
          defaultButtonText={defaultButtonText}
          showsVerticalScrollIndicator={true}
          selectedRowTextStyle={{ color: colors.white }}
          statusBarTranslucent={false}
          rowStyle={styles.rowStyle}
          rowTextStyle={styles.rowTextStyle}
          dropdownStyle={styles.dropdownStyle}
          buttonStyle={styles.button}
          buttonTextStyle={[
            styles.buttonTextStyle,
            { color: isSelected ? colors.black : colors.grey },
          ]}
          data={data || examNames}
          onSelect={(selectedItem, index) => {
            setIsSelected(selectedItem);
            if (onSelect) {
              onSelect(selectedItem, index);
            }
          }}
          buttonTextAfterSelection={buttonTextAfterSelection}
          renderDropdownIcon={(isopen) => {
            return (
              <Image
                style={[
                  styles.arrow,
                  {
                    transform: isopen
                      ? [{ rotate: '-90deg' }, { rotateY: '180deg' }]
                      : [{ rotate: '90deg' }, { rotateY: '-180deg' }],
                  },
                ]}
                source={require('../../assets/img/header_back_arrow.png')}
              />
            );
          }}
          rowTextForSelection={rowTextForSelection}
        />
      </View>
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
    </View>
  );
};
const getStyles = (width: any) =>
  StyleSheet.create({
    errorMsg: {
      color: colors.red,
      fontSize: fontSizes.p3,
    },
    label: {
      fontSize: fontSizes.p2,
      color: colors.black,
    },
    rowStyle: {
      backgroundColor: 'white',
      padding: 4,
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: colors.light_grey,
    },
    dropdownStyle: {
      width: width,
      backgroundColor: 'white',
      borderRadius: 10,
      borderColor: 'black',
    },
    selectedRowStyle: {
      backgroundColor: colors.blue,
      color: colors.white,
      borderColor: colors.blue,
    },
    arrow: {
      width: 16,
      height: 16,
      tintColor: colors.grey,
      resizeMode: 'contain',
      transform: [{ rotate: '90deg' }, { rotateY: '180deg' }],
    },
    wrapper: {},
    buttonTextStyle: {
      textAlign: 'left',
      color: colors.black,
      padding: 0,
      marginHorizontal: 0,
      fontSize: fontSizes.p2,
    },
    rowTextStyle: {
      textAlign: 'left',
      color: colors.black,
      paddingHorizontal: spacing.m,
      marginHorizontal: 0,
      fontSize: fontSizes.p2,
    },
    button: {
      width: '100%',
      height: 48,
      backgroundColor: 'white',
      borderRadius: 10,
      borderColor: colors.grey,
      borderWidth: 1,
    },
  });
export default DropDownSelect;
