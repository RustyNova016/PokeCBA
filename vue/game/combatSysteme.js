import React, { useState, useEffect } from "react";
import HealthBar from "../../components/HealthBar";
import styles from '../../CSS.js'

import {
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";

export default function combatSysteme({ navigation, route }) {
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
    },
    {
      id_model: 2,
      label: "Carapuce",
      PV: { current: 44, max: 44 },
      attack: 48,
      defense: 65,
      speed: 43,
      lvl: 1,
      xp: { current: 1, max: 10000 },
      type: ["water"],
    },
  ];

  // VARIABLES POUR LES IMAGES

  const [srcBackground, setSrcBackground] = useState(
    require("../../images/COMBAT.png")
  );
  const [srcDresseur, setSrcDresseur] = useState(
    require("../../images/DRESSEUR.png")
  );

  // AFFICHAGE DES IMAGES DE BASE

  const [showDressor, setShowDressor] = useState(true);
  const [showPokemon, setShowPokemon] = useState(false);
  const [showPokemonAdv, setShowPokemonAdv] = useState(true);

  // VARIABLES POUR LES POKEMONS

  // NOTRE POKEMON

  const [numPoke, setNumPoke] = useState(0);

  const [usHealth, setUsHealth] = useState(mob[numPoke].PV["current"]);
  const [usMaxHealth, setUsMaxHealth] = useState(mob[numPoke].PV["current"]);
  const [usAttack, setUsAttack] = useState(mob[numPoke].attack);
  const [usDefense, setUsDefense] = useState(mob[numPoke].defense);
  const [usSpeed, setUsSpeed] = useState(mob[numPoke].speed);
  const [usLevel, setUsLevel] = useState(mob[numPoke].lvl);
  const [usName, setUsName] = useState(mob[numPoke].label);
  const [srcUsPokemon, setSrcUsPokemon] = useState(
    require("../../images/SALAMECHE.png")
  );

  //  POKEMON ADVERSE

  const [advHealth, setAdvHealth] = useState(mob[2].PV["current"]);
  const [advMaxHealth] = useState(mob[2].PV["current"]);
  const [advAttack, setAdvAttack] = useState(mob[2].attack);
  const [advDefense, setAdvDefense] = useState(mob[2].defense);
  const [advSpeed, setAdvSpeed] = useState(mob[2].speed);
  const [advLevel, setAdvLevel] = useState(mob[2].lvl);
  const [advName, setAdvName] = useState(mob[2].label);
  const [srcAdvPokemon] = useState(require(`../../images/CARAPUCE.png`));

  // VARIABLE TEXT BOX

  const [textBox, setTextBox] = useState([`Un ${advName} sauvage apparait`]);

  // VARIABLES DIVERSES

  const [usHealthBar, setUsHealthBar] = useState(1);
  const [colorUsHealthBar, setColorUsHealthBar] = useState("green");

  const [advHealthBar, setAdvHealthBar] = useState(1);
  const [colorAdvHealthBar, setColorAdvHealthBar] = useState("green");

  const [hiddenButtonAttaquer, setHiddenButtonAttaquer] = useState(true);

  // VARIABLE INUTILE POUR MAJ AFFICHAGE
  const [maj, setMaj] = useState(0);

  useEffect(() => {
    // ON INITIALISE LES VARIABLES DE NOTRE POKEMON

    setUsHealth(mob[numPoke].PV["max"]);
    setUsMaxHealth(mob[numPoke].PV["max"]);
    setUsAttack(mob[numPoke].attack);
    setUsDefense(mob[numPoke].defense);
    setUsSpeed(mob[numPoke].speed);
    setUsLevel(mob[numPoke].lvl);
    setUsName(mob[numPoke].label);

    // Animation de départ
    setTimeout(() => {
      updateText(`${mob[numPoke].label} GO !`);

      setShowDressor(false);
      setShowPokemon(true);
      setColorUsHealthBar("green");
      setUsHealthBar(1);
    }, 3000);

    // Test de vitesse pour savoir qui attaque en premier
    setTimeout(() => {
      setHiddenButtonAttaquer(false);

      mob[numPoke].speed < advSpeed
        ? (updateText(`${advName} est rapide, il attaque en premier`),
          setHiddenButtonAttaquer(true),
          AttackByAdv())
        : null;
    }, 4000);
  }, [numPoke]);

  // Fonction d'attaque par l'ADVERSAIRE
  const AttackByAdv = function () {
    setTimeout(() => {
      // Re Activation du bouton Attaquer
      setHiddenButtonAttaquer(false);

      // Calcul dégats
      let degats = 0;
      degats = parseInt(((advLevel * 0.4 + 2) * advAttack) / usDefense + 2);

      // Calcul de la chance
      let luckyOrNot = Math.random() * (100 - 1) + 1;

      // Application des dégats
      if (luckyOrNot <= 10) {
        (degats = 0),
          updateText(`${usName} esquive l'attaque !`),
          setUsHealth(usHealth - degats);
      } else if (luckyOrNot <= 90) {
        usHealth - degats <= 0
          ? defaite()
          : (setUsHealth(usHealth - degats),
            updateText(`${advName} attaque et inflige ${degats} de dégats`));
      } else {
        degats *= 2;
        usHealth - degats <= 0
          ? defaite()
          : (setUsHealth(usHealth - degats),
            updateText(
              `Coup Critique ! ${advName} inflige ${degats} de dégats`
            ));
      }

      // MAJ LifeBar

      updateUsHealthBar(degats);
    }, 1000);
  };

  // Fonction d'attaque par NOUS
  const AttackByUs = function () {
    // Desactivation bouton Attaquer
    setHiddenButtonAttaquer(true);

    // Calcul dégats
    let degats = 0;
    degats = parseInt(((usLevel * 0.4 + 2) * usAttack) / advDefense + 2);

    // Calcul de chance
    let luckyOrNot = Math.random() * (100 - 1) + 1;

    // Application des dégats
    if (luckyOrNot <= 10) {
      (degats = 0),
        updateText(`${advName} esquive l'attaque !`),
        setAdvHealth(advHealth - degats),
        AttackByAdv();
    } else if (luckyOrNot <= 90) {
      advHealth - degats <= 0
        ? victoire()
        : (setAdvHealth(advHealth - degats),
          updateText(`${usName} attaque et inflige ${degats} de dégats`),
          AttackByAdv());
    } else {
      degats *= 2;
      advHealth - degats <= 0
        ? victoire()
        : (setAdvHealth(advHealth - degats),
          updateText(`Coup Critique ! ${usName} inflige ${degats} de dégats`),
          AttackByAdv());
    }

    // MAJ LifeBar
    updateAdvHealthBar(degats);
  };

  // Fonction MAJ de notre HealthBar
  const updateUsHealthBar = function (a) {
    // Longueur
    setUsHealthBar(usHealthBar - a / usMaxHealth);

    // Couleur
    if (usHealthBar > 0.75) {
      setColorUsHealthBar("green");
    } else if (usHealthBar <= 0.25) {
      setColorUsHealthBar("red");
    } else if (usHealthBar <= 0.5) {
      setColorUsHealthBar("orange");
    } else if (usHealthBar <= 0.75) {
      setColorUsHealthBar("yellow");
    }
  };

  // Fonction MAJ HealthBar Adverse
  const updateAdvHealthBar = function (a) {
    // Longueur
    setAdvHealthBar(advHealthBar - a / advMaxHealth);

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
    if (textBox.length > 14) {
      textBox.length = 14;
    }
    // MAJ d'une variable inutile pour MAJ affichage
    setMaj(Math.random()); 
  };

  // Fonction VICTOIRE
  const victoire = function () {
    setAdvHealth(0);
    updateText(`${advName} est KO, VICTOIRE`);
    setShowPokemonAdv(false);
    setHiddenButtonAttaquer(true);
    setTimeout(() => {
      // VERS PAGE VICTOIRE
      navigation.navigate("victoire");
    }, 1000);
  };

  // Fonction DEFAITE
  const defaite = function () {
    setUsHealth(0);
    setHiddenButtonAttaquer(true);
    setShowPokemon(false);
    if (numPoke == 1) {
      setTimeout(() => {
        navigation.navigate("defaite");
      }, 2000);
    } else {
      setNumPoke(numPoke + 1);
      setSrcUsPokemon(require("../../images/PIKACHU.png"));
      setTimeout(() => {
        updateText(`${usName} est KO`);
        setShowDressor(true);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={srcBackground} style={styles.imageBG}>
        {/* HealthBar Adverse + Affichage Pokemon + Vie Pokemon sauvage*/}
        {showPokemonAdv && (
          <View>
            <HealthBar
              styleHealthBar={styles.advHealthBar}
              progressHealthBar={advHealthBar}
              colorHealthBar={colorAdvHealthBar}
              widthHealthBar={100}
              heigthHealthBar={10}
            />
            <Image style={styles.imgAdvPOKEMON} source={srcAdvPokemon} />
            <Text style={styles.advHealth}>{advHealth} /</Text>
            <Text style={styles.advMaxHealth}>{advMaxHealth}</Text>
          </View>
        )}

        {/* Gestion affichage dresseur */}
        {showDressor && (
          <Image style={styles.imgDRESSOR} source={srcDresseur} />
        )}

        {/* Gestion affichage Pokemon */}
        {showPokemon && (
          <View>
            <Image style={styles.imgUsPOKEMON} source={srcUsPokemon} />
          </View>
        )}

        {/* TextBox */}
        <View style={styles.textBox}>
          {textBox.map((ligne) => {
            return <Text>- {ligne}</Text>;
          })}
        </View>

        {/* Boutton ATTAQUER */}
        {!hiddenButtonAttaquer && (
          <Pressable style={styles.buttonAttaquer} onPress={() => AttackByUs()}>
            <Text>ATTAQUER</Text>
          </Pressable>
        )}

        {/* Notre HealthBar */}
        <HealthBar
          styleHealthBar={styles.usHealthBar}
          progressHealthBar={usHealthBar}
          colorHealthBar={colorUsHealthBar}
          widthHealthBar={362}
          heigthHealthBar={24}
        />

        {/* Affichage Notre Vie */}
        <Text style={styles.usHealth}>{usHealth}</Text>
        <Text style={styles.usMaxHealth}>{usMaxHealth}</Text>
      </ImageBackground>
    </View>
  );
}


