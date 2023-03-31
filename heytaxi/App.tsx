import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './Screens/MapScreen'


const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  
function LogoTitle() {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={{uri:('https://cdn-icons-png.flaticon.com/512/93/93634.png')}}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MapScreen}  options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
              <Button
                onPress={() => console.log('This is a button!')}
                title="Info"
                color="#00cc00"
              />
            ),
          }} />
        <Stack.Screen name="Test" component={MapScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


