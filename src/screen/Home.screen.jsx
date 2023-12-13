import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  Pressable,
} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BreadImg from '../assets/bread.png';
import EggImg from '../assets/egg.png';
import firestore from '@react-native-firebase/firestore';

import RecipeList from '../data/recipe.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommu from 'react-native-vector-icons/MaterialCommunityIcons'

const NewRecipe = [
  {
    id: '1',
    title: 'Banana Lemonilo',
    image: BreadImg,
  },
  {
    id: '2',
    title: 'Sandwich Egg',
    image: EggImg,
  },
  {
    id: '3',
    title: 'Banana Lemonilo',
    image: BreadImg,
  },
  {
    id: '4',
    title: 'Sandwich Egg',
    image: EggImg,
  },
];

const Item = ({item}) => (
  <View style={{borderRadius: 10, marginTop: 15}}>
    <ImageBackground
      source={item.image}
      resizeMode="cover"
      imageStyle={{borderRadius: 10}}
      style={{
        height: 200,
        width: 150,
        justifyContent: 'flex-end',
        padding: 30,
      }}>
      <Text style={{color: '#fff', fontSize: 14, fontWeight: 500}}>
        {item.title}
      </Text>
    </ImageBackground>
  </View>
);

function HomeScreen({navigation}) {
  const [search, setSearch] = React.useState(null);

  function onResult(QuerySnapshot) {
    QuerySnapshot.forEach(async documentSnapshot => {
      try {
        await AsyncStorage.setItem(
          'User',
          JSON.stringify(documentSnapshot.data()),
        );
      } catch (error) {}
    });
  }

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    firestore().collection('users').onSnapshot(onResult, onError);
  }, []);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.navbar}>
        <Searchbar
          placeholder="Search Food Recipe"
          value={search}
          style={styles.searchBox}
          outlineStyle={{
            borderRadius: 15,
          }}
          onChangeText={search => setSearch(search)}
        />

        <Pressable onPress={() => navigation.navigate('Profile')}>
          <MaterialCommu name="account-circle-outline" size={50}/>
        </Pressable>
      </View>

      {search ? (
          <View>
            {RecipeList.filter(item =>
              item.title.toLowerCase().includes(search),
            ).map((item, key) => (
              <View key={key} style={styles.searchResult}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'cover',
                    borderRadius: 10,
                    objectFit: 'cover',
                  }}
                  source={{uri: item.image}}
                />
                <View>
                  <Text
                    style={{color: '#666666', fontSize: 16, fontWeight: 800}}>
                    {item.title}
                  </Text>

                  <View>
                    <View>
                      <Text style={{color: '#B6B6B6'}}>
                        Click for More Info
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <Image source={require('../assets/star.png')} />
                        <Text style={{color: '#B6B6B6'}}>4.7</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : null}

      <Text style={styles.heading_1}>Popular for you</Text>
      <View
        style={{
          marginTop: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {[
          {
            icons: (
              <Image
                style={{width: 80, height: 80, borderRadius: 20}}
                source={require('../assets/soup.png')}
              />
            ),
            label: 'Soup',
            category: 'soup',
          },
          {
            icons: (
              <Image
                style={{width: 80, height: 80, borderRadius: 20}}
                source={require('../assets/chicken.png')}
              />
            ),
            label: 'Chicken',
            category: 'chicken',
          },
          {
            icons: (
              <Image
                style={{width: 80, height: 80, borderRadius: 20}}
                source={require('../assets/seafood.jpg')}
              />
            ),
            label: 'Seafood',
            category: 'seafood',
          },
          {
            icons: (
              <Image
                style={{width: 80, height: 80, borderRadius: 20}}
                source={require('../assets/dessert.png')}
              />
            ),
            label: 'Dessert',
            category: 'dessert',
          },
        ].map((item, key) => (
          <Pressable
            onPress={() => navigation.navigate('Category', item)}
            key={key}>
            {item.icons}
            <Text style={{textAlign: 'center'}}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
      {/* New Repices */}
      <Text style={styles.heading_1}>New Recipes</Text>
      <ScrollView>
        <View style={{flexDirection: 'row', gap: 20}}>
          {RecipeList.filter(item => item.isNew).map((item, key) => (
            <Pressable
              key={key}
              onPress={() => navigation.navigate('Detail_Recipe', item)}>
              <View style={{borderRadius: 10, marginTop: 15}}>
                <ImageBackground
                  source={{uri: item.image}}
                  resizeMode="cover"
                  imageStyle={{borderRadius: 10}}
                  style={{
                    height: 160,
                    width: 130,
                    padding: 10,
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: '#fff', fontSize: 14, fontWeight: 500}}>
                    {item.title}
                  </Text>
                </ImageBackground>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      {/* Popular Recipes */}
      <Text style={styles.heading_1}>Popular Recipes</Text>
      {RecipeList.filter(item => item.isPopular).map((item, key) => (
        <Pressable
          key={key}
          onPress={() => navigation.navigate('Detail_Recipe', item)}>
          <View style={{flexDirection: 'row', gap: 15, marginTop: 15}}>
            <Image
              style={{width: 50, height: 50, borderRadius: 10}}
              source={{uri: item.image}}
            />

            <View>
              <Text style={{color: '#666666', fontSize: 16, fontWeight: 800}}>
                {item.title}
              </Text>
              <Text style={{color: '#B6B6B6'}}>Click for More Info</Text>

              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Image source={require('../assets/star.png')} />
                <Text style={{color: '#B6B6B6'}}>4.7</Text>
              </View>
            </View>
          </View>
        </Pressable>
      ))}
      <View style={{marginBottom: 50}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    height: 800,
    padding: 20,
  },
  searchBox: {
    backgroundColor: '#EFEFEF',
    flex: 1,
  },
  heading_1: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 800,
  },
  navbar: {
    flexDirection: 'row',
    flex: 1,
    gap: 5,
    alignItems: 'center',
  },
  searchResult: {
    padding: 10,
    flexDirection: 'row',
    gap: 15,
  },
});

export default HomeScreen;
