// @generated: @expo/next-adapter@2.1.52
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MobModel} from "../classes/MobModel";
import {TEST_Mob_Model} from "../tests/Test Data/TEST_Mob_Model";
import {Debug_MobModel} from "../tests/Debug Components/Debug_MobModel";
import {useElementType} from "../API/Data Hooks/useElementType";

export default function App() {
    useElementType()
    console.log("Creating test babasaure")
    const testBabaure = MobModel.fromJson(TEST_Mob_Model.babasaure);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>

            <Debug_MobModel mob={testBabaure}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 50
    },
    text: {
        fontSize: 16,
    },
});
