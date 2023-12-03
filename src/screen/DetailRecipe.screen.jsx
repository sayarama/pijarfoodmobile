import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ScrollView,
    View,
    ImageBackground,
    Pressable,
    Linking,
    Image,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function DetailRecipe({ navigation, route }) {
    const [bottomLine, setBottomLine] = useState('Ingredients');

    const { image, title, ingredients, video, slug } = route.params;

    const [commentList, setCommentList] = useState([]);

    const [comment, setComment] = useState('')

    const getComment = () => {
        firestore()
            .collection('comment')
            .where('recipeSlug', '==', slug)
            .get()
            .then(querySnapshot => {
                let tempData = [];
                querySnapshot.forEach(documentSnapshot => {
                    tempData.push(documentSnapshot);
                });
                setCommentList(tempData);
            });
    };


    const btnCommentHandler = async () => {
        const user = await AsyncStorage.getItem('User');
        const userParse = JSON.parse(user)

        if (user && userParse.fullname) {
            firestore()
                .collection('comment')
                .add({
                    message: comment,
                    name: userParse.fullname,
                    photo: 'https://i.pravatar.cc/300',
                    recipeSlug: slug,
                    created_at: new Date().getTime(),
                })
                .then(() => {
                    getComment();
                });
        } else {
            navigation.navigate('Register');
        }
    };

    useEffect(() => {
        getComment()
    }, [])
    
    return (
        <ScrollView>
            {/* Header */}
            <View>
                <ImageBackground
                    source={{ uri: image }}
                    resizeMode="cover"
                    style={{
                        height: 400,
                        padding: 10,
                    }}>
                    <Pressable onPress={() => navigation.navigate('Home')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Icon name="angle-left" size={25} color="#fff" />
                            <Text style={{ color: '#fff', fontSize: 15 }}>Kembali</Text>
                        </View>
                    </Pressable>

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            padding: 20,
                            paddingBottom: 70,
                        }}>
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 800,
                                fontSize: 32,
                                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                textShadowOffset: { width: -1, height: 1 },
                                textShadowRadius: 10,
                            }}>
                            {title}
                        </Text>
                        <Text style={{ color: '#B0B0B0' }}>By Chef Ikki Akari</Text>
                    </View>
                </ImageBackground>
            </View>

            {/* Body */}
            <View
                style={{
                    backgroundColor: '#fff',
                    marginTop: -35,
                    minHeight: 600,
                    borderRadius: 25,
                    padding: 15,
                    paddingTop: 25,
                }}>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        textColor="#666666"
                        onPress={() => setBottomLine('Ingredients')}
                        labelStyle={{
                            fontSize: 18,
                            ...(bottomLine === 'Ingredients'
                                ? {
                                    color: '#181728',
                                    paddingBottom: 4,
                                    borderBottomColor: '#EEC302',
                                    borderBottomWidth: 2,
                                }
                                : {}),
                        }}>
                        Ingredients
                    </Button>
                    <Button
                        textColor="#666666"
                        onPress={() => setBottomLine('Video Step')}
                        labelStyle={{
                            fontSize: 18,
                            fontSize: 18,
                            ...(bottomLine === 'Video Step'
                                ? {
                                    color: '#181728',
                                    paddingBottom: 4,
                                    borderBottomColor: '#EEC302',
                                    borderBottomWidth: 2,
                                }
                                : {}),
                        }}>
                        Video Step
                    </Button>
                </View>

                {/* Ingredients */}
                {bottomLine === 'Ingredients' ? (
                    <View
                        style={{
                            backgroundColor: '#FAF7ED',
                            marginTop: 20,
                            padding: 15,
                            borderRadius: 8,
                        }}>
                        <Text
                            style={{
                                color: '#666666',
                            }}>
                            {ingredients}
                        </Text>
                    </View>
                ) : null}
                {bottomLine === 'Video Step' ? (
                    <View style={{ marginTop: 20 }}>
                        <Pressable
                            onPress={() =>
                                Linking.openURL('https://www.youtube.com/watch?v=9iaVz3xrq-s')
                            }>
                            <View
                                style={{
                                    backgroundColor: '#FAF7ED',
                                    borderRadius: 10,
                                    padding: 10,
                                    flexDirection: 'row',
                                    gap: 20,
                                }}>
                                <Icon name="play-circle" size={40} color="#EEC302" />

                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>{video.title}</Text>
                                    <Text
                                        style={{
                                            color: '#B0B0B0',
                                        }}>
                                        {video.link}
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                ) : null}

                {/* Comment */}
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        mode="outlined"
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Comment :"
                        style={{ backgroundColor: '#FAF7FD' }}
                        onChangeText={setComment}
                    />

                    <Button
                        mode="contained"
                        style={{
                            borderRadius: 5,
                            backgroundColor: '#EFC81A',
                            padding: 4,
                            marginTop: 15,
                            marginBottom: 15,
                        }}
                        onPress={() => {
                            btnCommentHandler();
                        }}>
                        Post Comment
                    </Button>

                    <Text>Comment</Text>

                    {commentList.sort((newData, oldData) => oldData._data?.created_at - newData._data?.created_at).map((item, key) => (
                        <View
                        style={{ flexDirection: 'row', gap: 20, marginTop: 15 }}
                        key={key}>
                        <Image
                            source={{ uri: item?._data?.photo }}
                            height={40}
                            width={40}
                            style={{ borderRadius: 100 }}
                        />

                        <View>
                            <Text style={{ fontWeight: 'bold' }}>{item?._data?.name}</Text>
                            <Text>{item?._data?.message}</Text>
                        </View>
                    </View>
                    ))}

                        
                </View>
            </View>
        </ScrollView>
    );
}

export default DetailRecipe;
