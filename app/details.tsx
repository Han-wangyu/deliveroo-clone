import React, {useLayoutEffect, useRef, useState} from 'react';
import {Image, ListRenderItem, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "../constants/Colors";
import { restaurant } from "../assets/data/restaurant";
import {Link, useNavigation} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

const ParallaxScrollView = require('../components/ParallaxScrollView');

const Details = () => {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);

    const opacity = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<TouchableOpacity[]>([]);

    const DATA =  restaurant.food.map((item, index) => ({
       title: item.category,
       data: item.meals,
       index,
    }));

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

    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index);

        selected.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true});
        });
    }

    const onScroll = (event: any) => {
        const y = event.nativeEvent.contentOffset.y;
        if (y > 350) {
            opacity.value = withTiming(1);
        } else {
            opacity.value = withTiming(0);
        }
    }

    const renderItem: ListRenderItem<any> = ({ item, index }) => (
        <Link href={'/(modal)/dish'} asChild>
            <TouchableOpacity style={styles.item}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.dish}>{ item.name }</Text>
                    <Text style={styles.dishText}>{ item.info }</Text>
                    <Text style={styles.dishText}>${ item.price }</Text>
                </View>
                <Image source={item.img} style={styles.dishImage} />
            </TouchableOpacity>
        </Link>
    )

    return (
        <>
            <ParallaxScrollView backgroundColor={"#fff"}
                                scrollEvent={onScroll}
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
                    <Text style={styles.restaurantName}>{ restaurant.name }</Text>
                    <Text style={styles.restaurantDescription}>
                        { restaurant.delivery } · { restaurant.tags.map((tag, index) => (
                            `${tag}${index < restaurant.tags.length - 1 ? ` · ` : ""}`
                    )) }
                    </Text>
                    <Text style={styles.restaurantDescription}>
                        { restaurant.about }
                    </Text>
                    <SectionList
                        contentContainerStyle={{ marginBottom: 50 }}
                        scrollEnabled={false}
                        sections={DATA}
                        keyExtractor={(item, index) => `${item.id + index}`}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => (
                            <View style={{ marginHorizontal: 16, height: 1, backgroundColor: Colors.grey }}></View>
                        )}
                        SectionSeparatorComponent={() => (
                            <View style={{ height: 1, backgroundColor: Colors.grey }}></View>
                        )}
                        renderSectionHeader={({ section: { title, index } }) => (
                            <Text style={styles.sectionHeader}>
                                { title }
                            </Text>
                        )}
                    />
                </View>
            </ParallaxScrollView>

            <AnimatedView style={[styles.stickySegments, animatedStyles]}>
                <View style={styles.segmentsShadow}>
                    <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.segmentScrollView}>
                        { restaurant.food.map((item, index) => (
                            <TouchableOpacity ref={(ref) => itemsRef.current[index] = ref!} key={index} style={activeIndex === index ? styles.segmentButtonActive : styles.segmentButton} onPress={() => selectCategory(index)}>
                                <Text style={activeIndex === index ? styles.segmentTextActive : styles.segmentText}>{ item.category }</Text>
                            </TouchableOpacity>
                        )) }
                    </ScrollView>
                </View>
            </AnimatedView>
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
    restaurantName: {
        fontSize: 30,
        margin: 16,
    },
    restaurantDescription: {
        fontSize: 16,
        margin: 16,
        lineHeight: 22,
        color: Colors.medium,
    },
    sectionHeader: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 40,
        margin: 16,
    },
    item: {
        backgroundColor: "#fff",
        padding: 16,
        flexDirection: "row",
    },
    dishImage: {
        height: 80,
        width: 80,
        borderRadius: 4,
    },
    dish: {
        fontSize: 16,
        fontWeight: "bold",
    },
    dishText: {
        fontSize: 14,
        color: Colors.mediumDark,
        paddingHorizontal: 4,
    },
    stickySegments: {
        position: "absolute",
        height: 50,
        left: 0,
        right: 0,
        top: 70,
        backgroundColor: "#fff",
    },
    segmentsShadow: {
        backgroundColor: "#fff",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        height: "100%",
    },
    segmentButton: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentText: {
        color: Colors.primary,
        fontWeight: "bold",
        fontSize: 16,
    },
    segmentTextActive: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    segmentButtonActive: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentScrollView: {
        paddingHorizontal: 16,
        alignItems: "center",
        gap: 20,
        paddingBottom: 4,
    },
});

export default Details;
