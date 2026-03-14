/**
 * hud.js — Interface do jogador (MVP).
 *
 * CONFIGURAÇÃO NO EDITOR DO C3:
 * ---------------------------------------------------------------
 * Crie os seguintes objetos manualmente na layer "UI" (parallax 0,0)
 * e posicione-os onde quiser na tela — o código NÃO move nem cria
 * novas instâncias, apenas atualiza os valores.
 *
 *   PlayerHpBarBg   : Tiled Background — fundo da barra (ex: vermelho escuro)
 *   PlayerHpBarFill : Tiled Background — preenchimento da barra (ex: vermelho vivo)
 *                     Deve ter a mesma posição e altura que PlayerHpBarBg.
 *                     A largura máxima (100% de HP) é lida do editor.
 *   PlayerHpText    : Text object — exibe "HP atual / HP máximo"
 *
 * Dica: alinhe PlayerHpBarFill exatamente sobre PlayerHpBarBg no editor.
 * A largura do Fill será reduzida proporcionalmente conforme o HP cai.
 * ---------------------------------------------------------------
 */
export class HUD {
  /**
   * @param {object} runtime
   * @param {object} player  - entidade com hp e maxHp
   */
  constructor(runtime, player) {
    this.runtime = runtime;
    this.player  = player;

    // Largura máxima da barra — lida do objeto no editor (100% de HP)
    // Não altere este valor no código; ajuste o tamanho no editor do C3.
    this._maxBarWidth = null;

    this._bg   = null;
    this._fill = null;
    this._text = null;

    this._init();
  }

  // ---------------------------------------------------------------------------
  // Inicialização — apenas busca as instâncias existentes no editor
  // ---------------------------------------------------------------------------

  _init() {
    // Busca as instâncias já colocadas no layout pelo editor
    // Se algum objeto não for encontrado, um aviso aparece no console
    this._bg   = this._getInstance('PlayerHpBarBg');
    this._fill = this._getInstance('PlayerHpBarFill');
    this._text = this._getInstance('PlayerHpText');

    // Memoriza a largura máxima do fill definida no editor (= 100% de HP)
    // Não modifique esta linha — ela lê o valor que você configurou visualmente
    if (this._fill) {
      this._maxBarWidth = this._fill.width;
    }

    this.update();
  }

  // ---------------------------------------------------------------------------
  // Atualização — chamada sempre que o HP do jogador mudar
  // ---------------------------------------------------------------------------

  update() {
    const { player, _maxBarWidth } = this;
    const ratio = Math.max(0, player.hp / player.maxHp);

    // Reduz a largura do fill proporcionalmente ao HP atual
    if (this._fill && _maxBarWidth !== null) {
      this._fill.width = Math.max(0, _maxBarWidth * ratio);
    }

    // Atualiza o texto — formato: "20 / 20"
    // Para mudar o formato, edite apenas a linha abaixo
    if (this._text) {
      this._text.text = `${player.hp} / ${player.maxHp}`;
    }
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  /**
   * Busca a primeira instância de um objeto pelo nome.
   * O objeto deve estar colocado manualmente no layout no editor do C3.
   */
  _getInstance(name) {
    const type = this.runtime.objects[name];
    if (!type) {
      console.warn(`[HUD] Objeto "${name}" não encontrado. Verifique o nome no editor do C3.`);
      return null;
    }
    const instance = type.getFirstInstance();
    if (!instance) {
      console.warn(`[HUD] Nenhuma instância de "${name}" encontrada no layout. Coloque-a manualmente no editor.`);
      return null;
    }
    return instance;
  }
}