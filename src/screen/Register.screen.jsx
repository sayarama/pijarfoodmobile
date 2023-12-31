import React, { useState } from 'react';
import {Button, Text, TextInput, Snackbar} from 'react-native-paper';
import {Image, Pressable, ScrollView, View} from 'react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RegisterScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerif, setPasswordVerif] = useState('')
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')

    const [visible, setVisible] = React.useState(false);
    const [messageSnackbar, setMessageSnackbar] = React.useState('');
    const hideSnackbar = () => setVisible(false);

  const handleRegister = () => {
    if (password === passwordVerif) {
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Login')
        // User has not enrolled a second factor
        firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .set({
          email,
          password,
          fullname,
          phone,
          created_at: new Date().getTime(),
        })
      .then( () => {})
        
      })
      .catch(error => {
        console.log('error', error)
        const {code} = error;
        
        if (code === 'auth/multi-factor-auth-required') {
          return;
        } 
      });
    } else {
      setVisible(true);
      setMessageSnackbar('Password is not same!');
    }

  };
  return (
    <ScrollView>
      <Snackbar
        wrapperStyle={{top: 0, position: 'absolute', zIndex: 99999}}
        style={{backgroundColor: '#C12216'}}
        visible={visible}
        onDismiss={hideSnackbar}
        action={{
          label: 'X',
          onPress: () => {
            hideSnackbar();
          },
        }}>
        <Text style={{color: 'white'}}>{messageSnackbar}</Text>
      </Snackbar>
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
