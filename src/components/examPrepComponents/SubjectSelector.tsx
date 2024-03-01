import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../utils/commonStyle/colors';
import {fontSizes, spacing} from '../../utils/commonStyle';
import InputField from '../formComponents/InputField';

interface PropsType {
  label?: string;
}

const SubjectSelector: React.FC<PropsType> = ({label}) => {
  const [inputs, setInputs] = useState<{id: string; value: string}[]>([
    {id: Date.now().toString(), value: ''},
  ]);
  const styles = getStyles();

  const handleAddInput = () => {
    setInputs(prevInputs => [
      ...prevInputs,
      {id: Date.now().toString(), value: ''},
    ]);
  };

  const handleRemoveInput = (id: string) => {
    setInputs(prevInputs => prevInputs.filter(input => input.id !== id));
  };

  const handleInputChange = (text: string, id: string) => {
    const newInputs = inputs.map(input =>
      input.id === id ? {...input, value: text} : input,
    );
    setInputs(newInputs);
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.labelText}>{label}</Text>

        {inputs.map(({id, value}, index) => (
          <View style={styles.inputWrapper} key={id}>
            <View style={{flex: 1}}>
              <InputField
                placeholder={`Enter subject ${index + 1}`}
                value={value}
                onChangeText={text => handleInputChange(text, id)}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.circleBtn,
                {
                  backgroundColor:
                    index !== inputs.length - 1
                      ? colors.light_red
                      : colors.light_blue,
                },
              ]}
              onPress={() => {
                index !== inputs.length - 1
                  ? handleRemoveInput(id)
                  : handleAddInput();
              }}>
              <Text
                style={[
                  styles.circleText,
                  {
                    color:
                      index !== inputs.length - 1 ? colors.red : colors.blue,
                  },
                ]}>
                {index !== inputs.length - 1 ? '-' : '+'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* <TouchableOpacity style={styles.addButton} onPress={handleAddInput}>
          <Text style={styles.addButtonText}>Add Input</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    labelText: {
      color: colors.black,
      fontSize: fontSizes.p2,
    },
    inputWrapper: {
      flexDirection: 'row',
      gap: spacing.s,
      marginBottom: spacing.xl,
      alignItems: 'center',
    },
    circleText: {
      fontSize: fontSizes.h4,
      lineHeight: 26,
    },
    circleBtn: {
      height: 32,
      width: 32,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      paddingHorizontal: spacing.l,
    },
    addButton: {
      alignItems: 'center',
      marginTop: spacing.m,
    },
    addButtonText: {
      color: colors.blue,
      fontSize: fontSizes.p2,
    },
  });

export default SubjectSelector;
