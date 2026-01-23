# MSAT Dungeon Delvers

## Informações Gerais
- **Gênero:** Roguelike
- **Plataforma:** PC
- **Faixa Etária:** 10+

## Mecânicas (Mechanics)
### Jogador
- **Status Inicial:**
  - 10 de Vida
  - 10 de Mana
  - Ataque = 1
  - Defesa = 1
  - Magia = 1
- **Equipamento Inicial:**
  - 1x espada de aventureiro que causa 1 de dano
  - 2x Emplastros
  - 1x Éter

> **Evolução**
> - Cada vez quer temina um labririnto, ele escolhe aumentar ATQ, DEF, ou MAG em 1 ponto ou aumentar VIDA ou MANA máxima em 5 pontos.
> - Quando conclui os labirintos 3, 6 e 9, ele pode fazer essa escolha duas vezes.

### Geral
- Movimentação baseada em turnos em grid;
- Equipamento define habilidade
- ***Herança do Herói:*** Ao final de cada 3 fases, o jogador pode transferir um item para o baú do nível 0. Caso morra, o novo personagem "herda" esses itens e pode começar a exploração com eles.
- Progressão se dá por escolhas no fim de cada nível, podendo aumentar o máximo de vida ou mana.
- O jogador recupera toda a vida e mana ao derrotar o chefe que aparece a cada 3 labirintos.

### Equipamento
- **Itens equipáveis:**
  - Armadura (*reduz dano*)
  - Arma (*define dano*)
  - Amuleto (*efeitos diversos*)
  - 2 itens consumíveis
  - *Emplastros* e *Éter* não precisam ser equipados, e podem ser acessados a qualquer momento via tecla de atalho.
- **Itens cosumíveis:**
  - Emplastro (*regenera 3 de vida*)
  - Éter (*regenera 4 de mana*)
  - Bombas (*itens que podem ser lançados e causam efeito em área. Alcance de 3 quadrados de distância. Não afetam ou ultrapassam paredes.*)
    - **Explosão:** Causa 3 de dano em uma área de 3x3
    - **Fumaça:** Cobre área com fumaça, bloqueando a visão em uma área de 3x3 por 3 rodadas.
    - **Ácido:** Cobre área com ácido, causando 2 de dano em quem parar em um quadrado afetado. Afeta uma área de 3x3 por 3 rodadas.
  - Elixires (*causam efeitos diversos*)
    - **Invisibilidade:** inimigos ignoram o jogador por 5 rodadas;
    - **Fúria Líquida:** aumenta o dano físico da arma em 50% por 3 ataques. Funciona apenas com armas corpo-a-corpo;
    - **Destilado Arcano:** magias custam metade da mana para usar por 3 rodadas. mínimo 1 de custo.
- **Inventário**
  - Possui apenas 10 slots.
  - Itens consumíveis iguais se acumulam, ocupando o mesmo slot.
  - *Emplastros* e *Éter* não ocupam slot no inventário. Podem ter no máximo 10 de cada.
- **Dinheiro**
  - Ouro pode ser acumulado durante o jogo, encontrado em baús ou de inimigos derrotados
  - É contado separadamente. Ou seja, não ocupa slot do inventário.
  - Usado para comprar consumíveis do vendedor misterioso que aparece nos labirintos 2, 5, 8 e 10.

### Combate
  - 

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
