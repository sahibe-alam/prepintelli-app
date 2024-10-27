import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Images from '../../resources/Images';
import { fontSizes, spacing } from '../../utils/commonStyle';
import { colors } from '../../utils/commonStyle/colors';
import InputField from '../formComponents/InputField';

const RenderExams = ({ exams, onPress, isExam }: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const styles = getStyle();

  const filteredExams = exams?.filter((item: any) =>
    item?.exam_short_name?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <InputField
          onChangeText={(value) => setSearchText(value)}
          value={searchText}
          placeholder="Search exam"
        />
      </View>

      <View style={styles.examCardWrapper}>
        {filteredExams?.length > 0 ? (
          filteredExams.map((item: any, index: number) => (
            <TouchableOpacity
              onPress={() => {
                isExam && isExam(item);
                onPress && onPress();
              }}
              activeOpacity={0.8}
              style={styles.examCard}
              key={index}
            >
              <Image
                style={styles.examIc}
                source={
                  item?.examLogo ? { uri: item?.examLogo } : Images.academicIc
                }
              />
              <Text style={styles.examText}>{item?.exam_short_name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noExamText}>No exam found</Text>
        )}
      </View>
    </View>
  );
};

type Props = {
  onPress?: () => void;
  isExam?: (item: any) => void;
  exams: any;
};

const getStyle = () => {
  return StyleSheet.create({
    searchWrapper: {
      paddingVertical: spacing.l,
    },
    examText: {
      color: colors.black,
      fontSize: fontSizes.p3,
      textTransform: 'uppercase',
      flex: 1,
    },
    examCardWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.l,
      justifyContent: 'space-between', // ensures cards are spaced well
    },
    container: {
      paddingHorizontal: spacing.l,
    },
    examIc: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    examCard: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.m,
      padding: spacing.m,
      backgroundColor: colors.white,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.grey,
      minWidth: 170,
      flex: 1,
    },
    noExamText: {
      fontSize: fontSizes.p3,
      color: colors.grey,
      padding: spacing.m,
    },
  });
};

export default RenderExams;
