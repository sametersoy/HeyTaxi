import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Button } from 'react-native';
import { addRegister } from '../Services/RegisterServis';
import { IUser } from '../Models/IUser'
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export function Register(props: any): JSX.Element {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordR, setPasswordR] = useState('');


  async function handleLogin() {
    // Login işlemleri burada gerçekleştirilebilir
    console.log(`Email: ${email}, Password: ${password}, PasswordR: ${passwordR}`);
    if (password === passwordR) {
      const user: IUser = {
        email: email,
        password: password,
        created_date: new Date(),
        created_by: 'test'
      }
      await addRegister(user).then((res) => {
        console.log("register response : " + res.token)
        if (res.token !== undefined) {
          AsyncStorage.setItem('Token', res.token);
          props.navigation.navigate("Choose");
        }
      });

    }

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
        <TextInput
          style={styles.input}
          placeholder="Şifre Tekrar"
          secureTextEntry={true}
          onChangeText={(text) => setPasswordR(text)}
          value={passwordR}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister} onPress={() => {
           props.navigation.navigate('Login', {});
      }}>
        <Text style={styles.btnRegistertext}>Giriş</Text>
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
    marginTop: height / 2.5

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

export default Register;


