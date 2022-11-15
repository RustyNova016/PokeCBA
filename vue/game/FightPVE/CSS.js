import { StyleSheet } from "react-native";

export const DarkBlueBackground = "#1F0F42";
export const styles = new StyleSheet.create({
  // GENERAL

  container: {
    backgroundColor: DarkBlueBackground,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 52
  },

  // ECRAN DE JEU AVEC IMG POKEMON
  viewTopPage: {
    height: "70%",
    margin: 5,
    borderRadius: 5,
  },

  imageBackGround: {
    marginTop: 5,
    borderRadius: 5,
    overflow: "hidden",
  },

  // VUE POKEMON DANS ECRAN JEU
  viewPokemon: {
    flexDirection: "row-reverse",
    height: "100%",
  },

  // VUE DE NOTRE POKEMON // GAUCHE DE L'ECRAN
  viewOurPokemon: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "50%",
    marginBottom: "2%",
  },

  imgOurPokemon: {
    height: 120,
    resizeMode: "contain",
  },

  // VUE DE POKEMON ADV // DROITE DE L'ECRAN
  viewPokemonAdv: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "50%",
  },

  imgAdvPokemon: {
    height: 120,
    resizeMode: "contain",
  },

  viewHealthBarAdv: {
    alignItems: "center",
  },

  viewImageAdv: {
    alignItems: "center",
    marginBottom: "50%",
  },

  advHealth: {
    fontFamily: "SHPinscher",
    color: DarkBlueBackground,
    position: "absolute",
    top: -6,
  },

  // VUE BAS DE PAGE // HEALTH BAR + MENU ET TEXTE
  viewBottomPage: {
    width: "100%",
    height: "30%",
  },

  // NOTRE HEALTHBAR
  viewOurHealthBar: {
    backgroundColor: "#FFCC03",
    marginLeft: 5,
    marginRight: 5,
    flexDirection: "row",
    height: "14%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 5,
  },

  ourHealth: {
    fontFamily: "SHPinscher",
    fontSize: 15,
    color: DarkBlueBackground,
  },

  // VUE TEXTES ET BOUTONS
  viewTextAndButton: {
    backgroundColor: "#FFCC03",
    margin: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "80%",
  },

  // TEXTBOX et TEXTE
  viewText: {
    elevation: 1,
    borderRadius: 5,
    backgroundColor: "#FFCC03",
    width: "66.5%",
  },

  lineOfTextBox: {
    marginLeft: 5,
    fontFamily: "SHPinscher",
    color: DarkBlueBackground,
    fontSize: 18,
  },

  // BOUTTONS MENU
  viewButton: {
    elevation: 1,
    borderRadius: 5,
    backgroundColor: "#FFCC03",
    width: "30%",
  },

  button: {
    backgroundColor: "#FFCC03",
    elevation: 1,
    height: 35,
    marginTop: 5,
    borderRadius: 5,
  },

  textButton: {
    textAlign: "center",
    fontFamily: "SHPinscher",
    color: DarkBlueBackground,
    fontSize: 18,
    padding: 3,
  },

  // MODAL ET TRAINER
  imgTrainer: {
    height: 250,
    resizeMode: "contain",
    position: "absolute",
    marginTop: "83.5%",
    left: 100,
  },

  modalView: {
    backgroundColor: "#FFCC03",
    borderRadius: 5,
    alignItems: "center",
    elevation: 1,
    marginLeft: 5,
    position: "absolute",
    bottom: 0,
    height: "24.85%",
    width: "66.5%",
  },

  scrollView: {
    width: "100%",
  },

  buttonModal: {
    borderRadius: 5,
    margin: 1.5,
    width: "100%",
    elevation: 1,
    backgroundColor: "#FFCC03",
  },
});
