import {ScrollView, Text, View} from "react-native";
import {debugCardStyle} from "./Debug_MobModel";
import React from "react";

/**
 *
 * @param {{children: JSX.Element, name: string, type: string}} props
 * @return {JSX.Element}
 * @constructor
 */
export function Debug_Card(props) {
    return <View style={debugCardStyle.container}>
        <ScrollView style={debugCardStyle.container}>
            <Text>Debug for "{props.name}" of type {props.type}</Text>
            {props.children}
        </ScrollView>
    </View>;
}

/**
 *
 * @param {{ability: Ability}} props
 * @return {JSX.Element}
 * @constructor
 */
export function Debug_Ability(props){
    return <Debug_Card name={props.ability.name} type={"Ability"}>
        <Text></Text>
    </Debug_Card>
}