import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // GENERAL

  container: {
    flex: 1,
  },

  imageBackGround: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  // IMAGES

  imgTrainer: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    position: "absolute",
    top: 414,
    left: 70,
  },

  imgAdvPokemon: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    position: "absolute",
    top: -100,
    left: 150,
  },

  imgOurPokemon: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    position: "absolute",
    top: 0,
    left: -150,
  },

  // TEXTBOX et TEXTE

  textBox: {
    position: "absolute",
    top: 773,
    left: 20,
  },

  ourHealth: {
    position: "absolute",
    top: 732,
    left: 393,
  },

  ourMaxHealth: {
    position: "absolute",
    top: 732,
    left: 418,
  },

  advHealth: {
    position: "absolute",
    top: -122,
    left: 349,
  },

  advMaxHealth: {
    position: "absolute",
    top: -122,
    left: 376,
  },

  // BOUTTON

  buttonAttaquer: {
    position: "absolute",
    top: 780,
    left: 345,
    height: 35,
    width: 150,
  },

  // HEALTHBAR

  ourHealthBar: {
    position: "absolute",
    top: 728,
    left: 16,
    borderRadius: 5,
  },

  advHealthBar: {
    position: "absolute",
    top: -120,
    left: 320,
    borderRadius: 5,
  },
});
