import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../utils/commonStyle/colors';
import { fontSizes } from '../utils/commonStyle';
import Button from './Button';

const NoCreditPopUp = () => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { fontWeight: '500' }]}>
        Daily Credit Limit Reached ☹️
      </Text>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.point}>🚫 You've used all your daily credits.</Text>
        <Text style={styles.point}>🔄 Your credits will refresh tomorrow.</Text>
      </View>
      <Text style={styles.heading}>
        🎉 Upgrade your plan: for more credits and additional features
      </Text>
      <Button title="Upgrade now" onPress={() => {}} />
    </View>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    point: {
      fontSize: fontSizes.p2,
      color: colors.black,
      marginBottom: 4,
      textAlign: 'center',
    },
    heading: {
      fontSize: fontSizes.p,
      color: colors.black,
      textAlign: 'center',
      paddingBottom: 10,
    },
    container: {},
  });
};
export default NoCreditPopUp;
