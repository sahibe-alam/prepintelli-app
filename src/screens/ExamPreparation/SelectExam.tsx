import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import DropDownSelect from '../../components/formComponents/DropDownSelect';
import {colors} from '../../utils/commonStyle/colors';
import BackHeader from '../../components/BackHeader';
import {spacing} from '../../utils/commonStyle';
import Button from '../../components/Button';
import SubjectSelector from '../../components/examPrepComponents/SubjectSelector';
import {makeRequest} from '../../api/apiClients';
interface PropsType {
  navigation: any;
  route: any;
}
const SelectExam: React.FC<PropsType> = ({navigation, route}) => {
  const {
    title,
    type,
    actionType,
    examDetailsUrl,
    dropdownLabel,
    classAction,
    dropdownLabel2,
    inputLabel,
  } = route.params;
  const [examName, setExamName] = React.useState(null);
  const [classes, setClasses] = React.useState(null);
  const styles = getStyles();
  const getExamDetails = () => {
    makeRequest({
      method: 'POST',
      url: examDetailsUrl,
      data: {
        action: actionType,
      },
    })
      .then((response: any) => {
        setExamName(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getClasses = () => {
    makeRequest({
      method: 'POST',
      url: examDetailsUrl,
      data: {
        action: classAction,
      },
    })
      .then((response: any) => {
        setClasses(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getExamDetails();
    if (classAction === 'fetchClass') {
      getClasses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => navigation.goBack()} title={title} />
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        centerContent={true}>
        <View style={styles.inputsWrapper}>
          <View style={styles.formWrapper}>
            <DropDownSelect
              rowTextForSelection={(item: any) =>
                actionType === 'fetchBoard'
                  ? item?.boardShortName
                  : item?.exam_short_name
              }
              buttonTextAfterSelection={(selectedItem: any) =>
                actionType === 'fetchBoard'
                  ? selectedItem?.boardShortName
                  : selectedItem?.exam_short_name
              }
              data={examName}
              DropDownLabel={dropdownLabel}
            />
            {type === 'acdmc' && (
              <DropDownSelect
                rowTextForSelection={(item: any) => item.classname}
                buttonTextAfterSelection={(selectedItem: any) =>
                  selectedItem?.classname
                }
                data={classes}
                DropDownLabel={dropdownLabel2}
              />
            )}
            <SubjectSelector label={inputLabel} />
          </View>
          <View style={styles.btnWrapper}>
            <Button
              title="Get start"
              onPress={() =>
                navigation.navigate('Exam Zone', {
                  title: 'Exam prepration zone',
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    inputsWrapper: {
      flex: 1,
    },
    scrollWrapper: {
      flexGrow: 1,
    },
    btnWrapper: {
      paddingHorizontal: spacing.l,
      paddingBottom: spacing.l,
    },
    formWrapper: {
      paddingTop: spacing.l,
      paddingHorizontal: spacing.l,
      gap: spacing.l,
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    screenName: {
      color: 'black',
    },
  });
export default SelectExam;
