import React, {useLayoutEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "../constants/Colors";
import { restaurant } from "../assets/data/restaurant";
import {useNavigation} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

const ParallaxScrollView = require('../components/ParallaxScrollView');

const Details = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: Colors.primary,
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
                    <Ionicons name={"arrow-back"} size={24} color={Colors.primary}  />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons name={"share-outline"} size={24} color={Colors.primary}  />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons name={"search-outline"} size={24} color={Colors.primary}  />
                    </TouchableOpacity>
                </View>
            )
        })
    }, []);

    return (
        <>
            <ParallaxScrollView backgroundColor={"#fff"}
                                parallaxHeaderHeight={250}
                                stickyHeaderHeight={70}
                                style={{ flex: 1 }}
                                renderBackground={() => <Image source={restaurant.img} style={{ height: 300, width: "100%" }}/>}
                                contentBackgroundColor={Colors.lightGrey}
                                renderStickyHeader={() => (
                                    <View key={"sticky-header"} style={styles.stickySection}>
                                        <Text style={styles.stickySectionText}>
                                            { restaurant.name }
                                        </Text>
                                    </View>
                                )}
            >
                <View style={styles.detailsContainer}>
                    <Text>
                        DETAILS
                    </Text>
                </View>
            </ParallaxScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: Colors.lightGrey,
    },
    stickySection: {
        backgroundColor: "#fff",
        marginLeft: 70,
        height: 65,
        justifyContent: "flex-end",
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    bar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    stickySectionText: {
        fontSize: 20,
        margin: 10,
    },
});

export default Details;
