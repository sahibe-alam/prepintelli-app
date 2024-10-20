import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  BackHandler,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { colors } from '../utils/commonStyle/colors';
import { fontSizes, spacing } from '../utils/commonStyle';
import HomeSlider from '../components/HomeSlider';
import ExamType from '../components/ExamType';
import CustomModal from '../components/commonComponents/CustomModal';
import { makeRequest } from '../api/apiClients';
import Button from '../components/Button';
import DeviceInfo from 'react-native-device-info';
import { useFocusEffect } from '@react-navigation/native';
import { useShowMessage } from '../utils/showMessage';
import { createDoubleBackHandler } from '../utils/backButtonHandler';
import { usePrepContext } from '../contexts/GlobalState';
import MyExam from './ExamPreparation/MyExam';
import Gradient from '../components/Gradient';
import Images from '../resources/Images';
interface PropsType {
  navigation?: any;
  route?: any;
}
const Home: React.FC<PropsType> = ({ navigation }) => {
  const [isUpdateModalVisible, setUpdateModalVisible] = React.useState(false);
  const [appUpdate, setAppUpdate] = React.useState<any>();
  const appVersion = DeviceInfo.getVersion();
  const currentVersion = Number(appVersion);
  const { user } = usePrepContext();
  const typeExam = {
    title: 'Choose Exam',
    type: 'comptv',
    dropdownLabel: 'Select your target exam?*',
    inputLabel: 'Type your exam subjects*',
    examDetailsUrl: '/combinedCompetitiveExamAndInsertSubject',
    actionType: 'fetchCompetitiveExams',
  };
  const showMessage = useShowMessage();
  useFocusEffect(
    useCallback(() => {
      const { handleBackPress, cleanup } = createDoubleBackHandler(showMessage);

      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        cleanup();
      };
    }, [showMessage])
  );
  useEffect(() => {
    makeRequest({
      method: 'GET',
      url: '/app-update',
    })
      .then((res: any) => {
        if (res?.data.success) {
          const versionInNumber = Number(res?.data?.data?.appVersion);
          console.log(versionInNumber);
          setAppUpdate(res?.data?.data);
          if (currentVersion < versionInNumber) {
            setUpdateModalVisible(true);
          }
        } else {
          setUpdateModalVisible(false);
        }
      })
      .catch((err: any) => {
        console.log(err.message, 'err hai');
      });
  }, [currentVersion]);
  const requestMultipleHelper = async () => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, // required on Android 10 and below for saving files
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, // if handling images on Android 13+
    ]);

    return granted;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      setTimeout(() => {
        requestMultipleHelper();
      }, 800);
    }
  }, []);
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.sliderWrapper}>
            <HomeSlider />
          </View>
          <View style={styles.typeWrapper}>
            {user?.exams.length > 0 ? (
              <>
                <Gradient style={styles.modulesHeadingWrapper}>
                  <View style={styles.modulesHeadingContainer}>
                    <Text style={styles.targetExam}>Targeted exam: </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Select Exam', {
                          title: 'Target new exam',
                          dropdownLabel: 'Select new exam?*',
                        })
                      }
                      style={styles.selectedExam}
                    >
                      <Image style={styles.examIc} source={Images.academicIc} />
                      <Text style={styles.modulesHeading}>
                        {user?.exams[0]?.exam_short_name}
                      </Text>
                      <Image
                        style={styles.downArrow}
                        source={Images.downArrow}
                      />
                    </TouchableOpacity>
                  </View>
                </Gradient>

                <MyExam navigation={navigation} />
              </>
            ) : (
              <>
                <Text style={styles.noExamHeading}>
                  Target Competitive exam, With AI ✨
                </Text>
                <ExamType
                  onPress={() => navigation.navigate('Select Exam', typeExam)}
                  title={typeExam.title}
                  type={typeExam.type}
                />
              </>
            )}
          </View>
        </ScrollView>
      </View>
      {isUpdateModalVisible && (
        <CustomModal isForceModal={false} isModalVisible={isUpdateModalVisible}>
          <Text style={styles.app_update_heading}>{appUpdate?.heading}</Text>
          <Text style={styles.app_update_desc}>{appUpdate?.descriptions}</Text>
          <Text style={styles.whats_new}>What's New:</Text>
          {appUpdate?.appFeature.map((item: any, index: number) => {
            return (
              <View key={index}>
                <View style={styles.app_features_wrapper}>
                  <Text>✨</Text>
                  <Text style={styles.app_features}>{item}</Text>
                </View>
              </View>
            );
          })}
          <View style={styles.updateBtn}>
            <Button
              onPress={() => {
                Linking.openURL(appUpdate?.appLink).catch((err) =>
                  console.error('An error occurred', err)
                );
              }}
              title="Update Now"
            />
          </View>
        </CustomModal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  noExamHeading: {
    paddingHorizontal: spacing.l,
    color: colors.black,
    paddingBottom: spacing.m,
    marginTop: spacing.l,
    fontSize: fontSizes.p,
    fontWeight: '500',
  },
  examIc: {
    width: 30,
    height: 30,
    objectFit: 'contain',
  },
  selectedExam: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downArrow: {
    width: 20,
    height: 20,
    objectFit: 'contain',
    transform: [{ rotate: '-90deg' }],
  },
  targetExam: {
    color: colors.black,
    fontSize: fontSizes.p,
  },
  modulesHeadingContainer: {
    padding: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightBg,
    borderRadius: 9,
  },
  modulesHeadingWrapper: {
    overflow: 'hidden',
    marginHorizontal: spacing.l,
    backgroundColor: colors.light_grey,
    padding: 1,
    borderRadius: 10,
  },
  updateBtn: {
    marginTop: 20,
  },
  app_features: {
    fontSize: fontSizes.p3,
    marginBottom: 6,
    flex: 1,
    color: colors.black,
  },
  whats_new: {
    fontSize: fontSizes.p2,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  app_features_wrapper: {
    flexDirection: 'row',
    gap: 2,
    paddingHorizontal: spacing.m,
  },
  app_update_desc: {
    fontSize: fontSizes.p2,
    marginVertical: spacing.m,
    color: colors.black,
    opacity: 0.7,
  },
  app_update_heading: {
    fontSize: fontSizes.h4,
    textAlign: 'center',
    color: colors.black,
    textTransform: 'capitalize',
  },
  typeWrapper: {
    marginTop: spacing.m,
  },
  sliderWrapper: {
    marginTop: 4,
  },
  moduleWrapper: {
    paddingHorizontal: spacing.l,
    paddingTop: spacing.m,
    flexDirection: 'row',
    gap: spacing.m,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modulesHeading: {
    color: 'black',
    paddingHorizontal: spacing.l,
    fontSize: fontSizes.p,
    fontWeight: 'bold',
  },
});
export default Home;
