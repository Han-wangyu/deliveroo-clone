import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {getDishById} from "../../assets/data/restaurant";
import Colors from "../../constants/Colors";
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedImage from "react-native-reanimated/src/reanimated2/component/Image";
import {FadeIn, FadeInLeft} from "react-native-reanimated";
import AnimatedText from "react-native-reanimated/src/reanimated2/component/Text";

const Dish = () => {
    const { id } = useLocalSearchParams();
    const item = getDishById(+id!);

    const addToCart = () => {
        // TODO
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={['bottom']}>
            <View style={styles.container}>
                <AnimatedImage
                    entering={FadeIn.duration(500).delay(400) as any}
                    source ={item?.img} style={styles.image} />
                <View style={{ padding: 20 }}>
                    <AnimatedText entering={FadeInLeft.duration(400).delay(200) as any} style={styles.dishName}>
                        { item?.name }
                    </AnimatedText>
                    <AnimatedText entering={FadeInLeft.duration(400).delay(200) as any} style={styles.dishInfo}>
                        { item?.info }
                    </AnimatedText>
                </View>
                <View style={styles.footer}>
                    {/*<View style={{ flexDirection: "row", justifyContent: "center" }}>*/}
                        <TouchableOpacity style={styles.fullButton} onPress={addToCart}>
                            <Text style={styles.footerText}>
                                Add to ${item?.price}
                            </Text>
                        </TouchableOpacity>
                    {/*</View>*/}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    image: {
        width: '100%',
        height: 300,
    },
    dishName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dishInfo: {
        fontSize: 16,
        color: Colors.mediumDark
    },
    footer: {
        position: "absolute",
        backgroundColor: "#fff",
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingTop: 20,
    },
    fullButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    footerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default Dish;
