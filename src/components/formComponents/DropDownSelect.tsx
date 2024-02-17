import SelectDropdown from 'react-native-select-dropdown';
import React from 'react';
import {fontSizes, spacing} from '../../utils/commonStyle';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/commonStyle/colors';

interface PropsType {
  onSelect?: (selectedItem: any, index: number) => void;
  data?: any;
  searchPlaceHolder?: string;
  defaultButtonText?: string;
  DropDownLabel?: string;
}
const DropDownSelect: React.FC<PropsType> = ({
  DropDownLabel = 'Label',
  searchPlaceHolder = 'Search',
  defaultButtonText = 'Select an option',
}) => {
  const width = Dimensions.get('window').width;
  const [isSelected, setIsSelected] = React.useState(null);
  const countries = [
    {
      id: 1,
      name: 'India',
    },
    {
      id: 2,
      name: 'USA',
    },
    {
      id: 3,
      name: 'Canada',
    },
    {
      id: 4,
      name: 'Australia',
    },
    {
      id: 5,
      name: 'Sri Lanka',
    },
  ];

  const styles = getStyles(width);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{DropDownLabel}</Text>
      <SelectDropdown
        search={true}
        searchPlaceHolder={searchPlaceHolder}
        searchPlaceHolderColor={colors.black}
        selectedRowStyle={styles.selectedRowStyle}
        defaultButtonText={defaultButtonText}
        showsVerticalScrollIndicator={false}
        selectedRowTextStyle={{color: colors.white}}
        statusBarTranslucent={false}
        rowStyle={styles.rowStyle}
        rowTextStyle={styles.rowTextStyle}
        dropdownStyle={styles.dropdownStyle}
        buttonStyle={styles.button}
        buttonTextStyle={[
          styles.buttonTextStyle,
          {color: isSelected ? colors.black : colors.grey},
        ]}
        data={countries}
        onSelect={(selectedItem, index) => {
          setIsSelected(selectedItem);
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={selectedItem => {
          console.log(selectedItem);
          return selectedItem.name;
        }}
        renderDropdownIcon={isopen => {
          return (
            <Image
              style={[
                styles.arrow,
                {
                  transform: isopen
                    ? [{rotate: '-90deg'}, {rotateY: '180deg'}]
                    : [{rotate: '90deg'}, {rotateY: '-180deg'}],
                },
              ]}
              source={require('../../assets/img//header_back_arrow.png')}
            />
          );
        }}
        rowTextForSelection={item => {
          return item.name;
        }}
      />
    </View>
  );
};
const getStyles = (width: any) =>
  StyleSheet.create({
    label: {
      fontSize: fontSizes.p2,
      color: colors.black,
    },
    rowStyle: {
      backgroundColor: 'white',
      padding: 4,
      height: 44,
      borderBottomWidth: 1,
      borderBottomColor: colors.light_grey,
    },
    dropdownStyle: {
      width: width - 30,
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
      transform: [{rotate: '90deg'}, {rotateY: '180deg'}],
    },
    wrapper: {
      paddingHorizontal: spacing.l,
    },
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
