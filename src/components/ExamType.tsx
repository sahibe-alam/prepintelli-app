import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Gradient from './Gradient';
import {fontSizes, spacing} from '../utils/commonStyle';
import {colors} from '../utils/commonStyle/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ExamTypeProps {
  onPress?: () => void;
  title?: string;
  type?: string;
}
const ExamType: React.FC<ExamTypeProps> = ({title, type}) => {
  const styles = getStyle();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wrapper}>
        <Gradient>
          <View style={styles.examTypeWrapper}>
            <View style={styles.itemWrapper}>
              <View style={styles.iconWrapper}>
                <Image
                  style={styles.examIc}
                  source={
                    (type === 'comptv' &&
                      require('../assets/img/competative_ic.png')) ||
                    (type === 'clg' &&
                      require('../assets/img/college_icon.png')) ||
                    (type === 'acdmc' &&
                      require('../assets/img/academics_ic.png'))
                  }
                />
              </View>
              <Text style={styles.title}>{title}</Text>
            </View>
            <Image
              style={styles.arrow}
              source={require('../assets/img/white_arrow.png')}
            />
          </View>
        </Gradient>
      </TouchableOpacity>
    </View>
  );
};

const getStyle = () =>
  StyleSheet.create({
    title: {
      fontSize: fontSizes.p,
      color: colors.white,
      paddingLeft: spacing.s,
    },
    wrapper: {
      borderRadius: 14,
      overflow: 'hidden',
    },
    arrow: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    examIc: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    iconWrapper: {
      width: 50,
      aspectRatio: 1 / 1.2,
      padding: 10,
      borderRightWidth: 1,
      borderColor: colors.light_border,
    },
    itemWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    examTypeWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: spacing.m,
    },
    container: {
      paddingHorizontal: spacing.l,
      marginBottom: spacing.l,
    },
  });
export default ExamType;
