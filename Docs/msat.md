# MSAT Dungeon Delvers

## Informações Gerais
- **Gênero:** Roguelike
- **Plataforma:** PC
- **Faixa Etária:** 10+

## Mecânicas (Mechanics)
- Movimentação baseada em turnos
- Equipamento define habilidade
- ***Herança do Herói:*** Ao final de cada 3 fases, o jogador pode transferir um item para o baú do nível 0. Caso morra, o novo personagem "herda" esses itens e pode começar a exploração com eles.
- Progressão se dá por escolhas no fim de cada nível, podendo aumentar o máximo de vida ou mana.
- O jogador recupera toda a vida e mana ao derrotar o chefe que aparece a cada 3 labirintos.
- **Itens equipáveis:**
  - Armadura (*defesa/reduz dano*)
  - Arma (*define ataque e dano*)
  - Amuleto (*efeitos diversos*)
- **Itens cosumíveis:**
  - Emplastro (*regenera 30% de vida em um intervalo de 5 rodadas*)
  - Éter (*equivalente a poção de mana. Aumenta o valor imediatamente*)
  - Bombas (*itens que podem ser lançados e causam efeito em área*)
  - Elixires (*causam efeitos diversos, como invisibilidade, aumento de dano, etc*)
- **Inventário limitado**
  - Limite de 10 itens carregados, excluindo os equipados.
  - Consumíveis devem ser equipados antes de usados.
  - Apenas 2 consumíveis podem ser equipados, enquanto *Emplastro* e *Éter* devem estar "*equipados de forma fixa*".

## Narrativa (Story)
- 10 labirintos jogáveis + nível 0 como hub inicial.
  - **nível 0:** área inicial com o baú de herança e um npc explicando o jogo. Tema de acampamento de aventureiros. Outros npcs decorativos, sem interações.
  - **labirintos 1-3:** Tema de caverna. Inimigos são goblins (soldados, guerreiros, feiticeiros e shaman(chefão do 3º labirinto)). Algums armadilhas.
  - **labirintos 4-6:** tema de catacumba, profano. Inimigos são mortos-vivos (zumbis, esqueletos, ghouls e necromante(chefão do 6º labirinto)).
  - **labirintos 7-9:** tema demoníaco, inferno congelado. Inimigos são demônios, abominações e sombras.
  - **labirinto 10:** tema horror cósmico. Não exatamente um labirinto, mas uma fase fixa no estilo arena. 3 ondas de inimigos, abominações corrompidas dos níveis anteriores. Depois da terceira, o chefe se revela (inspirado em chthulu).
- **Derrota:** Em caso de derrota, tela de game over aparece, perguntando se o jogador deseja continuar. Se sim, o jogo volta do nível 0, levando em conta qualquer herança conquistada. Se não, o jogo volta para o menu principal.
- **Vitória:** O jogador derrota o chefe do labirinto 10. Com isso, ele salva o mundo da invasão dos monstros do outro lado. Jogador automaticamente herda um item lendário deste nível.
- Deve ser possível expandir a quantidade de labirintos no futuro.

## Estética (Aesthetics)
- Visual
  - Pixel 16 bit
  - Dark Fantasy
- Sonorização
  - 16 bit
  - BGM inspirado no gênero musical Metal
    - Referências: Blind Guardian, Iced Earth, Demons & Wizards
    - Música específica por tema do nível
  - SFX
    - Adquirir itens
    - Acertar ataques
    - Sofrer dano
    - Morte do jogador
    - Morte das criaturas
    - Morte dos chefes
    - Vitória contra chefes
    - Vitória contra chefão final
    - Movimento do jogador

## Tecnologia (Technology)
- PyGame
  - Sitema principal de desenvolvimento do jogo
- PyTest
  - Teste de sanidade para as mecânicas lógicas do jogo
- Piskel
  - Arte em pixel