import React from 'react'
import { Text } from 'react-native-paper'
import {Image, ImageBackground, View, StyleSheet} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';


function Profile() {
  return (
    <>

    <View style={{alignItems: 'center', padding: 20}}>
      <ImageBackground
      source={{uri: 'https://as1.ftcdn.net/v2/jpg/03/38/30/80/1000_F_338308078_iiXC8b9lxpxmjGKaKu4dtXHSIVfzE8qm.jpg'}}
      resizeMode='cover'
      imageStyle={{borderRadius: 100}}
      style={{height: 200, width: 200 }}

      />


    </View>

    <View style={styles.upperName}>
      <Text>Profile Name</Text>
      <Entypo name='pencil'/>
    </View>

    <View style={styles.upperName}>
      <Text>email@gmail.com</Text>
      <Entypo name='pencil'/>
    </View>

    <View style={styles.upperName}>
      <Text>Phone Number</Text>
      <Entypo name='pencil'/>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  upperName: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    fontSize: 20,
    marginBottom: 10,
  },
});

export default Profile