import SelectDropdown from 'react-native-select-dropdown';
import React, {useState} from 'react';
import {fontSizes, spacing} from '../../utils/commonStyle';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/commonStyle/colors';

interface PropsType {
  onSelect?: (selectedItem: any, index: number) => void;
  data?: any;
  searchPlaceHolder?: string;
  defaultButtonText?: string;
  DropDownLabel?: string;
  rowTextForSelection?: any;
  buttonTextAfterSelection?: any;
}
const DropDownSelect: React.FC<PropsType> = ({
  DropDownLabel = 'Label',
  searchPlaceHolder = 'Search',
  defaultButtonText = 'Select an option',
  rowTextForSelection = (item: any) => item?.exam_short_name,
  buttonTextAfterSelection = (item: any) => item?.exam_short_name,

  data,
}) => {
  const [isSelected, setIsSelected] = React.useState(null);
  const examNames = [
    {
      exam_short_name: 'SSC CGL',
      examName:
        'Staff Selection Commission Combined Graduate Level Examination',
      examType: 'competitive',
    },
    {
      exam_short_name: 'SSC CHSL',
      examName:
        'Staff Selection Commission Combined Higher Secondary Level Examination',
      examType: 'competitive',
    },
    {
      exam_short_name: 'SSC JE',
      examName: 'Staff Selection Commission Junior Engineer Examination',
      examType: 'competitive',
    },
    {
      exam_short_name: 'SSC MTS',
      examName: 'Staff Selection Commission Multi-Tasking Staff Examination',
      examType: 'competitive',
    },
    {
      exam_short_name: 'SSC Steno',
      examName:
        "Staff Selection Commission Stenographer Grade 'C' and 'D' Examination",
      examType: 'competitive',
    },
    {
      exam_short_name: 'SSC CPO',
      examName:
        'Staff Selection Commission Central Police Organization Examination',
      examType: 'competitive',
    },
    {
      exam_short_name: 'SSC GD Constable',
      examName: 'Staff Selection Commission Constable (GD) Examination',
      examType: 'competitive',
    },
    {
      exam_short_name: 'SSC JHT',
      examName:
        'Staff Selection Commission Junior Hindi Translator Examination',
      examType: 'competitive',
    },
    {
      exam_short_name: 'SSC Selection Post',
      examName: 'Staff Selection Commission Selection Post Examinations',
      examType: 'competitive',
    },
  ];
  const [viewWidth, setViewWidth] = useState(0);

  const handleLayout = (event: any) => {
    const {width} = event.nativeEvent.layout;
    setViewWidth(width);
  };

  const styles = getStyles(viewWidth);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{DropDownLabel}</Text>
      <View onLayout={handleLayout}>
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
          data={data || examNames}
          onSelect={(selectedItem, index) => {
            setIsSelected(selectedItem);
            console.log(index);
          }}
          buttonTextAfterSelection={buttonTextAfterSelection}
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
                source={require('../../assets/img/header_back_arrow.png')}
              />
            );
          }}
          rowTextForSelection={rowTextForSelection}
        />
      </View>
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
      transform: [{rotate: '90deg'}, {rotateY: '180deg'}],
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
