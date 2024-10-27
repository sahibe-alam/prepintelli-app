import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import React, { useEffect } from 'react';
// import DropDownSelect from '../../components/formComponents/DropDownSelect';
import { colors } from '../../utils/commonStyle/colors';
import BackHeader from '../../components/BackHeader';
import { spacing } from '../../utils/commonStyle';
import Button from '../../components/Button';
import SubjectSelector from '../../components/examPrepComponents/SubjectSelector';
import { makeRequest } from '../../api/apiClients';
import { usePrepContext } from '../../contexts/GlobalState';
import { getUserID } from '../../utils/commonServices';
import { getUserDetails } from '../../api/adapter/getUserDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useShowMessage } from '../../utils/showMessage';
import RenderExams from '../../components/examPrepComponents/RenderExams';
import CustomModal from '../../components/commonComponents/CustomModal';
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
  const { title, inputLabel } = route.params;
  const [examName, setExamName] = React.useState(null);
  const { user, setUser } = usePrepContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [targetExam, dispatch] = React.useReducer(reducer, initialState);
  const [isSubjectsModal, setIsSubjectsModal] = React.useState(false);
  const styles = getStyles();
  const getExamDetails = () => {
    makeRequest({
      method: 'POST',
      url: '/combinedCompetitiveExamAndInsertSubject',
      data: {
        action: 'fetchCompetitiveExams',
      },
    })
      .then((response: any) => {
        setExamName(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getExamDetails();
  }, []);
  function removeNulls(array: any) {
    return array.filter((element: any) => element !== null);
  }
  const insertExam = (examData: any) => {
    setIsLoading(true);
    makeRequest({
      method: 'POST',
      url: '/combinedCompetitiveExamAndInsertSubject',
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
              navigation.navigate('Home');
            });
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error, 'SelectExam.tsx');
      });
  };
  const showMessage = useShowMessage();
  console.log(targetExam?.examName, 'targetExam');
  return (
    <>
      <SafeAreaView style={styles.container}>
        <BackHeader
          onPress={() => navigation.goBack()}
          title={title || 'Target Exam'}
        />
        <ScrollView
          contentContainerStyle={styles.scrollWrapper}
          centerContent={true}
        >
          <RenderExams
            exams={examName}
            isExam={(item: any) => {
              dispatch({ type: 'examName', payload: item });
            }}
            onPress={() => {
              console.log('first');
              setIsSubjectsModal(true);
            }}
          />
          <View style={styles.inputsWrapper}>
            <View style={styles.formWrapper}>
              {/* <DropDownSelect
              isSearch={true}
              onSelect={(item: any) => {
                dispatch({ type: 'examName', payload: item });
              }}
              rowTextForSelection={(item: any) => item?.exam_short_name}
              buttonTextAfterSelection={(selectedItem: any) =>
                actionType === 'fetchBoard'
                  ? selectedItem?.boardShortName
                  : selectedItem?.exam_short_name
              }
              data={examName}
              DropDownLabel={dropdownLabel}
            /> */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <CustomModal
        isFullHeight={true}
        isModalVisible={isSubjectsModal}
        isModalHide={() => setIsSubjectsModal(false)}
      >
        <View style={styles.modalWrapper}>
          <ScrollView>
            <SubjectSelector
              getSubjects={(targetExam) => {
                const sub = targetExam.map((subject) =>
                  subject.value ? subject.value : null
                );
                dispatch({
                  type: 'subject',
                  payload: sub[0] === null ? null : sub,
                });
              }}
              label={inputLabel}
            />
          </ScrollView>
          <View>
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
                if (targetExam?.subjects && targetExam?.examName?._id) {
                  insertExam({
                    action: 'insertSubject',
                    subjects: removeNulls(targetExam?.subjects),
                    examid: targetExam.examName?._id,
                    userid: user?._id,
                    examId: targetExam?.examName?._id,
                  });
                } else {
                  showMessage('Please select exam and subject');
                }
              }}
            />
          </View>
        </View>
      </CustomModal>
    </>
  );
};

const getStyles = () =>
  StyleSheet.create({
    modalWrapper: {
      flex: 1,
      justifyContent: 'space-between',
    },
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
