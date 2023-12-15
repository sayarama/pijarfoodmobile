import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import {
  Image,
  ImageBackground,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Antdesign from 'react-native-vector-icons/AntDesign';
import MaterialCommu from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

function Profile({navigation}) {
  const [profile, setProfile] = useState();

  const handleProfile = async () => {
    try {
      const users = await firestore().collection('users').get();
      // console.log("inia adalah users =>", users.docs[0].data())
      setProfile(users.docs[0].data());
    } catch (err) {
      console.log(err);
    }
  };
  // Logout Handle
  const handleLogout = async () => {
    await AsyncStorage.removeItem('User');
    setTimeout(() => {
      navigation.navigate('Home');
    });

    // AsyncStorage.getAllKeys().then(keys => {
    //   return AsyncStorage.multiGet(keys);
    // }).then(keyValuePairs => {
    //   console.log('AsyncStorage Contents:', keyValuePairs);
    // }).catch(error => {
    //   console.error('Error retrieving AsyncStorage contents:', error);
    // });
  };

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <View style={styles.main}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <View style={styles.profileNav}>
          <Antdesign name="arrowleft" size={30} color="#000" />
          <Text
            variant="headlineMedium"
            style={{textAlign: 'center', fontWeight: 'bold'}}>
            Profile
          </Text>
        </View>
      </Pressable>

      <View style={styles.imageSection}>
        <Image
          height={80}
          width={80}
          borderRadius={100}
          source={{
            uri: 'https://cdn.openart.ai/uploads/image_jxmEf8AP_1688790954471_512.webp',
          }}
        />
        <View>
          <Text variant="headlineSmall" style={{fontWeight: 800}}>
            {profile?.fullname}
          </Text>
          <Text style={{color: '#333'}}>{profile?.email}</Text>
          <Text style={{color: '#333'}}>{profile?.phone}</Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Pressable onPress={() => navigation.navigate('Update')}>
          <View style={styles.bottomChild}>
            <MaterialCommu name="face-man-profile" size={40} />
            <Text variant="headlineSmall" style={{color: '#333'}}>
              Edit Profile
            </Text>
          </View>
        </Pressable>

        <View style={styles.bottomChild}>
          <Antdesign name="setting" size={40} />
          <Text variant="headlineSmall" style={{color: '#333'}}>
            Settings
          </Text>
        </View>

        <View style={styles.bottomChild}>
          <MaterialCommu name="bookmark-outline" size={40} />
          <Text variant="headlineSmall" style={{color: '#333'}}>
            Bookmark
          </Text>
        </View>

        <View style={styles.bottomChild}>
          <MaterialCommu name="chat-outline" size={40} />
          <Text variant="headlineSmall" style={{color: '#333'}}>
            FAQ
          </Text>
        </View>

        <View style={styles.bottomChild}>
          <Antdesign name="exclamationcircleo" size={40} />
          <Text variant="headlineSmall" style={{color: '#333'}}>
            About App
          </Text>
        </View>

        <Pressable onPress={handleLogout}>
          <View style={styles.logout}>
            <Antdesign name="logout" size={40} />
            <Text variant="headlineSmall" style={{color: '#333'}}>
              Log Out
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    padding: 20,
  },
  profileNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  imageSection: {
    marginTop: 30,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  bottomSection: {
    marginTop: 50,
    gap: 30,
  },
  bottomChild: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 30,
    borderTopColor: '#333',
    borderTopWidth: 1,
    paddingTop: 30,
  },
});

export default Profile;
