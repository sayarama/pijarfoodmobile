/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, View, Image, ScrollView, ImageBackground} from 'react-native';
import {PaperProvider, Searchbar, Text} from 'react-native-paper';

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
                icons: <Image source={require('./assets/green.png')}/>,
                label: 'Soup',
              },
              {
                icons: <Image source={require('./assets/yellow.png')}/>,
                label: 'Chicken',
              },
              {
                icons: <Image source={require('./assets/black.png')}/>,
                label: 'Seafood',
              },
              {
                icons: <Image source={require('./assets/yellow.png')}/>,
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
          <ScrollView horizontal={true}>
            <View style={{flexDirection: 'row', gap: 20}}>
              {[...new Array(8)].map((item, key) => (
                <View style={{borderRadius: 10, marginTop: 15}} key={key}>
                  <ImageBackground
                  source={require('./assets/salmon.png')}
                  resizeMode='cover'
                  imageStyle={{borderRadius: 10}}
                  style={{
                    height:160,
                    width:130,
                    padding:10,
                    justifyContent:'flex-end',
                  }}>
                    <Text style={{color: '#fff', fontSize: 14, fontWeight: 500}}>
                      Banana Lemonilo
                    </Text>
                  </ImageBackground>
                </View>
              ))}
            </View>
          </ScrollView>
          {/* Popular Recipes */}
          <Text style={styles.heading_1}>Popular Recipes</Text>
          {[...new Array(10)].map((item, key) => (
            <View style={{flexDirection:'row', gap: 15, marginTop: 15}}>
              <Image source={require('./assets/yellow.png')}/>

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
