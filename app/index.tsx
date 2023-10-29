import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from "react-native";
import Categories from "../components/categories";
import Restaurants from "../components/restaurants";
import Colors from "../constants/Colors";

const Page = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <Categories />
                <Text style={styles.header}>
                    Top picks in your neighbourhood
                </Text>
                <Restaurants />
                <Text style={styles.header}>
                    Restaurants Near you
                </Text>
                <Restaurants />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        top: 100,
        backgroundColor: Colors.lightGrey,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        paddingHorizontal: 16,
        marginTop: 16,
    },
})

export default Page;
