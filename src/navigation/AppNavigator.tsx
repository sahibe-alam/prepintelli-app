import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash';
import Main from './Main';
import TargetExam from '../screens/ExamPreparation/TargetExam';
import CreateLearnLang from '../screens/LanguageLearn/CreateLearnLang';
import SelectExam from '../screens/ExamPreparation/SelectExam';
import MyExam from '../screens/ExamPreparation/MyExam';
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Create Learn Lang"
          component={CreateLearnLang}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Create Exam"
          component={TargetExam}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Select Exam"
          component={SelectExam}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Exam Zone"
          component={MyExam}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
