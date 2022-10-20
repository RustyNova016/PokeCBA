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

  // MODAL
  modalView: {
    height: 265,
    width: 295,
    justifyContent: "flex-start",
    marginTop: 720,
    margin: 10,
    padding: 10,
    backgroundColor: "#1F0F42",
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
  },

  buttonModal: {
    borderRadius: 5,
    marginBottom: 7,
    width: 285,
    padding: 5,
    elevation: 1,
    backgroundColor: "#FFCC03",
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

  pixelPolice: {
    fontFamily: "SHPinscher",
  },

  textModal: {
    textAlign: "center",
    color: "#1F0F42",
    fontSize: 15,
    padding: 3,
    fontFamily: "SHPinscher",
  },

  ourHealth: {
    position: "absolute",
    top: 730,
    left: 393,
    fontFamily: "SHPinscher",
  },

  ourMaxHealth: {
    position: "absolute",
    top: 730,
    left: 422,
    fontFamily: "SHPinscher",
  },

  advHealth: {
    position: "absolute",
    top: -125,
    left: 352,
    fontFamily: "SHPinscher",
  },

  advMaxHealth: {
    position: "absolute",
    top: -125,
    left: 376,
    fontFamily: "SHPinscher",
  },

  // BOUTTONS MENU
  buttonAttack: {
    position: "absolute",
    top: 265,
    left: 358,
    height: 35,
    width: 150,
  },

  buttonBag: {
    position: "absolute",
    top: 307,
    left: 368,
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
