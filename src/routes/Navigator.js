import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Auth,
  Dashboard,
  Splash,
  Demo,
  PostForm,
  Profile,
} from '../screens/exports';
import EncryptedStorage from 'react-native-encrypted-storage';

const ClearButton = () => (
  <Button title="clear data" onPress={() => EncryptedStorage.clear()} />
);
const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => ClearButton(),
          headerShown: false,
        }}>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
