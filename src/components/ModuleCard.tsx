import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {fontSizes, spacing} from '../utils/commonStyle';
import {colors} from '../utils/commonStyle/colors';
import Gradient from './Gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
interface Props {
  cardTitle?: string;
  moduleType?: string;
}
const ModuleCard: React.FC<Props> = ({cardTitle, moduleType}) => {
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity activeOpacity={0.9}>
        <Gradient>
          <View style={styles.cardThumbnail}>
            <Image
              source={
                (moduleType === 'exam' &&
                  require('../assets/img/exam_card_thumbnail.png')) ||
                (moduleType === 'lang' &&
                  require('../assets/img/lang_module_thumbnail.png'))
              }
              style={styles.thumbnail}
            />
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.moduleTitle}>{cardTitle}</Text>
            <Image
              source={require('../assets/img/right_arrow.png')}
              style={styles.arrow}
            />
          </View>
        </Gradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: spacing.s,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardThumbnail: {
    aspectRatio: 1 / 0.8,
  },
  cardWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  moduleTitle: {
    fontSize: fontSizes.p3,
    color: colors.white,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.s,
    fontWeight: 'bold',
  },
  titleWrapper: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default ModuleCard;
