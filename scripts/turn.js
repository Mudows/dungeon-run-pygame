/**
 * TurnManager — gerencia o ciclo de turnos do jogo.
 *
 * Fluxo por turno:
 *   1. Jogador tenta uma ação
 *   2. Se a ação for válida (retorna true), o turno avança
 *   3. Cada inimigo registrado executa sua ação na ordem da lista
 *   4. Turno encerra — aguarda próxima ação do jogador
 */
export class TurnManager {
  constructor() {
    /** @type {Enemy[]} */
    this.enemies = [];
    this.turn = 1;

    this._onTurnStart = null;
    this._onTurnEnd   = null;
  }

  // ---------------------------------------------------------------------------
  // Registro
  // ---------------------------------------------------------------------------

  addEnemy(enemy)    { this.enemies.push(enemy); }
  removeEnemy(enemy) { this.enemies = this.enemies.filter((e) => e !== enemy); }

  onTurnStart(fn) { this._onTurnStart = fn; }
  onTurnEnd(fn)   { this._onTurnEnd   = fn; }

  // ---------------------------------------------------------------------------
  // Ciclo principal
  // ---------------------------------------------------------------------------

  /**
   * Tenta executar uma ação do jogador.
   * Só avança o turno se a ação for bem-sucedida.
   *
   * @param {Function} playerAction - executa a ação, retorna boolean
   * @param {GameMap}  map
   * @param {Grid}     grid
   * @param {object}   player
   * @returns {boolean}
   */
  playerAct(playerAction, map, grid, player) {
    const success = playerAction();
    if (!success) return false;

    this._onTurnStart?.(this.turn);

    for (const enemy of this.enemies) {
      if (!enemy.isDead()) {
        enemy.act(map, grid, player);
      }
    }

    this._onTurnEnd?.(this.turn);
    this.turn++;
    return true;
  }
}

// ---------------------------------------------------------------------------
// EnemyFactory — cria inimigos a partir dos dados do JSON
// ---------------------------------------------------------------------------

/**
 * Carrega uma família de inimigos e oferece spawn ponderado.
 *
 * Uso:
 *   const factory = new EnemyFactory(enemiesJson.families.goblins);
 *   const enemy   = factory.spawn(spawnX, spawnY, grid, runtime);
 */
export class EnemyFactory {
  /**
   * @param {{ name: string, members: EnemyData[] }} family
   */
  constructor(family) {
    this.familyName = family.name;
    this.members    = family.members;

    // Pré-calcula o total de pesos para o sorteio ponderado
    this._totalWeight = this.members.reduce((sum, m) => sum + m.spawnChance, 0);
  }

  /**
   * Sorteia um tipo de inimigo respeitando os pesos de spawnChance
   * e cria uma instância de Enemy com os stats correspondentes.
   *
   * @param {number}  gridX
   * @param {number}  gridY
   * @param {Grid}    grid
   * @param {object}  runtime  - runtime do Construct 3 (para criar o sprite)
   * @returns {Enemy}
   */
  spawn(gridX, gridY, grid, runtime) {
    const data     = this._weightedPick();
    const instance = this._createSprite(data.spriteName, gridX, gridY, grid, runtime);

    return new Enemy(gridX, gridY, grid, data, instance);
  }

  /**
   * Sorteia um membro da família pelo peso de spawnChance.
   * Ex: Goblin 70% e Goblin Guerreiro 30% → Goblin sai ~7 de cada 10 vezes.
   *
   * @returns {EnemyData}
   */
  _weightedPick() {
    let roll = Math.random() * this._totalWeight;

    for (const member of this.members) {
      roll -= member.spawnChance;
      if (roll <= 0) return member;
    }

    // Fallback (não deve ocorrer, mas garante retorno seguro)
    return this.members[this.members.length - 1];
  }

  /**
   * Cria o sprite do inimigo no Construct 3 e o posiciona no mundo.
   *
   * @param {string} spriteName - deve corresponder ao nome do objeto no C3
   * @param {number} gridX
   * @param {number} gridY
   * @param {Grid}   grid
   * @param {object} runtime
   * @returns {object|null} instância do C3, ou null se o objeto não existir
   */
  _createSprite(spriteName, gridX, gridY, grid, runtime) {
    const objectType = runtime.objects[spriteName];

    if (!objectType) {
      console.warn(`[EnemyFactory] Objeto "${spriteName}" não encontrado no projeto C3.`);
      return null;
    }

    const pixel    = grid.toPixel(gridX, gridY);
    const instance = objectType.createInstance('Game', pixel.x, pixel.y);

    return instance;
  }
}

// ---------------------------------------------------------------------------
// Enemy — entidade inimiga em jogo
// ---------------------------------------------------------------------------

/**
 * Representa um inimigo ativo no mundo.
 * Criado pela EnemyFactory com os dados do JSON.
 */
export class Enemy {
  /**
   * @param {number}      gridX
   * @param {number}      gridY
   * @param {Grid}        grid
   * @param {EnemyData}   data     - dados do JSON (id, name, stats, etc.)
   * @param {object|null} sprite   - instância do C3 (pode ser null em testes)
   */
  constructor(gridX, gridY, grid, data, sprite) {
    const pixel  = grid.toPixel(gridX, gridY);

    this.x       = pixel.x;
    this.y       = pixel.y;
    this.id      = data.id;
    this.name    = data.name;
    this.sprite  = sprite;

    // Stats carregados diretamente do JSON
    this.hp      = data.stats.hp;
    this.maxHp   = data.stats.hp;
    this.atq     = data.stats.atq;
    this.def     = data.stats.def;

    this._dead   = false;
  }

  /**
   * Ação do inimigo por turno.
   * Stub — fica parado por enquanto.
   * Próximos passos: movimento aleatório, perseguição, ataque adjacente.
   *
   * @param {GameMap} map
   * @param {Grid}    grid
   * @param {object}  player
   */
  act(map, grid, player) {
    // IA a implementar
  }

  isDead() { return this._dead; }

  /**
   * Aplica dano ao inimigo.
   * @param {number} amount
   */
  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    if (this.hp === 0) {
      this._dead = true;
      this.sprite?.destroy();
    }
  }
}

/**
 * @typedef {Object} EnemyData
 * @property {string} id
 * @property {string} name
 * @property {string} spriteName
 * @property {number} spawnChance
 * @property {{ hp: number, atq: number, def: number }} stats
 */