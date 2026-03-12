import { Grid }                        from './grid.js';
import { GameMap }                     from './map.js';
import { TurnManager, EnemyFactory }   from './turn.js';

async function OnBeforeProjectStart(runtime) {
  runtime.addEventListener('tick', () => Tick(runtime));
}

function Tick(runtime) {
  // Animações, UI, etc. (a expandir)
}

runOnStartup(async (runtime) => {
  const grid  = new Grid(16);
  const map   = new GameMap(32, 32, 6);
  const turns = new TurnManager();

  turns.onTurnStart((n) => console.log(`--- Turno ${n} ---`));

  // ---------------------------------------------------------------------------
  // Carrega o JSON de inimigos (Project File no C3)
  // ---------------------------------------------------------------------------
  const enemiesData = await runtime.assets.fetchJson('enemies.json');

  // Define qual família aparece neste andar (MVP: sempre goblins)
  const factory = new EnemyFactory(enemiesData.families.goblins);

  let player;
  let tileset;

  runtime.addEventListener('beforeprojectstart', () => {
    OnBeforeProjectStart(runtime);

    player  = runtime.objects.player.getFirstInstance();
    tileset = runtime.objects.simpleTileset.getFirstInstance();

    map.render(tileset);

    // Posiciona o jogador em tile de chão válido
    const start = map.getPlayerStart();
    const pos   = grid.toPixel(start.x, start.y);
    player.x = pos.x;
    player.y = pos.y;

    // Spawna 1 ou 2 inimigos em cada sala (exceto a do jogador)
    for (const spawn of map.getEnemySpawns()) {
      const count = randomInt(1, 2);

      for (let i = 0; i < count; i++) {
        // Pequeno offset para não sobrepor quando count = 2
        const offsetX = i * 2;
        const enemy   = factory.spawn(spawn.x + offsetX, spawn.y, grid, runtime);
        turns.addEnemy(enemy);
      }
    }

    console.log(`${turns.enemies.length} inimigo(s) spawnado(s) — família: ${factory.familyName}`);
  });

  // ---------------------------------------------------------------------------
  // Input
  // ---------------------------------------------------------------------------
  runtime.addEventListener('keydown', (event) => {
    let action = null;

    switch (event.key) {
      case 'ArrowUp':    action = () => grid.move(player, 0, -1, map); break;
      case 'ArrowDown':  action = () => grid.move(player, 0,  1, map); break;
      case 'ArrowLeft':  action = () => grid.move(player, -1, 0, map); break;
      case 'ArrowRight': action = () => grid.move(player,  1, 0, map); break;
    }

    if (action) turns.playerAct(action, map, grid, player);
  });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}