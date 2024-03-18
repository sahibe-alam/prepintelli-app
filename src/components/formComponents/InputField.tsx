import React from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native';
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
  onChangeText,
  value,
  label,
}) => {
  // Define styles for the component
  const styles = getStyles();
  const inputHandle = text => {
    if (onChangeText) {
      onChangeText(text);
    }
  };
  // Render the component
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
        onChangeText={inputHandle} // Call handleTextChange when text changes
        value={value} // Value of the input is controlled by the state variable text
        keyboardType={keyboardType}
      />
    </View>
  );
};

// Function to get styles for the component
const getStyles = () =>
  StyleSheet.create({
    label: {
      fontSize: fontSizes.p2,
      color: colors.black,
    },
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
