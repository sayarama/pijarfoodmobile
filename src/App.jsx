/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


// Orange la pasta, spicy ramenyu, lobster toast

import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, View, Image, ScrollView, ImageBackground, FlatList} from 'react-native';
import {PaperProvider, Searchbar, Text} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BreadImg from './assets/bread.png'
import EggImg from './assets/egg.png'

const NewRecipe = [
  {
    id: '1',
    title: 'Banana Lemonilo',
    image: BreadImg
  },
  {
    id: '2',
    title: 'Sandwich Egg',
    image: EggImg
  },
  {
    id: '3',
    title: 'Banana Lemonilo',
    image: BreadImg
  },
  {
    id: '4',
    title: 'Sandwich Egg',
    image: EggImg
  },

];


const Item = ({item}) => (
  <View style={{borderRadius: 10, marginTop: 15}}>
                  <ImageBackground
                  source={item.image}
                  resizeMode='cover'
                  imageStyle={{borderRadius: 10}}
                  style={{
                    height:150,
                    width:130,
                    padding:20,
                    justifyContent:'flex-end',
                  }}>
                    <Text style={{color: '#fff', fontSize: 14, fontWeight: 500}}>
                      {item.title}
                    </Text>
                  </ImageBackground>
                </View>
);

function App() {
  const [keyword, setKeyword] = useState('');
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView style={styles.root}>
          <Searchbar
            label="Search Pasta, Bread, etc"
            value={keyword}
            style={styles.searchBox}
            icon={()=><Ionicons name="search" size={30}/>}
            onChangeText={text => setKeyword(text)}
          />

          <Text style={styles.heading_1}>Popular for you</Text>
          <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            {[
              {
                icons: <Image  style={{width: 80, height: 80, borderRadius: 20}} source={require('./assets/soup.png')}/>,
                label: 'Soup',
              },
              {
                icons: <Image style={{width: 80, height: 80, borderRadius: 20}} source={require('./assets/chicken.png')}/>,
                label: 'Chicken',
              },
              {
                icons: <Image style={{width: 80, height: 80, borderRadius: 20}} source={require('./assets/seafood.jpg')}/>,
                label: 'Seafood',
              },
              {
                icons: <Image style={{width: 80, height: 80, borderRadius: 20}} source={require('./assets/dessert.png')}/>,
                label: 'Dessert',
              },
            ].map((item, key) => (
              <View key={key}>
                {item.icons}
                <Text style={{textAlign: 'center'}}>{item.label}</Text>
              </View>
            ))}
          </View>
          {/* New Repices */}
          <Text style={styles.heading_1}>New Recipes</Text>
          <FlatList
            horizontal={true}
            data={NewRecipe}
            renderItem={({item}) => <Item item={item}/>}
            keyExtractor={item => item.id}
          ></FlatList>
          {/* Popular Recipes */}
          <Text style={styles.heading_1}>Popular Recipes</Text>
          {[...new Array(5)].map((item, key) => (
            <View style={{flexDirection:'row', gap: 15, marginTop: 15}} key={key}>
              <Image source={require('./assets/salmon.png')}/>

              <View>
                <Text style={{color: '#666666', fontSize: 16, fontWeight: 800}}>
                  Teriyaki Salmon
                </Text>
                <Text style={{color: '#B6B6B6'}}>spicy, salted</Text>

                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Image source={require('./assets/star.png')}/>
                  <Text style={{color: '#B6B6B6'}}>4.7</Text>
                </View>
              </View>
            </View>
          ))}
          <View style={{marginBottom: 50}}/>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
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
  },
  heading_1: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 800,
  },
});

export default App;
