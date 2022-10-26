import React, { useState, useEffect, useRef } from "react";
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
    lvl: 50,
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
  const [hiddenButtonOfMenu, setHiddenButtonOfMenu] = useState(true);
  const [hiddenButtonRetour, setHiddenButonRetour] = useState(false);

  const [showModalAttack, setShowModalAttack] = useState(false);
  const [showModalBag, setShowModalBag] = useState(false);
  const [showModalPokemon, setShowModalPokemon] = useState(false);
  const [ourAnimation, setOurAnimation] = useState(0);
  const [advAnimation, setAdvAnimation] = useState(0);

  useEffect(() => {
    // ON INITIALISE LES VARIABLES DE NOTRE POKEMON
    setOurHealth(ourMob[numPokemon].PV["current"]);
    setOurMaxHealth(ourMob[numPokemon].PV["max"]);
    setOurAttack(ourMob[numPokemon].attack);
    setOurDefense(ourMob[numPokemon].defense);
    setOurSpeed(ourMob[numPokemon].speed);
    setOurLevel(ourMob[numPokemon].lvl);
    setSrcOurPokemon(ourMob[numPokemon].img);
    setOurName(ourMob[numPokemon].label);

    // ON VERIFIE L'INITIALISATION DE NOS VARIABLES
    if (ourName) {
      // Animation de départ
      setTimeout(() => {
        updateTextBox(`${ourName} GO !`);
        setShowTrainer(false);
        setShowOurPokemon(true);
      }, 2000);

      setTimeout(() => {
        setHiddenButtonOfMenu(false);
        // Test de vitesse pour savoir qui attaque en premier
        ourSpeed < advSpeed
          ? (updateTextBox(`${advName} est rapide, il attaque en premier`),
            setHiddenButtonOfMenu(true),
            attackByAdv())
          : updateTextBox(`Que fais t-on ?`);
      }, 4000);
    }
  }, [ourName, numPokemon]);

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
      ourDefense,
      ourName
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
          updateTextBox(text),
          setAdvAnimation(advAnimation + 1),
          setHiddenButtonOfMenu(false))
        : (updateTextBox(text),
          setAdvAnimation(advAnimation + 1),
          maybeDefeatForUs());
    }, 1500);
  };

  // Fonction d'attaque par NOUS
  const attackByOur = function (nameOurAttack, powerOurAttack) {
    // Desactivation bouton Attaquer
    setHiddenButtonOfMenu(true);

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
    updateTextBox(text);
    setOurAnimation(ourAnimation + 1);
    setHiddenButtonOfMenu(true);
    advHealth - damage <= 0 ? victoryForUs() : attackByAdv();
  };

  // Fonction utilisation ITEM
  const useItem = function (nameItem, effectItem, indexItem) {
    // On cache les boutons du Menu
    setHiddenButtonOfMenu(true);

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
    updateTextBox(`${nameItem} vous redonne ${effectItem} PV`);

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
    if (ourHealth != 0) {
      updateTextBox(`${ourName} reviens !`);
    }

    // On change de Pokémon et on rappelle le UseEffect
    setNumPokemon(index);

    // On remet en undefined la variable ourName pour vérification au départ
    setOurName();
  };

  // Fonction de MAJ de la TextBox
  const updateTextBox = function (text) {
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
    updateTextBox(`${advName} est KO, VICTOIRE`);
    setHiddenButtonOfMenu(true);
    setTimeout(() => {
      setShowPokemonAdv(false);
    }, 2000);
    setTimeout(() => {
      // VERS PAGE VICTOIRE
      navigation.navigate("Victory");
    }, 3000);
  };

  // Fonction DEFAITE
  const maybeDefeatForUs = function (test) {
    setOurHealth(0);
    setHiddenButtonOfMenu(true);
    setShowOurPokemon(false);

    // On cache le bouton RETOUR dans la modal Pokemon
    setHiddenButonRetour(true);

    let allDead = 0;

    for (let i = 0; i < ourMob.length; i++) {
      ourMob[i].PV["current"] == 0 ? allDead++ : null;
    }

    if (allDead == 2) {
      updateTextBox(`Tout vos Pokémons sont KO ...`);
      setTimeout(() => {
        // VERS PAGE DEFAITE
        navigation.navigate("Defeat");
      }, 2000);
    } else {
      ourMob[numPokemon].PV["current"] = 0;
      updateTextBox(`${ourName} est KO`);
      setTimeout(() => {
        setShowModalPokemon(true);
      }, 2000);
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
        {!hiddenButtonOfMenu && (
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
          widthHealthBar={363}
          heigthHealthBar={25}
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
                      setHiddenButtonOfMenu(false);
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
    top: 727,
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
