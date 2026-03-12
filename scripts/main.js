import { Grid }        from './grid.js';
import { GameMap }     from './map.js';
import { TurnManager, Enemy } from './turn.js';

async function OnBeforeProjectStart(runtime) {
  runtime.addEventListener('tick', () => Tick(runtime));
}

function Tick(runtime) {
  // Lógica por tick — animações, UI, etc. (a expandir)
}

runOnStartup(async (runtime) => {
  const grid  = new Grid(16);
  const map   = new GameMap(32, 32, 6);
  const turns = new TurnManager();

  // Callbacks de turno (úteis para UI e debug)
  turns.onTurnStart((n) => console.log(`--- Turno ${n} iniciado ---`));
  turns.onTurnEnd((n)   => console.log(`--- Turno ${n} encerrado ---`));

  let player;
  let tileset;

  runtime.addEventListener('beforeprojectstart', () => {
    OnBeforeProjectStart(runtime);

    player  = runtime.objects.player.getFirstInstance();
    tileset = runtime.objects.simpleTileset.getFirstInstance();

    // Renderiza o mapa
    map.render(tileset);

    // Posiciona o jogador em tile de chão válido
    const start = map.getPlayerStart();
    const pos   = grid.toPixel(start.x, start.y);
    player.x = pos.x;
    player.y = pos.y;

    // Spawna um inimigo parado em cada sala (exceto a do jogador)
    for (const spawn of map.getEnemySpawns()) {
      const enemy = new Enemy(spawn.x, spawn.y, grid);
      turns.addEnemy(enemy);
    }

    console.log(`${turns.enemies.length} inimigo(s) spawnado(s)`);
    console.log('Salas:', map.rooms);
  });

  // ---------------------------------------------------------------------------
  // Input — cada tecla tenta uma ação do jogador
  // ---------------------------------------------------------------------------
  runtime.addEventListener('keydown', (event) => {
    let action = null;

    switch (event.key) {
      case 'ArrowUp':
        action = () => grid.move(player, 0, -1, map);
        break;
      case 'ArrowDown':
        action = () => grid.move(player, 0, 1, map);
        break;
      case 'ArrowLeft':
        action = () => grid.move(player, -1, 0, map);
        break;
      case 'ArrowRight':
        action = () => grid.move(player, 1, 0, map);
        break;
    }

    // Só processa o turno se houve uma ação mapeada
    if (action) {
      turns.playerAct(action, map, grid, player);
    }
  });
});