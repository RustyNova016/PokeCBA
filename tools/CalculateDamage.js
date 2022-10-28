export function CalculateDamage(
  levelOfAttacker,
  attackOfAttacker,
  nameOfAttack,
  powerOfAttack,
  typeOfAttack,
  defenseOfDefender,
  typeOfDefender,
  nameOfDefender
) {
  let text = "";

  // Calcul des dommages
  let damage = parseInt(
    ((levelOfAttacker * 0.4 + 2) * attackOfAttacker * powerOfAttack) /
      (defenseOfDefender * 50) +
      2
  );

  // On garde en mémoire les dommages initiaux
  let initialDamage = damage;

  // On modifie les dommages en fonction du type de l'attaque et du type du défenseur
  for (let i = 0; i < typeOfDefender.length; i++) {
    if (typeOfAttack.strongAgainst.indexOf(typeOfDefender[i].idType) != -1) {
      damage *= 2;
    } else if (
      typeOfAttack.weakAgainst.indexOf(typeOfDefender[i].idType) != -1
    ) {
      damage = parseInt(damage * 0.5);
    } else if (typeOfAttack.immune.indexOf(typeOfDefender[i].idType) != -1) {
      damage *= 0;
    }
  }

  // On modifie le texte en fonction des dégats finals
  if (damage > initialDamage) {
    text = `C'est super efficace ! ${nameOfAttack} inflige ${damage} de dégats`;
  } else if (damage == initialDamage) {
    text = `Attaque ${nameOfAttack} ! Elle inflige ${damage} de dégats`;
  } else if (damage == 0) {
    text = `${nameOfAttack} n'a aucun effet ...`;
  } else if (damage < initialDamage) {
    text = `Pas très efficace ! ${nameOfAttack} inflige ${damage} de dégats`;
  }



  // On modifie le texte et les dommages en fonction de la chance sauf si le pokémon defenseur est immunisé ou peu sensible
  if (damage >= initialDamage) {
    // Calcul de la chance
    let luckyOrNot = Math.random() * (100 - 1) + 1;

    // En fonction de la chance, le pokémon adverse esquive ou l'attaque devient critique
    if (luckyOrNot < 5) {
      damage = 0;
      text = `${nameOfDefender} esquive l'attaque !`;
    } else if (luckyOrNot > 95) {
      damage *= parseInt((2 * levelOfAttacker + 5) / (levelOfAttacker + 5));
      text = `Coup Critique ! ${nameOfAttack} inflige ${damage} de dégats`;
    }
  }

  // On retourne les résultats
  return [damage, text];
}
