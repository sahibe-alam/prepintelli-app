import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { colors } from '../../utils/commonStyle/colors';
import { fontSizes } from '../../utils/commonStyle';
interface props {
  label?: string;
  placeholder?: string;
  onDateChange?: (date: Date) => void;
  errorMsg?: string;
}
const DateSelector: React.FC<props> = ({
  label = 'Date',
  placeholder = 'Select Date',
  onDateChange,
  errorMsg,
}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [userSelectDate, setUserSelectDate] = useState('');
  const formatDate = (date: any) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const styles = getStyles();
  return (
    <>
      <View>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.datePickerWerapper}
          onPress={() => setOpen(true)}
        >
          <Text
            style={[
              styles.label,
              { color: userSelectDate ? colors.black : colors.grey },
            ]}
          >
            {userSelectDate ? userSelectDate : placeholder}
          </Text>
          <Image
            style={styles.cal_ic}
            source={require('../../assets/img/calendar_ic.png')}
          />
        </TouchableOpacity>
        {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
      </View>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(pickedDate) => {
          setOpen(false);
          setDate(pickedDate);
          setUserSelectDate(formatDate(pickedDate));
          if (onDateChange) {
            onDateChange(formatDate(pickedDate) as any);
          }
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const getStyles = () =>
  StyleSheet.create({
    label: {
      fontSize: fontSizes.p2,
      color: colors.black,
    },
    cal_ic: {
      width: 16,
      height: 16,
      tintColor: colors.grey,
      resizeMode: 'contain',
    },
    datePickerWerapper: {
      flexDirection: 'row',
      padding: 8,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.grey,
      height: 48,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    errorMsg: {
      color: colors.red,
      fontSize: fontSizes.p3,
    },
  });
export default DateSelector;
