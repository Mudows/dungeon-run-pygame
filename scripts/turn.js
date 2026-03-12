/**
 * TurnManager — gerencia o ciclo de turnos do jogo.
 *
 * Fluxo por turno:
 *   1. Jogador tenta uma ação
 *   2. Se a ação for válida (retorna true), o turno avança
 *   3. Cada inimigo registrado executa sua ação
 *   4. Turno encerra — aguarda próxima ação do jogador
 */
export class TurnManager {
  constructor() {
    /** @type {Entity[]} Lista de inimigos — ordem define prioridade de ação */
    this.enemies = [];

    /** Número do turno atual (começa em 1) */
    this.turn = 1;

    /** Callbacks opcionais para observar eventos do turno */
    this._onTurnStart = null;
    this._onTurnEnd   = null;
  }

  // ---------------------------------------------------------------------------
  // Registro de entidades
  // ---------------------------------------------------------------------------

  /**
   * Registra um inimigo no sistema de turnos.
   * @param {Entity} enemy - objeto com método act(map, grid, player)
   */
  addEnemy(enemy) {
    this.enemies.push(enemy);
  }

  /**
   * Remove um inimigo da lista (ex: ao morrer).
   * @param {Entity} enemy
   */
  removeEnemy(enemy) {
    this.enemies = this.enemies.filter((e) => e !== enemy);
  }

  // ---------------------------------------------------------------------------
  // Callbacks
  // ---------------------------------------------------------------------------

  /** Define função chamada no início de cada turno */
  onTurnStart(fn) { this._onTurnStart = fn; }

  /** Define função chamada no fim de cada turno */
  onTurnEnd(fn)   { this._onTurnEnd   = fn; }

  // ---------------------------------------------------------------------------
  // Ciclo principal
  // ---------------------------------------------------------------------------

  /**
   * Tenta executar uma ação do jogador.
   * Se a ação for bem-sucedida, processa o turno dos inimigos.
   *
   * @param {Function} playerAction - função que executa a ação e retorna boolean
   * @param {GameMap}  map
   * @param {Grid}     grid
   * @param {object}   player       - instância do jogador
   * @returns {boolean} true se o turno avançou
   */
  playerAct(playerAction, map, grid, player) {
    // Executa a ação do jogador
    const success = playerAction();

    // Turno só avança se a ação foi válida
    if (!success) return false;

    this._onTurnStart?.(this.turn);

    // Cada inimigo age na ordem em que foi registrado
    for (const enemy of this.enemies) {
      if (!enemy.isDead?.()) {
        enemy.act(map, grid, player);
      }
    }

    this._onTurnEnd?.(this.turn);
    this.turn++;

    return true;
  }
}

/**
 * Classe base para inimigos.
 * Estenda esta classe para implementar comportamentos específicos.
 *
 * Por enquanto os inimigos ficam parados — o método act() é um stub
 * pronto para receber lógica de IA na próxima etapa.
 */
export class Enemy {
  /**
   * @param {number} gridX - posição inicial em tiles (X)
   * @param {number} gridY - posição inicial em tiles (Y)
   * @param {Grid}   grid  - referência ao sistema de grid
   */
  constructor(gridX, gridY, grid) {
    const pixel = grid.toPixel(gridX, gridY);
    this.x    = pixel.x;
    this.y    = pixel.y;
    this.hp   = 10;
    this.dead = false;
  }

  /**
   * Ação do inimigo por turno.
   * Recebe o estado do mundo para que subclasses possam tomar decisões.
   *
   * @param {GameMap} map
   * @param {Grid}    grid
   * @param {object}  player
   */
  act(map, grid, player) {
    // Stub — inimigo fica parado por enquanto.
    // Próximos passos: movimento aleatório, perseguição, ataque.
  }

  isDead() {
    return this.dead;
  }
}