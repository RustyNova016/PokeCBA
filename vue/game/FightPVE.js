import React, { useState, useEffect } from "react";
import HealthBar from "../../components/HealthBar/HealthBar";
import { CalculateDamage } from "../../tools/CalculateDamage.js";
import { ColorHealthBar } from "../../tools/ColorHealthBar";
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
} from "react-native";

const ourMob = [
  {
    id_model: 0,
    label: "Salameche",
    PV: { current: 99, max: 99 },
    attack: 60,
    defense: 55,
    speed: 70,
    lvl: 35,
    xp: { current: 1, max: 10000 },
    type: ["fire"],
    capacities: [
      { name: "Griffe", power: 20 },
      { name: "Flammèche", power: 40 },
    ],
    img: require("../../images/SALAMECHE.png"),
  },
  {
    id_model: 1,
    label: "Pikachu",
    PV: { current: 80, max: 80 },
    attack: 60,
    defense: 50,
    speed: 95,
    lvl: 30,
    xp: { current: 1, max: 10000 },
    type: ["electric"],
    capacities: [
      { name: "Double Pied", power: 30 },
      { name: "Eclair", power: 40 },
    ],
    img: require("../../images/PIKACHU.png"),
  },
  {
    id_model: 2,
    label: "Pandespiègle",
    PV: { current: 130, max: 130 },
    attack: 90,
    defense: 70,
    speed: 50,
    lvl: 40,
    xp: { current: 1, max: 10000 },
    type: ["water"],
    capacities: [
      { name: "Charge", power: 40 },
      { name: "Plaquage", power: 85 },
    ],
    img: require("../../images/PANDESPIEGLE.png"),
  },
];

const advMob = [
  {
    id_model: 2,
    label: "Raikou",
    PV: { current: 140, max: 140 },
    attack: 70,
    defense: 60,
    speed: 100,
    lvl: 10,
    xp: { current: 1, max: 10000 },
    type: ["water"],
    capacities: [
      { name: "Morsure", power: 60 },
      { name: "Eclair", power: 40 },
    ],
    img: require("../../images/RAIKOU.png"),
  },
];

const item = [
  {
    name: "Potion",
    effect: 20,
    qty: 4,
  },
  {
    name: "Super Potion",
    effect: 50,
    qty: 2,
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

  const [ourHealth, setOurHealth] = useState(ourMob[numPokemon].PV["current"]);
  const [ourMaxHealth, setOurMaxHealth] = useState(
    ourMob[numPokemon].PV["max"]
  );
  const [ourAttack, setOurAttack] = useState(ourMob[numPokemon].attack);
  const [ourDefense, setOurDefense] = useState(ourMob[numPokemon].defense);
  const [ourSpeed, setOurSpeed] = useState(ourMob[numPokemon].speed);
  const [ourLevel, setOurLevel] = useState(ourMob[numPokemon].lvl);
  const [ourName, setOurName] = useState(ourMob[numPokemon].label);
  const [srcOurPokemon, setSrcOurPokemon] = useState(ourMob[numPokemon].img);

  //  POKEMON ADVERSE
  const [advHealth, setAdvHealth] = useState(advMob[0].PV["current"]);
  const [advMaxHealth] = useState(advMob[0].PV["max"]);
  const [advAttack, setAdvAttack] = useState(advMob[0].attack);
  const [advDefense, setAdvDefense] = useState(advMob[0].defense);
  const [advSpeed, setAdvSpeed] = useState(advMob[0].speed);
  const [advLevel, setAdvLevel] = useState(advMob[0].lvl);
  const [advName, setAdvName] = useState(advMob[0].label);
  const [srcAdvPokemon] = useState(advMob[0].img);

  // VARIABLE TEXT BOX
  const [textBox, setTextBox] = useState([
    `Un ${advName} sauvage, niveau ${advLevel} apparait`,
  ]);

  // VARIABLE INUTILE POUR MAJ TEXTBOX
  const [majTextBox, setMajTextBox] = useState(0);

  // VARIABLES AFFICHAGE MODAL ET ANIMATION
  const [hiddenButton, setHiddenButton] = useState(true);
  const [hiddenButtonRetour, setHiddenButonRetour] = useState(false);

  const [showModalAttack, setShowModalAttack] = useState(false);
  const [showModalBag, setShowModalBag] = useState(false);
  const [showModalPokemon, setShowModalPokemon] = useState(false);

  const [ourAnimation, setOurAnimation] = useState(0);
  const [advAnimation, setAdvAnimation] = useState(0);

  useEffect(() => {
    // PEUT ON ATTENDRE AFFECTATION AVANT DE CONTINUER ????????
    setTimeout(() => {
      // ON INITIALISE LES VARIABLES DE NOTRE POKEMON
      setOurHealth(ourMob[numPokemon].PV["current"]);
      setOurMaxHealth(ourMob[numPokemon].PV["max"]);
      setOurAttack(ourMob[numPokemon].attack);
      setOurDefense(ourMob[numPokemon].defense);
      setOurSpeed(ourMob[numPokemon].speed);
      setOurLevel(ourMob[numPokemon].lvl);
      setOurName(ourMob[numPokemon].label);
      setSrcOurPokemon(ourMob[numPokemon].img);

      // Animation de départ
      updateText(`${ourMob[numPokemon].label} GO !`);
      setShowTrainer(false);
      setShowOurPokemon(true);
    }, 2000);

    // Test de vitesse pour savoir qui attaque en premier
    setTimeout(() => {
      setHiddenButton(false);

      ourMob[numPokemon].speed < advSpeed
        ? (updateText(`${advName} est rapide, il attaque en premier`),
          setHiddenButton(true),
          attackByAdv())
        : updateText(`Que fais t-on ?`);
    }, 2000);
  }, [numPokemon]);

  // Fonction d'attaque par l'ADVERSAIRE
  const attackByAdv = function (effectItem) {
    // On choisit une attaque au hasard dans les capacités du Pokémon
    let numAdvAttack = Math.round(
      Math.random() * (advMob[0].capacities.length - 1)
    );
    let nameAdvAttack = advMob[0].capacities[numAdvAttack].name;
    let powerAdvAttack = advMob[0].capacities[numAdvAttack].power;

    // Appel de la fonction : Calcul dégats et définition du texte
    let result = CalculateDamage(
      advLevel,
      advAttack,
      nameAdvAttack,
      powerAdvAttack,
      ourMob[numPokemon].defense, // On appelle de cette manière
      ourMob[numPokemon].label   // pour être sur d'avoir les bonnes valeurs
    );

    // On récupére les résultats de la fonction
    let damage = result[0];
    let text = result[1];

    // On affecte une valeur à effecItem pour la vérification : autre solution ?
    effectItem == undefined ? (effectItem = 0) : null;

    // On réaffecte les différentes variables
    setTimeout(() => {
      ourHealth + effectItem - damage > 0
        ? (setOurHealth((ourHealth) => ourHealth - damage),
          updateText(text),
          setAdvAnimation(advAnimation + 1),
          setHiddenButton(false))
        : (updateText(text), setAdvAnimation(advAnimation + 1), defeatForUs());
    }, 1500);
  };

  // Fonction d'attaque par NOUS
  const attackByOur = function (nameOurAttack, powerOurAttack) {
    // Desactivation bouton Attaquer
    setHiddenButton(true);

    // Appel de la fonction : Calcul dégats et définition du texte
    let result = CalculateDamage(
      ourLevel,
      ourAttack,
      nameOurAttack,
      powerOurAttack,
      advDefense,
      advName
    );

    // On récupére les résultats de la fonction
    let damage = result[0];
    let text = result[1];

    // On réaffecte les différentes variables
    setAdvHealth((advHealth) => advHealth - damage);
    updateText(text);
    setOurAnimation(ourAnimation + 1);
    setHiddenButton(true);
    advHealth - damage <= 0 ? victoryForUs() : attackByAdv();
  };

  // Fonction utilisation ITEM
  const useItem = function (nameItem, effectItem, indexItem) {
    // On cache les boutons du Menu
    setHiddenButton(true);

    // On enleve une quantité de l'objet dans notre inventaire
    item[indexItem].qty--;

    // On supprime l'objet de notre inventaire si quantité = 0
    let qty = item[indexItem].qty;
    qty == 0 ? item.splice(indexItem, 1) : null;

    // On applique l'effet de l'Item
    if (ourHealth + effectItem > ourMaxHealth) {
      setOurHealth(ourMaxHealth);
    } else {
      setOurHealth((ourHealth) => ourHealth + effectItem);
    }

    // On mets à jour la textBox
    updateText(`${nameItem} vous redonne ${effectItem} PV`);

    // Appel fonction d'attaque adverse avec l'effet de l'item pour vérification
    attackByAdv(effectItem);
  };

  // Fonction changement de Pokemon
  const changeOurPokemon = function (index) {
    // On ré-affiche le bouton RETOUR dans la modal Pokemon
    setHiddenButonRetour(false);

    // On affecte la vie actuelle à notre Pokemon
    ourMob[numPokemon].PV["current"] = ourHealth;

    // On rappelle notre Pokémon
    setShowOurPokemon(false);
    setShowTrainer(true);

    // MaJ TextBox
    updateText(`${ourName} reviens !`);

    // On change de Pokémon et on rappelle le UseEffect
    setNumPokemon(index);
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

  // Fonction VICTOIRE
  const victoryForUs = function () {
    setAdvHealth(0);
    updateText(`${advName} est KO, VICTOIRE`);
    setHiddenButton(true);
    setTimeout(() => {
      setShowPokemonAdv(false);
    }, 1000);
    setTimeout(() => {
      // VERS PAGE VICTOIRE
      navigation.navigate("Victory");
    }, 1500);
  };

  // Fonction DEFAITE
  const defeatForUs = function (test) {
    setOurHealth(0);
    setHiddenButton(true);
    setShowOurPokemon(false);

    // On cache le bouton RETOUR dans la modal Pokemon

    setHiddenButonRetour(true);

    let allDead = 0;

    for (let i = 0; i < ourMob.length; i++) {
      ourMob[i].PV["current"] == 0 ? allDead++ : null;
    }
    console.log(allDead);

    if (allDead == 2) {
      updateText(`Tout vos Pokémons sont KO ...`);
      setTimeout(() => {
        // VERS PAGE DEFAITE
        navigation.navigate("Defeat");
      }, 2000);
    } else {
      setShowModalPokemon(true);
      setTimeout(() => {
        ourMob[numPokemon].PV["current"] = 0;
        updateText(`${ourName} est KO`);
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
                progressHealthBar={advHealth / advMaxHealth}
                colorHealthBar={ColorHealthBar(advHealth / advMaxHealth)}
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
            <Pressable
              style={styles.buttonPokemon}
              onPress={() => setShowModalPokemon(!showModalPokemon)}
            >
              <Text style={styles.pixelPolice}>POKéMON</Text>
            </Pressable>
          </View>
        )}

        {/* Notre HealthBar */}
        <HealthBar
          styleHealthBar={styles.ourHealthBar}
          progressHealthBar={ourHealth / ourMaxHealth}
          colorHealthBar={ColorHealthBar(ourHealth / ourMaxHealth)}
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
              {ourMob[numPokemon].capacities.map((el) => {
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
                      {el.name} (+{el.effect}PV) x{el.qty}
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

        {/* Modal pour les Pokemon */}
        <Modal
          animationType="slide"
          visible={showModalPokemon}
          transparent={true}
          onRequestClose={() => setShowModalPokemon(!showModalPokemon)}
        >
          <View>
            <View style={styles.modalView}>
              {ourMob.map((el, index) => {
                if (el.PV["current"] != 0 && index != numPokemon) {
                  return (
                    <Pressable
                      style={styles.buttonModal}
                      onPress={() => {
                        changeOurPokemon(index);
                        setShowModalPokemon(!showModalPokemon);
                      }}
                    >
                      <Text style={styles.textModal}>
                        {el.label} - {el.PV["current"]}/{el.PV["max"]}PV
                      </Text>
                    </Pressable>
                  );
                }
              })}
              {!hiddenButtonRetour && (
                <Pressable
                  style={styles.buttonModal}
                  onPress={() => {
                    setShowModalPokemon(!showModalPokemon),
                      setHiddenButton(false);
                  }}
                >
                  <Text style={styles.textModal}>RETOUR</Text>
                </Pressable>
              )}
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
    width: 280,
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
    height: 200,
    resizeMode: "contain",
    position: "absolute",
    top: -180,
    left: 120,
  },

  imgOurPokemon: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    position: "absolute",
    top: 40,
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
    top: -175,
    left: 336,
    fontFamily: "SHPinscher",
    color: "#1F0F42",
  },

  advMaxHealth: {
    position: "absolute",
    top: -175,
    left: 363,
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

  buttonPokemon: {
    position: "absolute",
    top: 348,
    left: 358,
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
    top: -170,
    left: 310,
    borderRadius: 5,
  },
});
