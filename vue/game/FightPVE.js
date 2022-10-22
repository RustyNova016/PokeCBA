import React, { useState, useEffect } from "react";
import HealthBar from "../../components/HealthBar/HealthBar";
import { StyleSheet } from "react-native";
import { Shake } from "react-native-motion";
import * as constClass from "../../Constants.js";

import {
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";

const mob = [
  {
    id_model: 0,
    label: "Salameche",
    PV: { current: 39, max: 39 },
    attack: 52,
    defense: 43,
    speed: 40,
    lvl: 1,
    xp: { current: 1, max: 10000 },
    type: ["fire"],
    capacities: [
      { name: "Griffe", power: 20 },
      { name: "Flammèche", power: 40 },
    ],
  },
  {
    id_model: 1,
    label: "Pikachu",
    PV: { current: 35, max: 35 },
    attack: 55,
    defense: 40,
    speed: 90,
    lvl: 1,
    xp: { current: 1, max: 10000 },
    type: ["electric"],
    capacities: [
      { name: "Double Pied", power: 30 },
      { name: "Eclair", power: 40 },
    ],
  },
  {
    id_model: 2,
    label: "Carapuce",
    PV: { current: 44, max: 44 },
    attack: 48,
    defense: 65,
    speed: 43,
    lvl: 9,
    xp: { current: 1, max: 10000 },
    type: ["water"],
    capacities: [
      { name: "Charge", power: 20 },
      { name: "Pistolet à O", power: 40 },
    ],
  },
];

const item = [
  {
    name: "Potion",
    effect: 10,
    qty: 2,
  },
  {
    name: "Mega-Potion",
    effect: 20,
    qty: 1,
  },
];

export default function FightPVE({ navigation, route }) {
  // VARIABLES POUR LES IMAGES
  const srcBackground = constClass.srcBackground;
  const [srcTrainer, setSrcTrainer] = useState(
    require("../../images/trainer.png")
  );

  // AFFICHAGE DES IMAGES DE BASE
  const [showTrainer, setShowTrainer] = useState(true);
  const [showOurPokemon, setShowOurPokemon] = useState(false);
  const [showPokemonAdv, setShowPokemonAdv] = useState(true);

  // VARIABLES POUR LES POKEMONS

  // NOTRE POKEMON
  const [numPokemon, setNumPokemon] = useState(0);

  const [ourHealth, setOurHealth] = useState(mob[numPokemon].PV["current"]);
  const [ourMaxHealth, setOurMaxHealth] = useState(mob[numPokemon].PV["max"]);
  const [ourAttack, setOurAttack] = useState(mob[numPokemon].attack);
  const [ourDefense, setOurDefense] = useState(mob[numPokemon].defense);
  const [ourSpeed, setOurSpeed] = useState(mob[numPokemon].speed);
  const [ourLevel, setOurLevel] = useState(mob[numPokemon].lvl);
  const [ourName, setOurName] = useState(mob[numPokemon].label);
  const [srcOurPokemon, setSrcOurPokemon] = useState(
    require("../../images/SALAMECHE.png")
  );

  //  POKEMON ADVERSE
  const [advHealth, setAdvHealth] = useState(mob[2].PV["current"]);
  const [advMaxHealth] = useState(mob[2].PV["max"]);
  const [advAttack, setAdvAttack] = useState(mob[2].attack);
  const [advDefense, setAdvDefense] = useState(mob[2].defense);
  const [advSpeed, setAdvSpeed] = useState(mob[2].speed);
  const [advLevel, setAdvLevel] = useState(mob[2].lvl);
  const [advName, setAdvName] = useState(mob[2].label);
  const [srcAdvPokemon] = useState(require(`../../images/CARAPUCE.png`));

  // VARIABLE TEXT BOX
  const [textBox, setTextBox] = useState([
    `Un ${advName} sauvage, niveau ${advLevel} apparait`,
  ]);

  // VARIABLE INUTILE POUR MAJ TEXTBOX
  const [majTextBox, setMajTextBox] = useState(0);

  // VARIABLES HEALTHBAR
  const [ourHealthBar, setOurHealthBar] = useState(1);
  const [colorOurHealthBar, setColorOurHealthBar] = useState("green");

  const [advHealthBar, setAdvHealthBar] = useState(1);
  const [colorAdvHealthBar, setColorAdvHealthBar] = useState("green");

  // VARIABLES AFFICHAGE ET ANIMATION
  const [hiddenButton, setHiddenButton] = useState(true);
  const [showModalAttack, setShowModalAttack] = useState(false);
  const [showModalBag, setShowModalBag] = useState(false);
  const [ourAnimation, setOurAnimation] = useState(0);
  const [advAnimation, setAdvAnimation] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      // ON INITIALISE LES VARIABLES DE NOTRE POKEMON
      setOurHealth(mob[numPokemon].PV["max"]);
      setOurMaxHealth(mob[numPokemon].PV["max"]);
      setOurAttack(mob[numPokemon].attack);
      setOurDefense(mob[numPokemon].defense);
      setOurSpeed(mob[numPokemon].speed);
      setOurLevel(mob[numPokemon].lvl);
      setOurName(mob[numPokemon].label);

      // Animation de départ
      updateText(`${mob[numPokemon].label} GO !`);
      setShowTrainer(false);
      setShowOurPokemon(true);
      setColorOurHealthBar("green");
      setOurHealthBar(1);
    }, 3000);

    // Test de vitesse pour savoir qui attaque en premier
    setTimeout(() => {
      setHiddenButton(false);

      mob[numPokemon].speed < advSpeed
        ? (updateText(`${advName} est rapide, il attaque en premier`),
          setHiddenButton(true),
          attackByAdv())
        : null;
    }, 4000);
  }, [numPokemon]);

  // Fonction d'attaque par l'ADVERSAIRE
  const attackByAdv = function () {
    // On choisit une attaque au hasard dans les capacités du Pokémon
    let numAdvAttack = Math.round(
      Math.random() * (mob[2].capacities.length - 1)
    );
    let nameAdvAttack = mob[2].capacities[numAdvAttack].name;
    let powerAdvAttack = mob[2].capacities[numAdvAttack].power;

    setTimeout(() => {
      // Re Activation du bouton Attaquer
      setHiddenButton(false);

      // Calcul dégats
      let damage = 0;
      damage = parseInt(
        ((advLevel * 0.4 + 2) * advAttack * powerAdvAttack) /
          (ourDefense * 25) +
          2
      );

      // Calcul de la chance
      let luckyOrNot = Math.random() * (100 - 1) + 1;

      // Application des dégats
      if (luckyOrNot <= 10) {
        (damage = 0),
          updateText(`${ourName} esquive l'attaque !`),
          setOurHealth((ourHealth) => ourHealth - damage);
      } else if (luckyOrNot <= 90) {
        ourHealth - damage <= 0
          ? defeatForUs()
          : (setOurHealth((ourHealth) => ourHealth - damage),
            updateText(
              `Attaque ${nameAdvAttack} ! Elle inflige ${damage} de dégats`
            ));
      } else {
        damage *= 2;
        ourHealth - damage <= 0
          ? defeatForUs()
          : (setOurHealth((ourHealth) => ourHealth - damage),
            updateText(
              `Coup Critique ! ${nameAdvAttack} inflige ${damage} de dégats`
            ));
      }

      // MAJ LifeBar
      updateOurHealthBar(damage);

      // Animation du Pokémon adverse
      setAdvAnimation(advAnimation + 1);
    }, 1000);
  };

  // Fonction d'attaque par NOUS
  const attackByOur = function (nameOurAttack, powerOurAttack) {
    // Desactivation bouton Attaquer
    setHiddenButton(true);

    // Calcul dégats
    let damage = 0;
    damage = parseInt(
      ((ourLevel * 0.4 + 2) * ourAttack * powerOurAttack) / (advDefense * 25) +
        2
    );

    // Calcul de chance
    let luckyOrNot = Math.random() * (100 - 1) + 1;

    // Application des dégats
    if (luckyOrNot <= 10) {
      (damage = 0),
        updateText(`${advName} esquive l'attaque !`),
        setAdvHealth((advHealth) => advHealth - damage),
        attackByAdv();
    } else if (luckyOrNot <= 90) {
      advHealth - damage <= 0
        ? victoireForUs()
        : (setAdvHealth((advHealth) => advHealth - damage),
          updateText(
            `Attaque ${nameOurAttack} ! Elle inflige ${damage} de dégats`
          ),
          attackByAdv());
    } else {
      damage *= 2;
      advHealth - damage <= 0
        ? victoireForUs()
        : (setAdvHealth((advHealth) => advHealth - damage),
          updateText(
            `Coup Critique ! ${nameOurAttack} inflige ${damage} de dégats`
          ),
          attackByAdv());
    }

    // MAJ LifeBar
    updateAdvHealthBar(damage);

    // Animation de notre Pokemon
    setOurAnimation(ourAnimation + 1);
  };

  // Fonction MAJ de notre HealthBar
  const updateOurHealthBar = function (a) {
    // Longueur
    setOurHealthBar((ourHealthBar) => ourHealthBar - a / ourMaxHealth);

    // Couleur
    if (ourHealthBar > 0.75) {
      setColorOurHealthBar("green");
    } else if (ourHealthBar <= 0.25) {
      setColorOurHealthBar("red");
    } else if (ourHealthBar <= 0.5) {
      setColorOurHealthBar("orange");
    } else if (ourHealthBar <= 0.75) {
      setColorOurHealthBar("yellow");
    }
  };

  // Fonction MAJ HealthBar Adverse
  const updateAdvHealthBar = function (a) {
    // Longueur
    setAdvHealthBar((advHealthBar) => advHealthBar - a / advMaxHealth);

    // Couleur
    if (advHealthBar > 0.75) {
      setColorAdvHealthBar("green");
    } else if (advHealthBar <= 0.25) {
      setColorAdvHealthBar("red");
    } else if (advHealthBar <= 0.5) {
      setColorAdvHealthBar("orange");
    } else if (advHealthBar <= 0.75) {
      setColorAdvHealthBar("yellow");
    }
  };

  // Fonction de MAJ de la TextBox
  const updateText = function (text) {
    textBox.unshift(text);
    if (textBox.length > 10) {
      textBox.length = 10;
    }
    // MAJ d'une variable inutile pour MAJ affichage
    setMajTextBox(Math.random());
  };

  // Fonction utilisation ITEM
  const useItem = function (nameItem, effectItem, indexItem) {
    item[indexItem].qty--;
    let qty = item[indexItem].qty;

    qty == 0 ? item.splice(indexItem, 1) : null;

    if (ourHealth + effectItem > ourMaxHealth) {
      setOurHealth(ourMaxHealth);
      setColorOurHealthBar("green");
      setOurHealthBar(1);
    } else {
      setOurHealth((ourHealth) => ourHealth + effectItem);
      updateOurHealthBar(-effectItem);
    }

    updateText(`${nameItem} vous redonne ${effectItem} PV`);
    setHiddenButton(true);
    attackByAdv();
  };

  // Fonction VICTOIRE
  const victoireForUs = function () {
    setAdvHealth(0);
    updateText(`${advName} est KO, VICTOIRE`);
    setShowPokemonAdv(false);
    setHiddenButton(true);
    setTimeout(() => {
      // VERS PAGE VICTOIRE
      navigation.navigate("Victoire");
    }, 1000);
  };

  // Fonction DEFAITE
  const defeatForUs = function () {
    setOurHealth(0);
    setHiddenButton(true);
    setShowOurPokemon(false);
    if (numPokemon == 1) {
      setTimeout(() => {
        // VERS PAGE DEFAITE
        navigation.navigate("Defeat");
      }, 2000);
    } else {
      setNumPokemon((numPokemon) => numPokemon + 1);
      setSrcOurPokemon(require("../../images/PIKACHU.png"));
      setTimeout(() => {
        updateText(`${ourName} est KO`);
        setShowTrainer(true);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={srcBackground} style={styles.imageBackGround}>
        {/* HealthBar Adverse + Affichage Pokemon + Vie Pokemon sauvage*/}
        {showPokemonAdv && (
          <Shake value={advAnimation} type="timing">
            <View>
              <HealthBar
                styleHealthBar={styles.advHealthBar}
                progressHealthBar={advHealthBar}
                colorHealthBar={colorAdvHealthBar}
                widthHealthBar={100}
                heigthHealthBar={10}
              />
              <Image style={styles.imgAdvPokemon} source={srcAdvPokemon} />
              <Text style={styles.advHealth}>{advHealth} /</Text>
              <Text style={styles.advMaxHealth}>{advMaxHealth}</Text>
            </View>
          </Shake>
        )}

        {/* Gestion affichage dresseur */}
        <Modal animationType="slide" visible={showTrainer} transparent={true}>
          <Image style={styles.imgTrainer} source={srcTrainer} />
        </Modal>

        {/* Gestion affichage Pokemon */}
        {showOurPokemon && (
          <Shake value={ourAnimation} type="timing">
            <View>
              <Image style={styles.imgOurPokemon} source={srcOurPokemon} />
            </View>
          </Shake>
        )}

        {/* TextBox */}
        <View style={styles.textBox}>
          {textBox.map((ligne) => {
            return <Text style={styles.pixelPolice}>● {ligne}</Text>;
          })}
        </View>

        {/* Bouttons */}
        {!hiddenButton && (
          <View>
            <Pressable
              style={styles.buttonAttack}
              onPress={() => setShowModalAttack(!showModalAttack)}
            >
              <Text style={styles.pixelPolice}>ATTAQUER</Text>
            </Pressable>
            <Pressable
              style={styles.buttonBag}
              onPress={() => setShowModalBag(!showModalBag)}
            >
              <Text style={styles.pixelPolice}>SAC</Text>
            </Pressable>
          </View>
        )}

        {/* Notre HealthBar */}
        <HealthBar
          styleHealthBar={styles.ourHealthBar}
          progressHealthBar={ourHealthBar}
          colorHealthBar={colorOurHealthBar}
          widthHealthBar={362}
          heigthHealthBar={24}
        />

        {/* Affichage Notre Vie */}
        <Text style={styles.ourHealth}>{ourHealth}</Text>
        <Text style={styles.ourMaxHealth}>{ourMaxHealth}</Text>

        {/* Modal pour les attaques */}
        <Modal
          animationType="slide"
          visible={showModalAttack}
          transparent={true}
          onRequestClose={() => setShowModalAttack(!showModalAttack)}
        >
          <View>
            <View style={styles.modalView}>
              {mob[numPokemon].capacities.map((el) => {
                return (
                  <Pressable
                    style={styles.buttonModal}
                    onPress={() => {
                      attackByOur(el.name, el.power),
                        setShowModalAttack(!showModalAttack);
                    }}
                  >
                    <Text style={styles.textModal}>{el.name}</Text>
                  </Pressable>
                );
              })}
              <Pressable
                style={styles.buttonModal}
                onPress={() => {
                  setShowModalAttack(!showModalAttack);
                }}
              >
                <Text style={styles.textModal}>RETOUR</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal pour les objets */}
        <Modal
          animationType="slide"
          visible={showModalBag}
          transparent={true}
          onRequestClose={() => setShowModalBag(!showModalBag)}
        >
          <View>
            <View style={styles.modalView}>
              {item.map((el, index) => {
                return (
                  <Pressable
                    style={styles.buttonModal}
                    onPress={() => {
                      useItem(el.name, el.effect, index),
                        setShowModalBag(!showModalBag);
                    }}
                  >
                    <Text style={styles.textModal}>
                      {el.name} x{el.qty}
                    </Text>
                  </Pressable>
                );
              })}
              <Pressable
                style={styles.buttonModal}
                onPress={() => {
                  setShowModalBag(!showModalBag);
                }}
              >
                <Text style={styles.textModal}>RETOUR</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}

const styles = new StyleSheet.create({
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
    width: 442,
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
    width: 440,
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
    top: 373,
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
    color: "#1F0F42",
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
    color: "#1F0F42",
  },

  ourMaxHealth: {
    position: "absolute",
    top: 730,
    left: 422,
    fontFamily: "SHPinscher",
    color: "#1F0F42",
  },

  advHealth: {
    position: "absolute",
    top: -125,
    left: 352,
    fontFamily: "SHPinscher",
    color: "#1F0F42",
  },

  advMaxHealth: {
    position: "absolute",
    top: -125,
    left: 376,
    fontFamily: "SHPinscher",
    color: "#1F0F42",
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
