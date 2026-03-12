/**
 * combat.js — Fórmulas e resolução de combate físico.
 *
 * Fórmula (MSAT):
 *   dano físico = (ATQ do atacante + ATQ da arma) − DEF do alvo
 *   dano mínimo = 1
 *
 * Por enquanto não há armas equipadas, então weaponAtq = 0.
 */

/**
 * Calcula e aplica dano físico de `attacker` em `defender`.
 *
 * @param {{ atq: number, weaponAtq?: number }} attacker
 * @param {{ def: number, takeDamage: Function }} defender
 * @returns {number} dano aplicado
 */
export function physicalAttack(attacker, defender) {
  const weaponAtq = attacker.weaponAtq ?? 0;
  const damage    = Math.max(1, (attacker.atq + weaponAtq) - defender.def);

  defender.takeDamage(damage);

  return damage;
}