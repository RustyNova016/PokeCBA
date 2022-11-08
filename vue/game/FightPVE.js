import React, { useState, useEffect } from "react";

import HealthBar from "../../components/HealthBar/HealthBar";
import { CalculateDamage } from "../../tools/CalculateDamage.js";
import { ColorHealthBar } from "../../tools/ColorHealthBar";
import { StyleSheet } from "react-native";
import { Shake } from "react-native-motion";

import { advMob } from "../../classes/advMob";
import { ourMob } from "../../classes/ourMob";
import { item } from "../../classes/item";

import * as constClass from "../../Constants.js";

import {
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  Modal,
} from "react-native";

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
  const [hiddenButtonOfMenu, setHiddenButtonOfMenu] = useState(true);
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
          setTimeout(() => {
            setOurHealth((ourHealth) => ourHealth - damage);
            updateTextBox(text);
            setHiddenButtonOfMenu(false);
          }, 300))
        : (setAdvAnimation(advAnimation + 1),
          setTimeout(() => {
            updateTextBox(text);
            maybeDefeatForUs();
          }, 300));
    }, 1000);
  };

  // Fonction d'attaque par NOUS
  const attackByOur = function (nameOurAttack, powerOurAttack, typeOurAttack) {
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

    setTimeout(() => {
      setAdvHealth((advHealth) => advHealth - damage);
      updateTextBox(text);
      setHiddenButtonOfMenu(true);
      advHealth - damage <= 0 ? victoryForUs() : attackByAdv();
    }, 300);
  };

  // Fonction utilisation ITEM
  const useItem = function (indexPokemon) {
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
  };

  // Fonction changement de Pokemon
  const changeOurPokemon = function (index) {
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
      ourMob[numOurPokemon].PV["current"] = 0;
      updateTextBox(`${ourName} est KO`);
      setTimeout(() => {
        setModalDisplayForChange(true);
        setShowModalPokemon(true);
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={srcBackground} style={styles.imageBackGround}>
        <View style={styles.viewTopPage}></View>
        <View style={styles.viewBottomPage}>
          <View style={styles.viewOurHealthBar}></View>
          <View style={styles.viewTextAndButton}>
            <View style={styles.viewText}></View>
            <View style={styles.viewButton}></View>
          </View>
        </View>

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
              onPress={() => {
                setShowModalPokemon(!showModalPokemon);
                setModalDisplayForChange(true);
              }}
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
              {ourMob[numOurPokemon].capacities.map((el) => {
                return (
                  <Pressable
                    style={styles.buttonModal}
                    onPress={() => {
                      attackByOur(el.name, el.power, el.type),
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
                      <Text style={styles.textModal}>
                        {el.name} (+{el.effect}PV) x{el.qty}
                      </Text>
                    )}
                    {!el.needAlive && (
                      <Text style={styles.textModal}>
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
                        <Text style={styles.textModal}>
                          {el.label} - {el.PV["current"]}/{el.PV["max"]}PV
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
                          <Text style={styles.textModal}>
                            {el.label} - {el.PV["current"]}/{el.PV["max"]}PV
                          </Text>
                        )}
                        {index == numOurPokemon && (
                          <Text style={styles.textModal}>{el.label}</Text>
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
                        <Text style={styles.textModal}>
                          {el.label} - {el.PV["current"]}/{el.PV["max"]}PV
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
                    setShowModalPokemon(!showModalPokemon);
                    setHiddenButtonOfMenu(() => false);
                    setModalDisplayPokemonAlive(() => false);
                    setModalDisplayPokemonDead(() => false);
                    setModalDisplayForChange(() => false);
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
    fontSize: 15,
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

  viewTopPage: {
    borderColor: "pink",
    borderWidth: 5,
    width: "100%",
    height: "69%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  viewBottomPage: {
    borderColor: "red",
    borderWidth: 5,
    width: "100%",
    height: "31%",
    position: "relative",
  },

  viewOurHealthBar: {
    borderColor: "green",
    borderWidth: 5,
    width: "100%",
    height: "17%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  viewText: {
    borderColor: "orange",
    borderWidth: 5,
    width: "66.5%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  viewButton: {
    borderColor: "white",
    borderWidth: 5,
    width: "33.5%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  viewTextAndButton: {
    flexDirection: "row",
    width: "100%",
    height: "84%",
    borderColor: "black",
    borderWidth: 5,
    position: "relative",
  },
});
