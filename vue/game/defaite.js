import React, { useState, useEffect, useRef } from "react";
import { Text, Animated, View, StyleSheet, Image } from "react-native";

export default function defaite() {
  const [imgDEFAITE] = useState(require("../../images/imgDEFAITE.png"));
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
        <View>
          <Image style={styles.img} source={imgDEFAITE} />
          <Text style={styles.text}>DEFAITE :(</Text>
        </View>
      </Animated.View>
    </View>
  );
}

// CSS
const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F0F42",
    justifyContent: "center",
  },

  text: {
    marginTop: 30,
    fontSize: 60,
    textAlign: "center",
    color: "#FFCC03",
  },

  img: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
  },
});
