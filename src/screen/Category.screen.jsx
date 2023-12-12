import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import recipe from '../data/recipe.json'


function Category({ navigation, route }) {
    const { category } = route.params;
    return (
        <SafeAreaView>
            <ScrollView style={styles.root}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Icon name="angle-left" size={25} color="#000" />
                        <Text style={{ color: '#000', fontSize: 15 }}>Kembali</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.heading_1}>{category}</Text>
                <View style={{ paddingBottom: 25 }}>
                    {recipe
                        ?.filter(item => item.Category == category)
                        .map((item, key) => (
                            <TouchableWithoutFeedback
                                key={key}
                                onPress={() => navigation.navigate('Detail_Recipe', item)}>
                                <View style={{ flexDirection: 'row', gap: 15, marginTop: 15 }}>
                                    <Image
                                        style={{
                                            width: 60,
                                            height: 60,
                                            resizeMode: 'cover',
                                            borderRadius: 10,
                                            objectFit: 'cover',
                                        }}
                                        source={{ uri: item.image }}
                                    />

                                    <View>
                                        <View>
                                            <Text style={{ color: '#666666', fontSize: 16, fontWeight: 800 }}>
                                                {item.title}
                                            </Text>
                                            <Text style={{ color: '#B6B6B6' }}>Click for More Info</Text>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                <Image source={require('../assets/star.png')} />
                                                <Text style={{ color: '#B6B6B6' }}>4.7</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    root: {
        padding: 15,
    },
    heading_1: {
        fontSize: 25,
        fontWeight: 800,
        marginBottom: 10,
        textAlign: 'center',
        color: '#111111',
    },
});

export default Category