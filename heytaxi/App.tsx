import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './Screens/MapScreen'
import Login from './Screens/Login';
import Register from './Screens/RegisterScreen'


//https://stackoverflow.com/questions/71625768/location-tracking-in-react-native-even-if-app-is-closed
//I had a similar issue where i need to contact an API after a certain time even if app is closed, So I used react-native-background-actions to fetch the API in a loop,you can do the similar
//example - https://github.com/Rapsssito/react-native-background-actions#example-code
/* const trackLocation = async () => {
  await new Promise(async () => {
    for (let i = 1; BackgroundService.isRunning(); i++) {
      try {
        // depends on which lib you are using
        await getLocation();
      } catch (error) {
        // console.log(error);
      }
      await sleep(20000);
    }
  });
}; */


const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Login" component={Login} options={{headerShadowVisible:false}} />
        <Stack.Screen name="Register" component={Register} options={{headerShadowVisible:false}} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


