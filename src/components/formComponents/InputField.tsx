import {Text, TextInput, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {fontSizes} from '../../utils/commonStyle';
import {colors} from '../../utils/commonStyle/colors';

interface PropsType {
  placeholder?: string;
  value?: string;
  label?: string;
  onChangeText?: (text: string) => void;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
}
const InputField: React.FC<PropsType> = ({
  placeholder = 'Enter text here',
  keyboardType = 'default',
  label,
}) => {
  const [text, setText] = useState('');

  const styles = getStyles();
  return (
    <View style={styles.inpuWrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
        onChangeText={text => setText(text)}
        value={text}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    label: {
      fontSize: fontSizes.p2,
      color: colors.black,
    },
    inpuWrapper: {flex: 1},
    input: {
      height: 48,
      padding: 8,
      fontSize: fontSizes.p2,
      color: colors.black,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.grey,
    },
  });
export default InputField;
