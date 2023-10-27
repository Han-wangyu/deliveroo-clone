import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import MapView from "react-native-maps";
import Colors from "../../constants/Colors";
import {useNavigation} from "expo-router";

// process.env.EXPO_PUBLIC_GOOGLE_API_KEY

const LocationSearch = () => {
    const navigation = useNavigation();
    const [location, setLocation] = useState({
        latitude: 32.203426,
        longitude: 118.715422,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    })

    return (
        <View style={{ flex: 1 }}>
            <MapView showsUserLocation={true} style={styles.map} region={location} />

            <View style={styles.absoluteBox}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    absoluteBox: {
        position: "absolute",
        bottom: 20,
        width: "100%",
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 16,
        margin: 16,
        alignItems: "center",
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})

export default LocationSearch;
