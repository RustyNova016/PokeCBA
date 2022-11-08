// @generated: @expo/next-adapter@2.1.52
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useElementType} from "../API/Data Hooks/useElementType";
import {Team} from "../classes/Team";
import {TEST_Teams} from "../tests/Test Data/TEST_Teams";
import {Debug_Team} from "../tests/Debug Components/Debug_Team";
import {Debug_Player} from "../tests/Debug Components/Debug_Player";
import {Player} from "../classes/Player";
import {TEST_Players} from "../tests/Test Data/TEST_Player";

export default function App() {
    useElementType()
    //console.log("Creating test babasaure_model")
    //const testBabaure = MobModel.fromJson(TEST_MobModel.babasaure);
    //const abi = Ability.fromJson(TEST_Abilities.charge);
    //const baba = Mob.fromJSON(TEST_Mobs.baba);
    // const team = Team.fromJSON(TEST_Teams.teamA);
    const player = Player.fromJSON(TEST_Players.player1)

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>

            <Debug_Player player={player}></Debug_Player>
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
