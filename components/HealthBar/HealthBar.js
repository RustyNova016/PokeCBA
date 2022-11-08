import React from "react";
import * as Progress from "react-native-progress";

const HealthBar = (props) => {
  return (
    <Progress.Bar
      style={props.styleHealthBar}
      progress={props.progressHealthBar}
      color={props.colorHealthBar}
      width={props.widthHealthBar}
      height={props.heigthHealthBar}
      unfilledColor="#1F0F42"
    />
  );
};

export default HealthBar;
