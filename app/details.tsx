import React from 'react';
import {Text, View} from "react-native";

const ParallaxScrollView = require('../components/ParallaxScrollView');

const Details = () => {
    return (
        <>
            <ParallaxScrollView backgroundColor={'red'} parallaxHeaderHeight={300} style={{ flex: 1 }}>
                <View style={{ height: 500 }}>
                    <Text>
                        DETAILS
                    </Text>
                </View>
            </ParallaxScrollView>
        </>
    );
};

export default Details;
