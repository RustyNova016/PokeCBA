import React, { useState, useEffect } from "react";

import HealthBar from "../../../components/HealthBar/HealthBar";
import { CalculateDamage } from "../../../tools/CalculateDamage.js";
import { ColorHealthBar } from "../../../tools/ColorHealthBar";
import { StyleSheet } from "react-native";
import { Shake } from "react-native-motion";
import { Dimensions, Vibration } from "react-native";
import { Audio } from "expo-av";

import { advMob } from "../../../classes/advMob";
import { ourMob } from "../../../classes/ourMob";
import { item } from "../../../classes/item";

import * as constClass from "../../../Constants.js";
import { styles } from "./CSS.js";

import {
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  Modal,
  ScrollView,
  Button,
} from "react-native";

export default function FightPVE({ navigation, route }) {
  //TAILLE ECRAN
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  // VARIABLES POUR LES IMAGES
  const srcBackground = constClass.srcBackground;
  const [srcTrainer, setSrcTrainer] = useState(
    require("../../../images/trainer.png")
  );

  // AFFICHAGE DES IMAGES DE BASE
  const [showTrainer, setShowTrainer] = useState(true);
  const [showOurPokemon, setShowOurPokemon] = useState(false);
  const [showPokemonAdv, setShowPokemonAdv] = useState(true);

  // VARIABLES POUR LES POKEMONS

  // NOTRE POKEMON
  const [numOurPokemon, setNumOurPokemon] = useState(0);
  const [numAdvPokemon] = useState(
    0
    // Math.round(Math.random() * (advMob.length - 1))
  );

  const [ourHealth, setOurHealth] = useState(
    ourMob[numOurPokemon].PV["current"]
  );
  const [ourMaxHealth, setOurMaxHealth] = useState(
    ourMob[numOurPokemon].PV["max"]
  );
  const [ourAttack, setOurAttack] = useState(ourMob[numOurPokemon].attack);
  const [ourDefense, setOurDefense] = useState(ourMob[numOurPokemon].defense);
  const [ourSpeed, setOurSpeed] = useState(ourMob[numOurPokemon].speed);
  const [ourLevel, setOurLevel] = useState(ourMob[numOurPokemon].lvl);
  const [ourName, setOurName] = useState(ourMob[numOurPokemon].label);
  const [srcOurPokemon, setSrcOurPokemon] = useState(ourMob[numOurPokemon].img);
  const [ourType, setOurType] = useState(ourMob[numOurPokemon].type);

  //  POKEMON ADVERSE
  const [advHealth, setAdvHealth] = useState(
    advMob[numAdvPokemon].PV["current"]
  );
  const [advMaxHealth] = useState(advMob[numAdvPokemon].PV["max"]);
  const [advAttack, setAdvAttack] = useState(advMob[numAdvPokemon].attack);
  const [advDefense, setAdvDefense] = useState(advMob[numAdvPokemon].defense);
  const [advSpeed, setAdvSpeed] = useState(advMob[numAdvPokemon].speed);
  const [advLevel, setAdvLevel] = useState(advMob[numAdvPokemon].lvl);
  const [advName, setAdvName] = useState(advMob[numAdvPokemon].label);
  const [srcAdvPokemon] = useState(advMob[numAdvPokemon].img);
  const [advType, setAdvType] = useState(advMob[numAdvPokemon].type);

  // VARIABLE TEXT BOX
  const [textBox, setTextBox] = useState([
    `Un ${advName} niveau ${advLevel} apparait`,
  ]);

  // VARIABLE INUTILE POUR MAJ TEXTBOX
  const [majTextBox, setMajTextBox] = useState(0);

  // VARIABLES AFFICHAGE MODAL ET ANIMATION
  const [disabledButtonOfMenu, setHiddenButtonOfMenu] = useState(true);
  const [hiddenButtonRetour, setHiddenButonRetour] = useState(false);

  const [showModalAttack, setShowModalAttack] = useState(false);
  const [showModalBag, setShowModalBag] = useState(false);
  const [showModalPokemon, setShowModalPokemon] = useState(false);
  const [ourAnimation, setOurAnimation] = useState(0);
  const [advAnimation, setAdvAnimation] = useState(0);

  // VARIABLES NECESSAIRE POUR UTILISATION D'UN ITEM
  const [nameItem, setNameItem] = useState("");
  const [effectItem, setEffectItem] = useState(0);
  const [indexItem, setIndexItem] = useState(0);
  const [needAlive, setNeedAlive] = useState(false);

  // VARIABLES POUR DEFINITION DE L'AFFICHAGE DE LA MODAL POKEMON
  const [modalDisplayForChange, setModalDisplayForChange] = useState(false);
  const [modalDisplayPokemonAlive, setModalDisplayPokemonAlive] =
    useState(false);
  const [modalDisplayPokemonDead, setModalDisplayPokemonDead] = useState(false);

  const [soundBackGround, setSoundBackGround] = useState();
  const [soundAttack, setSoundAttack] = useState();

  useEffect(() => {
    playSoundBackGround();
    setInterval(function () {
      playSoundBackGround();
    }, 80000);
  }, []);

  async function playSoundBackGround() {
    const { sound: soundBackGround } = await Audio.Sound.createAsync(
      require("../../../sounds/Battle.mp3")
    );
    setSoundBackGround(soundBackGround);
    await soundBackGround.playAsync();
  }

  async function playSoundAttack() {
    const { sound : soundAttack } = await Audio.Sound.createAsync(
      require("../../../sounds/Cut.mp3")
    );
    setSoundAttack(soundAttack);
    await soundAttack.playAsync();
  }

  useEffect(() => {
    // ON INITIALISE LES VARIABLES DE NOTRE POKEMON
    setOurHealth(ourMob[numOurPokemon].PV["current"]);
    setOurMaxHealth(ourMob[numOurPokemon].PV["max"]);
    setOurAttack(ourMob[numOurPokemon].attack);
    setOurDefense(ourMob[numOurPokemon].defense);
    setOurSpeed(ourMob[numOurPokemon].speed);
    setOurLevel(ourMob[numOurPokemon].lvl);
    setOurName(ourMob[numOurPokemon].label);
    setSrcOurPokemon(ourMob[numOurPokemon].img);
    setOurType(ourMob[numOurPokemon].type);

    // On remet la variable de définition de la modal Pokemon sur false
    setModalDisplayForChange(false);

    // ON VERIFIE L'INITIALISATION DE NOS VARIABLES
    if (ourName) {
      // Animation de départ
      setTimeout(() => {
        updateTextBox(`En avant ${ourName} !`);
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
          : updateTextBox(`Que dois faire ${ourName}?`);
      }, 4000);
    }
  }, [ourName, numOurPokemon]);

  // Fonction d'attaque par l'ADVERSAIRE
  const attackByAdv = function (effectItem) {
    // On choisit une attaque au hasard dans les capacités du Pokémon
    let numAdvAttack = Math.round(
      Math.random() * (advMob[0].capacities.length - 1)
    );

    let nameAdvAttack = advMob[numAdvPokemon].capacities[numAdvAttack].name;
    let powerAdvAttack = advMob[numAdvPokemon].capacities[numAdvAttack].power;
    let typeAdvAttack = advMob[numAdvPokemon].capacities[numAdvAttack].type;

    // Appel de la fonction : Calcul dégats et définition du texte
    let result = CalculateDamage(
      advName,
      advLevel,
      advAttack,
      nameAdvAttack,
      powerAdvAttack,
      typeAdvAttack,
      ourDefense,
      ourType,
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
        ? (setAdvAnimation(advAnimation + 1),
          playSoundAttack(),
          Vibration.vibrate(2),
          setTimeout(() => {
            setOurHealth((ourHealth) => ourHealth - damage);
            updateTextBox(text);
            setHiddenButtonOfMenu(false);
          }, 300))
        : (setAdvAnimation(advAnimation + 1),
          playSoundAttack(),
          Vibration.vibrate(2),
          setTimeout(() => {
            updateTextBox(text);
            maybeDefeatForUs();
          }, 300));
    }, 1000);
  };

  // Fonction d'attaque par NOUS
  function attackByOur(nameOurAttack, powerOurAttack, typeOurAttack) {
    // Desactivation bouton Attaquer
    setHiddenButtonOfMenu(true);

    // Appel de la fonction : Calcul dégats et définition du texte
    let result = CalculateDamage(
      ourName,
      ourLevel,
      ourAttack,
      nameOurAttack,
      powerOurAttack,
      typeOurAttack,
      advDefense,
      advType,
      advName
    );

    // On récupére les résultats de la fonction
    let damage = result[0];
    let text = result[1];

    // On réaffecte les différentes variables
    setOurAnimation(ourAnimation + 1);
    Vibration.vibrate(2);
    playSoundAttack();

    setTimeout(() => {
      setAdvHealth((advHealth) => advHealth - damage);
      updateTextBox(text);
      setHiddenButtonOfMenu(true);
      advHealth - damage <= 0 ? victoryForUs() : attackByAdv();
    }, 300);
  }

  // Fonction utilisation ITEM
  function useItem(indexPokemon) {
    // On cache les boutons du Menu
    setHiddenButtonOfMenu(true);

    // On enleve une quantité de l'objet dans notre inventaire
    item[indexItem].qty--;

    // On supprime l'objet de notre inventaire si quantité = 0
    let qty = item[indexItem].qty;
    qty == 0 ? item.splice(indexItem, 1) : null;

    // On applique l'effet de l'Item pour pokémon vivants (potions)
    // Si c'est le pokémon en jeu
    if (needAlive) {
      if (indexPokemon == numOurPokemon) {
        if (ourHealth + effectItem > ourMaxHealth) {
          setOurHealth(ourMaxHealth);
        } else {
          setOurHealth((ourHealth) => ourHealth + effectItem);
        }
        updateTextBox(`${nameItem} vous redonne ${effectItem} PV`);
        attackByAdv(effectItem);
        // Si un autre pokémon
      } else {
        if (
          ourMob[indexPokemon].PV["current"] + effectItem >=
          ourMob[indexPokemon].PV["max"]
        ) {
          ourMob[indexPokemon].PV["current"] = ourMob[indexPokemon].PV["max"];
        } else {
          ourMob[indexPokemon].PV["current"] =
            ourMob[indexPokemon].PV["current"] + effectItem;
        }
        updateTextBox(
          `${nameItem} redonne ${effectItem} PV à ${ourMob[indexPokemon].label}`
        );
        attackByAdv();
      }
      // On applique l'effet de l'Item pour pokémon morts (potions)
    } else {
      ourMob[indexPokemon].PV["current"] = parseInt(
        ourMob[indexPokemon].PV["max"] * (effectItem / 100)
      );
      updateTextBox(`${nameItem} redonne vie à ${ourMob[indexPokemon].label}`);
      attackByAdv();
    }

    // On remet les variable de définition de la modal Pokemon sur false
    setNeedAlive(false);
    setModalDisplayPokemonAlive(false);
    setModalDisplayPokemonDead(false);
  }

  // Fonction changement de Pokemon
  function changeOurPokemon(index) {
    // On met la variable de définition de la modal Pokemon sur true
    setModalDisplayForChange(true);

    // On ré-affiche le bouton RETOUR dans la modal Pokemon
    setHiddenButonRetour(false);

    // On affecte la vie actuelle à notre Pokemon
    ourMob[numOurPokemon].PV["current"] = ourHealth;

    // On rappelle notre Pokémon
    setShowOurPokemon(false);
    setShowTrainer(true);

    // MaJ TextBox
    if (ourHealth != 0) {
      updateTextBox(`${ourName} reviens !`);
    }

    // On change de Pokémon et on rappelle le UseEffect
    setNumOurPokemon(index);

    // On remet en undefined la variable ourName pour vérification au départ
    setOurName();
  }

  // Fonction de MAJ de la TextBox
  function updateTextBox(text) {
    textBox.unshift(text);
    // MAJ d'une variable inutile pour MAJ affichage
    setMajTextBox(Math.random());
  }

  // Fonction VICTOIRE
  function victoryForUs() {
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
  }

  // Fonction DEFAITE
  function maybeDefeatForUs(test) {
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
      ourMob[numOurPokemon].PV["current"] = 0;
      updateTextBox(`${ourName} est KO`);
      setTimeout(() => {
        setModalDisplayForChange(true);
        setShowModalPokemon(true);
      }, 2000);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewTopPage}>
        <ImageBackground source={srcBackground} style={styles.imageBackGround}>
          {/* HealthBar Adverse + Affichage Pokemon + Vie Pokemon sauvage*/}
          <View style={styles.viewPokemon}>
            <View style={styles.viewPokemonAdv}>
              {showPokemonAdv && (
                <Shake value={advAnimation} type="timing">
                  <View style={styles.viewHealthBarAdv}>
                    <HealthBar
                      //styleHealthBar={styles.advHealthBar}
                      progressHealthBar={advHealth / advMaxHealth}
                      colorHealthBar={ColorHealthBar(advHealth / advMaxHealth)}
                      widthHealthBar={100}
                      heigthHealthBar={10}
                      unfilledColorHealthBar={"#FFCC03"}
                    />
                    <Text style={styles.advHealth}>
                      {advHealth} / {advMaxHealth}
                    </Text>
                  </View>
                  <View style={styles.viewImageAdv}>
                    <Image
                      style={styles.imgAdvPokemon}
                      source={srcAdvPokemon}
                    />
                  </View>
                </Shake>
              )}
            </View>
            <View style={styles.viewOurPokemon}>
              {/* Gestion affichage Pokemon */}
              {showOurPokemon && (
                <Shake value={ourAnimation} type="timing">
                  <Image style={styles.imgOurPokemon} source={srcOurPokemon} />
                </Shake>
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.viewBottomPage}>
        <View style={styles.viewOurHealthBar}>
          {/* Notre HealthBar */}
          <HealthBar
            // styleHealthBar={styles....}
            progressHealthBar={ourHealth / ourMaxHealth}
            colorHealthBar={ColorHealthBar(ourHealth / ourMaxHealth)}
            widthHealthBar={0.39 * windowHeight}
            heigthHealthBar={0.06 * windowWidth}
            unfilledColorHealthBar={"#1F0F42"}
          />
          {/* Affichage Notre Vie */}
          <Text style={styles.ourHealth}>
            {ourHealth} / {ourMaxHealth}
          </Text>
        </View>

        <View style={styles.viewTextAndButton}>
          <View style={styles.viewText}>
            {/* TextBox */}
            <View>
              <ScrollView style={styles.scrollView}>
                {textBox.map((ligne) => {
                  return <Text style={styles.lineOfTextBox}>● {ligne}</Text>;
                })}
              </ScrollView>
            </View>
          </View>

          {/* Bouttons */}
          <View style={styles.viewButton}>
            <Pressable
              disabled={disabledButtonOfMenu}
              style={styles.button}
              onPress={() => setShowModalAttack(!showModalAttack)}
            >
              <Text style={styles.textButton}>ATTAQUER</Text>
            </Pressable>
            <Pressable
              disabled={disabledButtonOfMenu}
              style={styles.button}
              onPress={() => setShowModalBag(!showModalBag)}
            >
              <Text style={styles.textButton}>SAC</Text>
            </Pressable>
            <Pressable
              disabled={disabledButtonOfMenu}
              style={styles.button}
              onPress={() => {
                setShowModalPokemon(!showModalPokemon);
                setModalDisplayForChange(true);
              }}
            >
              <Text style={styles.textButton}>POKéMON</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* Modal affichage dresseur */}
      <Modal animationType="slide" visible={showTrainer} transparent={true}>
        <Image style={styles.imgTrainer} source={srcTrainer} />
      </Modal>
      {/* Modal pour les attaques */}
      <Modal
        animationType="slide"
        bottom={0}
        visible={showModalAttack}
        transparent={true}
        onRequestClose={() => setShowModalAttack(!showModalAttack)}
      >
        <View style={styles.modalView}>
          <ScrollView style={styles.scrollView}>
            {ourMob[numOurPokemon].capacities.map((el) => {
              return (
                <Pressable
                  style={styles.buttonModal}
                  onPress={() => {
                    attackByOur(el.name, el.power, el.type),
                      setShowModalAttack(!showModalAttack);
                  }}
                >
                  <Text style={styles.textButton}>{el.name}</Text>
                </Pressable>
              );
            })}
            <Pressable
              style={styles.buttonModal}
              onPress={() => {
                setShowModalAttack(!showModalAttack);
              }}
            >
              <Text style={styles.textButton}>RETOUR</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
      {/* Modal pour les objets */}
      <Modal
        animationType="slide"
        visible={showModalBag}
        transparent={true}
        onRequestClose={() => setShowModalBag(!showModalBag)}
      >
        <View style={styles.modalView}>
          <ScrollView style={styles.scrollView}>
            {item.map((el, index) => {
              return (
                <Pressable
                  style={styles.buttonModal}
                  onPress={() => {
                    setNameItem(el.name);
                    setEffectItem(el.effect);
                    setIndexItem(index);
                    setNeedAlive(el.needAlive);
                    el.needAlive
                      ? setModalDisplayPokemonAlive(() => true)
                      : setModalDisplayPokemonDead(() => true);
                    setShowModalBag(!showModalBag);
                    setShowModalPokemon(true);
                  }}
                >
                  {el.needAlive && (
                    <Text style={styles.textButton}>
                      {el.name} (+{el.effect}PV) x{el.qty}
                    </Text>
                  )}
                  {!el.needAlive && (
                    <Text style={styles.textButton}>
                      {el.name} ({el.effect}% PV MAX) x{el.qty}
                    </Text>
                  )}
                </Pressable>
              );
            })}
            <Pressable
              style={styles.buttonModal}
              onPress={() => {
                setShowModalBag(!showModalBag);
              }}
            >
              <Text style={styles.textButton}>RETOUR</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal pour les Pokemon */}
      <Modal
        animationType="slide"
        visible={showModalPokemon}
        transparent={true}
        onRequestClose={() => setShowModalPokemon(!showModalPokemon)}
      >
        <View style={styles.modalView}>
          <ScrollView style={styles.scrollView}>
            {ourMob.map((el, index) => {
              {
                /* Affichage pour le changement de Pokemon */
              }
              if (modalDisplayForChange) {
                if (el.PV["current"] != 0 && index != numOurPokemon) {
                  return (
                    <Pressable
                      style={styles.buttonModal}
                      onPress={() => {
                        changeOurPokemon(index);
                        setShowModalPokemon(!showModalPokemon);
                      }}
                    >
                      <Text style={styles.textButton}>
                        {el.label} - {el.PV["current"]}/{el.PV["max"]}
                        PV
                      </Text>
                    </Pressable>
                  );
                }
              }
              {
                /* Affichage pour utilisation item sur Pokemon Vivants */
              }
              if (modalDisplayPokemonAlive) {
                if (el.PV["current"] != 0) {
                  return (
                    <Pressable
                      style={styles.buttonModal}
                      onPress={() => {
                        useItem(index);
                        setShowModalPokemon(!showModalPokemon);
                      }}
                    >
                      {index != numOurPokemon && (
                        <Text style={styles.textButton}>
                          {el.label} - {el.PV["current"]}/{el.PV["max"]}
                          PV
                        </Text>
                      )}
                      {index == numOurPokemon && (
                        <Text style={styles.textButton}>{el.label}</Text>
                      )}
                    </Pressable>
                  );
                }
              }
              {
                /* Affichage pour utilisation item sur Pokemon Morts */
              }
              if (modalDisplayPokemonDead) {
                if (el.PV["current"] == 0) {
                  return (
                    <Pressable
                      style={styles.buttonModal}
                      onPress={() => {
                        useItem(index);
                        setShowModalPokemon(!showModalPokemon);
                      }}
                    >
                      <Text style={styles.textButton}>
                        {el.label} - {el.PV["current"]}/{el.PV["max"]}
                        PV
                      </Text>
                    </Pressable>
                  );
                }
              }
            })}
            {!hiddenButtonRetour && (
              <Pressable
                style={styles.buttonModal}
                onPress={() => {
                  {
                    playSoundBackGround;
                  }
                  setShowModalPokemon(!showModalPokemon);
                  setHiddenButtonOfMenu(() => false);
                  setModalDisplayPokemonAlive(() => false);
                  setModalDisplayPokemonDead(() => false);
                  setModalDisplayForChange(() => false);
                }}
              >
                <Text style={styles.textButton}>RETOUR</Text>
              </Pressable>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
