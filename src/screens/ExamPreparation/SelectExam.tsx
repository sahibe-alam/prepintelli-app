import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import React, { useEffect } from 'react';
import DropDownSelect from '../../components/formComponents/DropDownSelect';
import { colors } from '../../utils/commonStyle/colors';
import BackHeader from '../../components/BackHeader';
import { spacing } from '../../utils/commonStyle';
import Button from '../../components/Button';
import SubjectSelector from '../../components/examPrepComponents/SubjectSelector';
import { makeRequest } from '../../api/apiClients';
import { usePrepContext } from '../../contexts/GlobalState';
import { getUserID } from '../../utils/commonServices';
import { getUserDetails } from '../../api/adapter/getUserDetails';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface PropsType {
  navigation: any;
  route: any;
}

const initialState = {
  subjects: null,
  class: '',
  board: '',
  examName: '',
};
function reducer(state: any, action: any) {
  switch (action.type) {
    case 'subject':
      return { ...state, subjects: action.payload };
    case 'class':
      return { ...state, class: action.payload };
    case 'board':
      return { ...state, board: action.payload };
    case 'examName':
      return { ...state, examName: action.payload };
    default:
      return state;
  }
}
const SelectExam: React.FC<PropsType> = ({ navigation, route }) => {
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
  const { user, setUser } = usePrepContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [targetExam, dispatch] = React.useReducer(reducer, initialState);
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
      .catch((error) => {
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
      .catch((error) => {
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

  const insertExam = (examData: any) => {
    setIsLoading(true);
    makeRequest({
      method: 'POST',
      url: examDetailsUrl,
      data: {
        ...examData,
      },
    })
      .then((response: any) => {
        if (response.status === 200) {
          getUserID().then((id: any) => {
            getUserDetails(id).then((res: any) => {
              setIsLoading(false);
              setUser && setUser(res.data[0]);
              navigation.navigate('Exam Zone');
            });
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error, 'SelectExam.tsx');
      });
  };
  const toast = useToast();
  console.log(targetExam, 'targetExam');
  console.log(targetExam?.class?._id, 'class');
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => navigation.goBack()} title={title} />
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        centerContent={true}
      >
        <View style={styles.inputsWrapper}>
          <View style={styles.formWrapper}>
            <DropDownSelect
              isSearch={true}
              onSelect={(item: any) => {
                dispatch({ type: 'examName', payload: item });
              }}
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
                isSearch={true}
                rowTextForSelection={(item: any) => item.classname}
                buttonTextAfterSelection={(selectedItem: any) =>
                  selectedItem?.classname
                }
                data={classes}
                DropDownLabel={dropdownLabel2}
                onSelect={(item: any) => {
                  dispatch({ type: 'class', payload: item });
                }}
              />
            )}
            <SubjectSelector
              getSubjects={(targetExam) => {
                const sub = targetExam.map((subject) =>
                  subject.value ? subject.value : null
                );
                console.log(sub, 'subjects');
                dispatch({
                  type: 'subject',
                  payload: sub[0] === null ? null : sub,
                });
              }}
              label={inputLabel}
            />
          </View>
          <View style={styles.btnWrapper}>
            <View style={styles.warnWrapper}>
              <Text style={styles.warnText} numberOfLines={1}>
                Ensure correct spelling as you type the subject name ⚠️
              </Text>
            </View>
            <Button
              isLoading={isLoading}
              title="Get start"
              onPress={async () => {
                // local storage roadMap await AsyncStorage.getItem('roadMap')
                await AsyncStorage.removeItem('roadMap');
                if (type === 'clg' || type === 'comptv') {
                  if (targetExam?.subjects && targetExam?.examName?._id) {
                    insertExam({
                      action: 'insertSubject',
                      subjects: targetExam?.subjects,
                      examid: targetExam.examName?._id,
                      userid: user?._id,
                      examId: targetExam?.examName?._id,
                    });
                  } else {
                    toast.show('Please select exam and subject', {
                      type: 'default',
                      duration: 2000,
                    });
                  }
                }
                if (type === 'acdmc') {
                  if (targetExam?.subjects && targetExam?.class?._id) {
                    insertExam({
                      action: 'insertSubject',
                      academicsubjects: targetExam?.subjects,
                      boardid: targetExam.examName?._id,
                      classid: targetExam.class?._id,
                      userid: user?._id,
                      examId: targetExam?.class?._id,
                    });
                  } else {
                    toast.show('Please select exam, class and subject', {
                      type: 'default',
                      duration: 2000,
                    });
                  }
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    warnWrapper: {
      marginBottom: spacing.m,
      backgroundColor: colors.light_yellow,
      padding: 6,
      borderRadius: 5,
    },
    warnText: {
      fontSize: 11,
      textAlign: 'center',
      color: colors.yellow,
    },
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
