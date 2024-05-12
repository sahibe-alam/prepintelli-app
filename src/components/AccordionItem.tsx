import React, { useState, ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  StyleSheet,
  Image,
} from 'react-native';
import Gradient from './Gradient';
import { fontSizes, spacing } from '../utils/commonStyle';
import { colors } from '../utils/commonStyle/colors';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

interface AccordionItemProps {
  title: string;
  children: ReactNode; // Define children as ReactNode type
  isOpen?: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
    isOpen && !expanded && isOpen();
  };

  const styles = getStyles();
  return (
    <View>
      <TouchableOpacity style={[styles.btn]} onPress={toggleAccordion}>
        <Gradient>
          <View style={styles.btnTextwrapper}>
            <Text style={styles.btnTitle}>{title}</Text>
            <Image
              style={[
                styles.arrow,
                {
                  transform: expanded
                    ? [{ rotate: '-90deg' }, { rotateY: '180deg' }]
                    : [{ rotate: '90deg' }, { rotateY: '-180deg' }],
                },
              ]}
              source={require('../assets/img/header_back_arrow.png')}
            />
          </View>
        </Gradient>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.contentWrapper}>
          <Gradient>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,

                margin: 1,
                backgroundColor: 'white',
              }}
            >
              {children}
            </View>
          </Gradient>
        </View>
      )}
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    contentWrapper: {
      overflow: 'hidden',
      borderRadius: 10,
      marginTop: 10,
    },
    btnTitle: {
      color: 'white',
      fontSize: fontSizes.p,
      flex: 1,
    },
    btnTextwrapper: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      padding: spacing.m,
    },
    btn: {
      borderRadius: 10,
      overflow: 'hidden',
    },
    arrow: {
      width: 16,
      height: 16,
      tintColor: colors.white,
      alignSelf: 'center',
      resizeMode: 'contain',
      transform: [{ rotate: '90deg' }, { rotateY: '180deg' }],
    },
  });
export default AccordionItem;
