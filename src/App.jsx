/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screen/Home.screen';
import DetailRecipe from './screen/DetailRecipe.screen';
import LoginScreen from './screen/Login.screen';
import RegisterScreen from './screen/Register.screen';
import Profile from './screen/Profile.screen';
import Category from './screen/Category.screen';
import Update from './screen/Update.screen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        {/* <SafeAreaView> */}
        <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Detail_Recipe" component={DetailRecipe} options={{headerShown: false}} />
          <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
          <Stack.Screen name="Category" component={Category} options={{headerShown: false}} />
          <Stack.Screen name="Update" component={Update} options={{headerShown: false}} />
        </Stack.Navigator>
        {/* </SafeAreaView> */}
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
