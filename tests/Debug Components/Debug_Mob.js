import {Image} from "react-native";
import React from "react";
import {Debug_Card} from "./Debug_Card";

/**
 *
 * @param {{mob: Mob}} props
 * @return {JSX.Element}
 * @constructor
 */
export function Debug_Mob(props) {
    return <Debug_Card type={"Mob"} name={props.mob.nickname}>
        {
            props.mob.img.map(
                (value, id) => {
                    console.log(value)
                    return <Image source={value} key={id}></Image>
                }
            )
        }

    </Debug_Card>
}

