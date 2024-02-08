/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Exam_prep from '../screens/Exam_prep';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../utils/commonStyle/colors';
import Header from '../components/Header';
import LanguageLearn from '../screens/LanguageLearn';
import Profile from '../screens/Profile';

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
            (iconName === 'lang' && require('../assets/img/lang_icon.png')) ||
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
                props.state.routes[props.state.index].name === 'Exam prep'
              }
              onPress={() => props.navigation.navigate('Exam prep')}
              iconName="exam"
              labelName="Exam prep"
            />
            <CustomTabBarButton
              isFocused={
                props.state.routes[props.state.index].name === 'Lang learn'
              }
              onPress={() => props.navigation.navigate('Lang learn')}
              iconName="lang"
              labelName="Lang learn"
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
          name="Exam prep"
          component={Exam_prep}
          options={{tabBarLabel: () => null}}
        />
        <Bottom.Screen
          name="Lang learn"
          component={LanguageLearn}
          options={{tabBarLabel: () => null}}
        />
        <Bottom.Screen
          name="Profile"
          component={Profile}
          options={{tabBarLabel: () => null}}
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
