import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Button } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export function Register(props: any ): JSX.Element {
 
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [passwordR, setPasswordR] = useState('');


const handleLogin = () => {
  // Login işlemleri burada gerçekleştirilebilir
  console.log(`Email: ${email}, Password: ${password}, PasswordR: ${passwordR}`);
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
        <Text style={styles.buttonText}>Kaydet</Text>
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

});

export default Register;


