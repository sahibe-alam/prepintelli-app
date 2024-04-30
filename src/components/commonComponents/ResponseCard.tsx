import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {colors} from '../../utils/commonStyle/colors';
import {fontSizes, spacing} from '../../utils/commonStyle';
import Typing from './Typing';

interface propsType {
  isLeft?: boolean;
  content?: string;
  forLoader?: boolean;
}
const ResponseCard: React.FC<propsType> = props => {
  const {isLeft = true, content, forLoader} = props;
  const styles = getStyles();
  const renderTextWithKeywords = (text: string) => {
    // Regular expression to match keywords wrapped in double stars
    const regex = /\*\*(.*?)\*\*/g;
    let result = [];
    let currentIndex = 0;
    let match;

    // Iterate through matches
    while ((match = regex.exec(text)) !== null) {
      // Push plain text before the match
      result.push(
        <Text key={currentIndex++}>
          {text.substring(currentIndex, match.index)}
        </Text>,
      );

      // Push matched keyword in bold
      result.push(
        <Text key={currentIndex++} style={{fontWeight: 'bold'}}>
          {match[1]}
        </Text>,
      );

      // Update current index
      currentIndex = match.index + match[0].length;
    }

    // Push remaining plain text
    result.push(<Text key={currentIndex}>{text.substring(currentIndex)}</Text>);

    return result;
  };

  return (
    <View
      style={[
        styles.container,
        {alignItems: isLeft ? 'flex-start' : 'flex-end'},
      ]}>
      <View
        style={[
          styles.wrapper,
          {alignItems: isLeft ? 'flex-start' : 'flex-end'},
        ]}>
        <View
          style={[
            styles.resHeader,
            {flexDirection: isLeft ? 'row' : 'row-reverse'},
          ]}>
          <Image
            style={styles.resDp}
            source={require('../../assets/img/prepIntelliDp.png')}
          />
          <View>
            <Text style={styles.resName}>
              {isLeft ? 'PrepIntelli: Ai teacher' : 'You'}
            </Text>
            {forLoader && <Typing />}
          </View>
        </View>
        {content && (
          <View
            style={[
              styles.resWrapper,
              {backgroundColor: isLeft ? '#efe1f5' : '#ecebed'},
            ]}>
            <Text style={styles.responseText}>
              {renderTextWithKeywords(content)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    responseText: {
      color: colors.black,
      fontSize: fontSizes.p2,
    },
    resWrapper: {
      marginTop: 4,
      width: '100%',
      padding: spacing.s,
      borderRadius: 10,
    },
    resHeader: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'center',
    },
    resName: {
      color: colors.black,
      fontWeight: '600',
      fontSize: fontSizes.p3,
    },
    resDp: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    wrapper: {
      width: '90%',
    },
    container: {
      width: '100%',
      marginBottom: spacing.l,
    },
  });
export default ResponseCard;
