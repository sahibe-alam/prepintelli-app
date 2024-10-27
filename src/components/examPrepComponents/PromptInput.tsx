import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { fontSizes } from '../../utils/commonStyle';
import { colors } from '../../utils/commonStyle/colors';
import Images from '../../resources/Images';

interface PropsTypes {
  placeholder: string;
  onInputChange?: (value: string) => void;
  onPress?: () => void;
}
const PromptInput: React.FC<PropsTypes> = (props) => {
  const { placeholder, onInputChange, onPress } = props;
  const [inputValue, setInputValue] = useState('');
  const styles = getStyles();

  const handleInput = (text: string) => {
    setInputValue(text);
    if (onInputChange) {
      onInputChange(text);
    }
  };

  return (
    <View style={styles.inputWrappper}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleInput}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
      />
      <TouchableOpacity
        onPress={() => {
          setInputValue('');
          onPress && onPress();
        }}
        style={[
          styles.sentBtn,
          { backgroundColor: inputValue ? colors.blue : colors.grey },
        ]}
      >
        <Image style={styles.sentIcon} source={Images.sentIcon} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    inputWrappper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    sentIcon: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      tintColor: colors.white,
    },
    sentBtn: {
      width: 36,
      height: 36,
      borderRadius: 50,
      padding: 6,
      backgroundColor: colors.grey,
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
      flex: 1,
    },
  });
export default PromptInput;
