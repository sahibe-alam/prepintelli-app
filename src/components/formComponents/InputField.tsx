import React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { fontSizes } from '../../utils/commonStyle';
import { colors } from '../../utils/commonStyle/colors';
import Images from '../../resources/Images';

interface PropsType {
  placeholder?: string;
  value?: string;
  isPassword?: boolean;
  onHidePassword?: () => void;
  label?: string;
  errorMsg?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
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
  isPassword = false,
  onHidePassword = () => {},
  errorMsg,
  value,
  label,
  secureTextEntry = false,
  autoCapitalize = 'none',
}) => {
  // Define styles for the component
  const styles = getStyles();
  const inputHandle = (text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
  };
  // Render the component
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize={autoCapitalize}
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.grey}
          onChangeText={inputHandle} // Call handleTextChange when text changes
          value={value} // Value of the input is controlled by the state variable text
          keyboardType={keyboardType}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => onHidePassword()}
            style={styles.passShowHide}
            activeOpacity={0.8}
          >
            <Image
              style={styles.passShowHideIc}
              source={secureTextEntry ? Images.eyeIc : Images.eyeSlash}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
    </View>
  );
};

// Function to get styles for the component
const getStyles = () =>
  StyleSheet.create({
    passShowHideIc: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    passShowHide: {
      position: 'absolute',
      right: 20,
      top: '50%',
      transform: [{ translateY: -10 }],
      width: 24,
      height: 24,
    },
    inputContainer: {
      position: 'relative',
    },
    errorMsg: {
      color: colors.red,
      fontSize: fontSizes.p3,
    },
    container: {
      position: 'relative',
    },
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
