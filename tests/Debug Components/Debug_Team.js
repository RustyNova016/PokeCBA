import React from "react";
import {Debug_Card} from "./Debug_Card";
import {Debug_Mob} from "./Debug_Mob";

/**
 *
 * @param {{team: Team}} props
 * @return {JSX.Element}
 * @constructor
 */
export function Debug_Team(props) {
    return <Debug_Card name={props.team.name} type={"Team"}>
        <>
        </>
    </Debug_Card>
}

