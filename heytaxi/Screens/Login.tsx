import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Button } from 'react-native';
import { GetLogin } from '../Services/LoginServis';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export function Login(props: any ): JSX.Element {
  useEffect(() => {
    async function TokenKontrol() {
      let token = await AsyncStorage.getItem('Token');
      if (token != null) {
        console.log('TokenKontrol : ' + token);
        props.navigation.navigate("Map");
      }
      else {
        console.log('TokenKontrol else : ' + token);
      }
    }
    TokenKontrol()
  }, []);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleLogin = () => {
  // Login işlemleri burada gerçekleştirilebilir
  console.log(`Email: ${email}, Password: ${password}`);

  GetLogin(email,password).then(login => {
    if (login.token !== undefined) {
      AsyncStorage.setItem('Token', login.token);
      props.navigation.navigate("Map");
    }
  })
}

  return (
    <SafeAreaView >
      <View style={styles.container}>
      <Text style={styles.title}> Giriş Yap</Text>
      <TextInput 
        style={styles.input} 
        placeholder="E-posta adresi" 
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Şifre" 
        secureTextEntry={true} 
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnRegister} onPress={() => {
           props.navigation.navigate('Register', {});
      }}>
        <Text style={styles.btnRegistertext}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: height/2.5
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30
  },
  input: {
    width: '80%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#333',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  btnRegister: {
    //backgroundColor: '#333',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnRegistertext:{
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf:'flex-start',
  }
});

export default Login;


