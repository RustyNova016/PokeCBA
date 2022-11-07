import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";

export function Debug_MobModel(props) {
    return <View style={debugCardStyle.container}>
        <ScrollView style={debugCardStyle.container}>
            <Text>Name: {props.mob.name}</Text>
        </ScrollView>
    </View>;
}

const debugCardStyle = new StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "#f8abb8",
        width: "auto",
        height: "auto",
        borderColor: "#000000",
        borderStyle: "solid"
    }
})