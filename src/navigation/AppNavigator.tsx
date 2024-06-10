import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import TargetExam from '../screens/ExamPreparation/TargetExam';
import SelectExam from '../screens/ExamPreparation/SelectExam';
import MyExam from '../screens/ExamPreparation/MyExam';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUp from '../screens/Auth/SignUp';
import OtpVerification from '../screens/Auth/OtpVerification';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import AskDoubt from '../screens/ExamPreparation/AskDoubt';
import StudyPlan from '../screens/ExamPreparation/StudyPlan';
import PracticeTest from '../screens/ExamPreparation/PracticeTest';
import TestResult from '../screens/ExamPreparation/TestResult';
import AnswersSheet from '../screens/ExamPreparation/AnswersSheet';
import StartApp from '../screens/StartApp';
import Splash from '../screens/Splash';
import FaQs from '../screens/staticsScreens/FaQs';
import HowItsWork from '../screens/staticsScreens/HowItsWork';
import AboutPrepIntelli from '../screens/staticsScreens/AboutPrepIntelli';
import EditProfile from '../screens/Auth/EditProfile';
import CreateNewPassword from '../screens/Auth/CreateNewPassword';
import DownloadPDF from '../screens/DownloadPDF';
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start App"
          component={StartApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create Exam"
          component={TargetExam}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Select Exam"
          component={SelectExam}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Exam Zone"
          component={MyExam}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OtpVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgot password"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ask doubt"
          component={AskDoubt}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Study plan"
          component={StudyPlan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Practice test"
          component={PracticeTest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Test Result"
          component={TestResult}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Answers Sheet"
          component={AnswersSheet as React.ComponentType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FaQs"
          component={FaQs as React.ComponentType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="How its work"
          component={HowItsWork as React.ComponentType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About PrepIntelli"
          component={AboutPrepIntelli as React.ComponentType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Edit Profile"
          component={EditProfile as React.ComponentType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create new password"
          component={CreateNewPassword as React.ComponentType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="download"
          component={DownloadPDF as React.ComponentType}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
