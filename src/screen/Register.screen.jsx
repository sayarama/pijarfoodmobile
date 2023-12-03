import React, { useState } from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {Image, Pressable, ScrollView, View} from 'react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

function RegisterScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerif, setPasswordVerif] = useState('')
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')


  const handleRegister = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 1000)
        // User has not enrolled a second factor
      })
      .catch(error => {
        console.log('failed', error);
        const {code} = error;
        // Make sure to check if multi factor authentication is required
        if (code === 'auth/multi-factor-auth-required') {
          return;
        }

        // Other error
      });

      firestore()
        .collection('users')
        .add({
          email,
          password,
          fullname,
          phone,
          created_at: new Date().getTime(),
        })

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
        Let's Get Started
      </Text>
      <Text style={{color: '#999999', textAlign: 'center'}}>
        Create new account to access all features
      </Text>

      <View style={{padding: 25}}>
        <TextInput
          placeholder="Name"
          onChangeText={setFullname}
          value={fullname}
          mode="outlined"
          left={
            <TextInput.Icon
              icon={() => (
                <Image
                  source={require('../assets/user.png')}
                  style={{width: 20, height: 20}}
                />
              )}
              iconColor="#22C55E"
            />
          }
          style={{marginBottom: 10}}
        />

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
          placeholder="Phone Number"
          mode="outlined"
          keyboardType="phone-pad"
          onChangeText={setPhone}
          value={phone}
          left={
            <TextInput.Icon
              icon={() => (
                <Image
                  source={require('../assets/phone.png')}
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

        <TextInput
          placeholder="New Password"
          secureTextEntry
          mode="outlined"
          onChangeText={setPasswordVerif}
          value={passwordVerif}
          left={
            <TextInput.Icon
              icon={() => (
                <Image
                  source={require('../assets/unlock.png')}
                  style={{width: 20, height: 20}}
                />
              )}
              iconColor="#22C55E"
            />
          }
          style={{marginBottom: 10}}
        />

        <Button
          onPress={handleRegister}
          mode="contained"
          style={{borderRadius: 5, backgroundColor: '#EFC81A', padding: 3}}>
          Create
        </Button>

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 3,
              marginTop: 10,
            }}>
            <Text>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#EFC81A'}}>Login Here</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default RegisterScreen;
