import React, { useState } from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {Image, Pressable, ScrollView, View} from 'react-native';
import auth from '@react-native-firebase/auth';

function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        navigation.navigate('Home')
        // User has not enrolled a second factor
      })
      .catch(error => {
        const {code} = error;
        setMessage(code)
        // Make sure to check if multi factor authentication is required
        if (code === 'auth/multi-factor-auth-required') {
          return;
        }

        // Other error
      });
  };
  return (
    <ScrollView>
      <Text
        style={{
          color: '#EFC81A',
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Welcome
      </Text>
      <Text style={{color: '#999999', textAlign: 'center'}}>
        Login To Your Existing Acoount
      </Text>

      {/* <Text style={{
      ...(message === "" ? {
        opacity: 0,
      } : {
        opacity: 100,
        backgroundColor: '#921',
      })
    }}>{message}</Text> */}

      <View style={{padding: 25}}>
        <TextInput
          placeholder="Email"
          mode="outlined"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          left={
            <TextInput.Icon
              icon={() => (
                <Image
                  source={require('../assets/mail.png')}
                  style={{width: 20, height: 20}}
                />
              )}
              iconColor="#22C55E"
            />
          }
          style={{marginBottom: 10}}
        />

        <TextInput
          placeholder="Create New Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          mode="outlined"
          left={
            <TextInput.Icon
              icon={() => (
                <Image
                  source={require('../assets/lock.png')}
                  style={{width: 20, height: 20}}
                />
              )}
              iconColor="#22C55E"
            />
          }
          style={{marginBottom: 10}}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={{borderRadius: 5, backgroundColor: '#EFC81A', padding: 3}}>
          Login
        </Button>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 3,
            marginTop: 10,
          }}>
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#EFC81A'}}>Register Here</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

export default LoginScreen;
