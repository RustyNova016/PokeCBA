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

  // On modifie le texte et les dommages en fonction du type de l'attaque et du type du défenseur
  if (typeOfAttack.strongAgainst.indexOf(typeOfDefender[0].idType) != -1) {
    damage *= 2;
    text = `C'est super efficace ! ${nameOfAttack} inflige ${damage} de dégats`;
  } else if (typeOfAttack.weakAgainst.indexOf(typeOfDefender[0].idType) != -1) {
    damage = parseInt(damage * 0.5);
    text = `Pas très efficace ! ${nameOfAttack} inflige ${damage} de dégats`;
  } else if (typeOfAttack.immune.indexOf(typeOfDefender[0].idType) != -1) {
    damage *= 0;
    text = `${nameOfAttack} n'a aucun effet ...`;
  } else {
    text = `Attaque ${nameOfAttack} ! Elle inflige ${damage} de dégats`;
  }

  // Calcul de la chance
  let luckyOrNot = Math.random() * (100 - 1) + 1;

  // On modifie le texte et les dommages en fonction de la chance sauf si le pokémon defenseur est immunisé

  if (damage != 0) {
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
