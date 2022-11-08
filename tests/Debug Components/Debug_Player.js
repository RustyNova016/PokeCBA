import {ScrollView, Text, View} from "react-native";
import React from "react";
import {debugCardStyle} from "./Debug_MobModel";
import {Debug_Card} from "./Debug_Card";
import {Debug_Team} from "./Debug_Team";

/**
 *
 * @param {{player: Player}} props
 * @return {JSX.Element}
 * @constructor
 */
export function Debug_Player(props) {
    return <Debug_Card name={props.player.nickname} type={"Player"}>
        <Debug_Team team={props.player.teams}></Debug_Team>
    </Debug_Card>
}

