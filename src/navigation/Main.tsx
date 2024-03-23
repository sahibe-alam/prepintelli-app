/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../utils/commonStyle/colors';
import Header from '../components/Header';
import MyPerformance from '../screens/MyPerformance';
import Profile from '../screens/Profile';
import MyExam from '../screens/ExamPreparation/MyExam';

const Bottom = createBottomTabNavigator();

const CustomTabBarButton = ({
  onPress,
  isFocused,
  iconName,
  labelName,
}: {
  onPress: () => void;
  isFocused: boolean;
  iconName?: string;
  labelName?: string;
}) => {
  return (
    <TouchableOpacity style={styles.customTabBarButton} onPress={onPress}>
      <View style={styles.buttonWraper}>
        <Image
          source={
            (iconName === 'home' && require('../assets/img/home_icon.png')) ||
            (iconName === 'exam' && require('../assets/img/exam_icon.png')) ||
            (iconName === 'perform' &&
              require('../assets/img/progress_ic.png')) ||
            (iconName === 'profile' && require('../assets/img/user_icon.png'))
          }
          style={[
            styles.icon,
            {
              tintColor: isFocused ? colors.purle : colors.grey,
            },
          ]}
        />
        <Text
          style={[
            styles.label,
            {
              color: isFocused ? colors.purle : colors.grey,
            },
          ]}>
          {labelName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Main = () => {
  // useEffect(() => {
  //   getJwtToken()
  //     .then(token => {
  //       const tokenPromise = token;
  //       // Now you can use tokenPromise as needed
  //       if (tokenPromise) {
  //         navigation.navigate('Login');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error occurred:', error);
  //     });
  // }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Bottom.Navigator
        screenOptions={{
          header: () => <Header />,
          tabBarStyle: {backgroundColor: colors.white},
        }}
        tabBar={props => (
          <View style={[styles.tabBar]}>
            <CustomTabBarButton
              isFocused={props.state.routes[props.state.index].name === 'Home'}
              onPress={() => props.navigation.navigate('Home')}
              iconName="home"
              labelName="Home"
            />
            <CustomTabBarButton
              isFocused={
                props.state.routes[props.state.index].name === 'My exam'
              }
              onPress={() => props.navigation.navigate('My exam')}
              iconName="exam"
              labelName="My exam"
            />
            <CustomTabBarButton
              isFocused={
                props.state.routes[props.state.index].name === 'Performance'
              }
              onPress={() => props.navigation.navigate('Performance')}
              iconName="perform"
              labelName="Performance"
            />
            <CustomTabBarButton
              isFocused={
                props.state.routes[props.state.index].name === 'Profile'
              }
              onPress={() => props.navigation.navigate('Profile')}
              iconName="profile"
              labelName="Profile"
            />
          </View>
        )}>
        <Bottom.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: () => null,
            tabBarStyle: {backgroundColor: 'red'},
          }}
        />
        <Bottom.Screen
          name="My exam"
          component={MyExam}
          options={{
            tabBarLabel: () => null,
            headerShown: false,
          }}
        />
        <Bottom.Screen
          name="Performance"
          component={MyPerformance}
          options={{tabBarLabel: () => null, headerShown: false}}
        />
        <Bottom.Screen
          name="Profile"
          component={Profile}
          options={{tabBarLabel: () => null, headerShown: false}}
        />
      </Bottom.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.light_grey,
    paddingTop: 6,
    paddingBottom: 8,
    borderRadius: 30,
  },
  customTabBarButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    objectFit: 'contain',
    tintColor: colors.grey,
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: colors.grey,
  },
  buttonWraper: {
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Main;
