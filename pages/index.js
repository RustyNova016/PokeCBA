// @generated: @expo/next-adapter@2.1.52
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Mob_Model} from "../classes/Mob_Model";
import {TEST_Mob_Model} from "../tests/TEST_Mob_Model";

function Debug_MobModel(props) {
    return <View>
        <Text>Name: {props.mob.name}</Text>
    </View>;
}

export default function App() {
    const testBabaure = Mob_Model.fromJson(TEST_Mob_Model.babasaure);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>

            <Debug_MobModel mob={testBabaure}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
});
