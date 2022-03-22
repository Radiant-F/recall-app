import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Auth,
  Dashboard,
  Splash,
  Demo,
  PostForm,
  Profile,
  Settings,
} from '../screens/exports';

const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={Splash} name="Splash" />
        <Stack.Screen
          component={Auth}
          name="Auth"
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen component={Dashboard} name="Dashboard" />
        <Stack.Screen component={Demo} name="Demo" />
        <Stack.Screen
          component={PostForm}
          name="PostForm"
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen component={Profile} name="Profile" />
        <Stack.Screen component={Settings} name="Settings" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
