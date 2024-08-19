import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  BackHandler,
  Platform,
  PermissionsAndroid,
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
interface PropsType {
  navigation?: any;
  route?: any;
}
const Home: React.FC<PropsType> = ({ navigation }) => {
  const [isUpdateModalVisible, setUpdateModalVisible] = React.useState(false);
  const [appUpdate, setAppUpdate] = React.useState<any>();
  const appVersion = DeviceInfo.getVersion();
  const currentVersion = Number(appVersion).toFixed(1);
  const typeExam = [
    {
      title: 'Competitive Exam',
      type: 'comptv',
      dropdownLabel: 'Select your target exam?*',
      inputLabel: 'Type your exam subjects*',
      examDetailsUrl: '/combinedCompetitiveExamAndInsertSubject',
      actionType: 'fetchCompetitiveExams',
    },
    {
      title: 'College Exam',
      type: 'clg',
      dropdownLabel: 'Select your course?*',
      inputLabel: 'Type your exam subjects*',
      examDetailsUrl: '/combinedCollegeExamAndInsertSubject',
      actionType: 'fetchCollegeExams',
    },
    {
      title: 'Academics Exam',
      type: 'acdmc',
      dropdownLabel: 'Select board*',
      dropdownLabel2: 'Select class*',
      inputLabel: 'Type your exam subjects*',
      examDetailsUrl: 'combinedAcademicExamAndInsertSubject',
      actionType: 'fetchBoard',
      classAction: 'fetchClass',
    },
  ];
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
    }).then((res: any) => {
      if (res.data.length > 0) {
        // get last object off array
        setAppUpdate(res.data[res.data.length - 1]);
        const newVersion = Number(
          res.data[res?.data?.length - 1]?.appVersion
        ).toFixed(1);
        if (newVersion > currentVersion) {
          setUpdateModalVisible(true);
        }
      }
    });
  }, [currentVersion]);

  const requestMultipleHelper = async () => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      // ask mic permission
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
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

          <Text style={styles.modulesHeading}>Target your exam, With AI </Text>
          {/* <View style={styles.moduleWrapper}>
          <ModuleCard
            onPress={() =>
              navigation.navigate('Create Exam', {
                itemId: 86,
                title: 'Target your exam with ai 🔥',
              })
            }
            cardTitle="Exam preparation"
            moduleType="exam"
          />
          <ModuleCard
            onPress={() =>
              navigation.navigate('Create Learn Lang', {
                itemId: 86,
                title: 'Target learning language with ai 🔥',
              })
            }
            cardTitle="Language learning"
            moduleType="lang"
          />
        </View> */}
          <View style={styles.typeWrapper}>
            {(typeExam as Array<any>).map((item, index) => (
              <ExamType
                onPress={() => navigation.navigate('Select Exam', item)}
                key={index}
                title={item.title}
                type={item.type}
              />
            ))}
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
                  console.error("Couldn't load page", err)
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
  },
  typeWrapper: {
    marginTop: spacing.m,
  },
  sliderWrapper: {
    marginTop: 4,
    marginBottom: spacing.xl,
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
