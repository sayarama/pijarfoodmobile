import React from 'react'
import {ScrollView, View, ImageBackground, Pressable, Linking} from 'react-native'
import { Button, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

function DetailRecipe({navigation, route}) {
    const [bottomLine, setBottomLine] = React.useState('Ingredients')

    const {image, title, ingredients, video} = route.params
  return (
    <ScrollView>
        {/* Header */}
        <View>
            <ImageBackground
            source={{uri: image}}
            resizeMode="cover"
            style={{
                height: 400,
                padding: 10,

            }}>
                <Pressable onPress={() => navigation.navigate("Home")}>
                    <View style={{flexDirection: 'row', alignItems:'center', gap:10}}>
                        <Icon name="angle-left" size={25} color="#fff"/>
                        <Text style={{color: '#fff', fontSize: 15}}>Kembali</Text>
                    </View>
                </Pressable>

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    padding: 20,
                    paddingBottom: 70,

                }}>
                    <Text style={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: 32,
                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowOffset: {width: -1, height: 1},
                        textShadowRadius: 10,
                    }}>
                        {title}
                    </Text>
                    <Text style={{color: '#B0B0B0'}}>
                        By Chef Ikki Akari
                    </Text>
                </View>
            </ImageBackground>
        </View>

        {/* Body */}
        <View style={{
            backgroundColor: '#fff',
            marginTop: -35,
            minHeight: 600,
            borderRadius: 25,
            padding: 15,
             paddingTop: 25,
        }}>
            <View style={{flexDirection: 'row'}}>
                <Button textColor="#666666"  onPress={() => setBottomLine('Ingredients')} labelStyle={{
                    fontSize: 18,
                    ...(bottomLine === 'Ingredients' ? {
                        color: '#181728',
                        paddingBottom: 4,
                        borderBottomColor: '#EEC302',
                        borderBottomWidth: 2,
                    } : {

                    })
                }}>
                    Ingredients
                </Button>
                <Button textColor="#666666" onPress={() => setBottomLine('Video Step')}  labelStyle={{fontSize: 18,
                fontSize: 18,
                ...(bottomLine === 'Video Step' ? {
                    color: '#181728',
                    paddingBottom: 4,
                    borderBottomColor: '#EEC302',
                    borderBottomWidth: 2,
                } : {
                    
                })
                }}>
                    Video Step
                </Button>
            </View>

            {/* Ingredients */}
            {bottomLine === "Ingredients" ? (
                <View style={{
                    backgroundColor: '#FAF7ED',
                    marginTop: 20,
                    padding: 15,
                    borderRadius: 8,
                }}>
                    <Text style={{
                        color: '#666666'
                    }}>
                        {ingredients}
                    </Text>
                </View>
            ) : null}
            {bottomLine === "Video Step" ? (
                <View style={{marginTop: 20}}>
                    <Pressable onPress={() => Linking.openURL('https://www.youtube.com/watch?v=9iaVz3xrq-s')}>
                        <View
                            style={{
                                backgroundColor: '#FAF7ED',
                                borderRadius: 10,
                                padding: 10,
                                flexDirection: 'row',
                                gap: 20,

                            }}>
                                <Icon name="play-circle" size={40} color="#EEC302"/>

                                <View>
                                    <Text style={{fontWeight: 'bold'}}>
                                        {video.title}
                                    </Text>
                                    <Text style={{
                                        color: '#B0B0B0'
                                    }}>
                                        {video.link}
                                    </Text>

                                </View>
                        </View>
                    </Pressable>
                </View>
            ) : null}
        </View>
    </ScrollView>
)
}

export default DetailRecipe