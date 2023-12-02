/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */



import React from 'react';
import { SafeAreaView} from 'react-native';
import { PaperProvider} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screen/Home.screen"
import DetailRecipe from './screen/DetailRecipe.screen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
      {/* <SafeAreaView> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Detail_Recipe" component={DetailRecipe} options={{headerShown: false}} />
      </Stack.Navigator>
      {/* </SafeAreaView> */}
      </PaperProvider>
    </NavigationContainer>
  );
}


export default App;
