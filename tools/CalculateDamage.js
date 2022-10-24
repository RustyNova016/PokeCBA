export function CalculateDamage(
  levelOfAttacker,
  attackOfAttacker,
  nameOfAttack,
  powerOfAttack,
  defenseOfDefender,
  nameOfDefender
) {
  let damage = 0;

  damage = parseInt(
    ((levelOfAttacker * 0.4 + 2) * attackOfAttacker * powerOfAttack) /
      (defenseOfDefender * 25) +
      2
  );

  // On initialise le texte
  let text = `Attaque ${nameOfAttack} ! Elle inflige ${damage} de dégats`;

  // Calcul de la chance
  let luckyOrNot = Math.random() * (100 - 1) + 1;

  // On modifie le texte et les dommages en fonction de la chance
  if (luckyOrNot < 10) {
    damage = 0;
    text = `${nameOfDefender} esquive l'attaque !`;
  } else if (luckyOrNot > 90) {
    damage *= 2;
    text = `Coup Critique ! ${nameOfAttack} inflige ${damage} de dégats`;
  }

  return [damage, text];
}
