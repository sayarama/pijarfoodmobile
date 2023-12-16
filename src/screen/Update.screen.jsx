import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {StyleSheet, View, Pressable} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

function Update({navigation}) {
  const [fullname, setFullname] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const [userAdd, setUserAdd] = useState()

  const handleUpdate = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({
        fullname: fullname,
        phone: phoneNumber,
      })
      .then(() => {
        setUserAdd("Update Success")
      });
  };

  return (
    <>
      <View style={style.container}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <View style={style.profileNav}>
            <Antdesign name="arrowleft" size={30} color="#000" />
            <Text
              variant="headlineMedium"
              style={{textAlign: 'center', fontWeight: 'bold'}}>
              Home
            </Text>
          </View>
        </Pressable>
        {/* Input */}
        <TextInput
          style={style.inputBar}
          label="Name"
          placeholder="Your Name Here"
          mode="outlined"
          onChangeText={setFullname}
          value={fullname}
        />

        <TextInput
          style={style.inputBar}
          label="Phone Number"
          placeholder="Phone Number"
          mode="outlined"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />

        {/* Button */}
        <Button mode="elevated" onPress={handleUpdate}>Update Profile</Button>

        <Text variant='headlineSmall' style={{textAlign: 'center', marginTop: 15}}>{userAdd}</Text>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  profileNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginBottom: 30,
  },
  inputBar: {
    marginBottom: 20,
  },
});

export default Update;
