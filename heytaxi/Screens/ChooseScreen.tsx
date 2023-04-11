import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Button, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import react from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export function Choose(props: any): JSX.Element {
  useEffect(() => {
    async function TokenKontrol() {
      let token = await AsyncStorage.getItem('Token');
      if (token != null) {
        console.log('TokenKontrol : ' + token);
        //props.navigation.navigate("Map");
      }
      else {
        console.log('TokenKontrol else : ' + token);
      }
    }
    TokenKontrol()
  }, []);

  //const dispatch = useDispatch()

  const shopAnim = react.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const shopAnimRotating = shopAnim.interpolate({
    inputRange: [0, 30],
    outputRange: [Math.floor(Math.random() * 50) + 15 + 'deg', '0deg'],
  });
  const stockAnim = react.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const stockAnimRotating = stockAnim.interpolate({
    inputRange: [0, 30],
    outputRange: [Math.floor(Math.random() * 50) + 15 + 'deg', '0deg'],
  });

  useEffect(() => {
    Animated.timing(shopAnim, {
      toValue: 30,
      duration: Math.floor(Math.random() * 100) + 700,
      delay: Math.floor(Math.random() * 500) + 200,
      useNativeDriver: true
    }).start();
    Animated.timing(stockAnim, {
      toValue: 30,
      duration: Math.floor(Math.random() * 100) + 700,
      delay: Math.floor(Math.random() * 500) + 200,
      useNativeDriver: true
    }).start();
  }, [shopAnim]);
  return (<SafeAreaView style={styles.container}>
    <View style={styles.container} >
      <Animated.View style={{
        width: '100%',
        height: height / 2,
        transform: [
          { rotateY: shopAnimRotating },
        ],
      }}>
        <View style={styles.content1}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Map")
              //dispatch(increment())
            }}>
            <Icon name="sports-handball" size={100} color="white" />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 28, alignSelf: 'center' }}>Yolcu</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View style={{
        width: '100%',
        height: height / 2,
        transform: [
          { rotateY: shopAnimRotating },
        ],
      }}>
        <View style={styles.content3}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Map")}>
            <Icon name="local-taxi" size={100} color="white" />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 28, alignSelf: 'center' }}>Taxi</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: height
  },
  content1: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 2,

  },
  concontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },


  content3: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height / 2
  },

})

export default Choose;


