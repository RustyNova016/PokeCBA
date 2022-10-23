import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";

export function Debug_MobModel(props) {
    return <View style={styles.container}>
        <ScrollView style={styles.container}>
            <Text>Name: {props.mob.name}</Text>
        </ScrollView>
    </View>;
}

const styles = new StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "#f8abb8",
        width: "auto",
        height: "auto"
    }
})