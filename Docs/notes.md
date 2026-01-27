# Anotações Dungeon Delvers

## Informações Gerais
- **Gênero:** Roguelike
- **Plataforma:** PC
- **Faixa Etária:** 10+
- **Câmera:** Top-down (90°)
- **Jogabilidade:** Teclado e mouse

### Desafios Extras
- **Inimigo Invencível:** Implementar um inimigo que aparece em circunstâncias especiais, mas que não pode ser derrotado em hipótese alguma. Jogador só pode fugir ou bloquear(?) ele.
- **Gerenciamento de Recursos:** O personagem do jogador precisa se alimentar regularmente com comida saudável ou ganha um debuff. No final de cada labirinto ele precisa "montar acampamento" com X recursos para se recuperar. Se ele se alimentar com comidas ou partes de monstros, se cura normalmente como esperado mas a quantidade total consumida ao longo do jogo afeta o final.
- **Mortes "Legado":** Os personagens que morreram nas incursões anteriores afetam a experiência da próxima, sendo aparecendo como parte do cenário (corpo no chão, sendo devorado por monstros, etc) ou até mesmo aparecendo como um inimigo do tipo do labirinto onde morreu.

## Mecânicas (Mechanics)
### Jogador
- **Status Inicial:**
  - 10 de Vida
    - Se chegar a 0, jogador morre
  - 10 de Mana
    - Usado para ativar magias
  - Ataque (ATQ) = 1
    - É utilizado para calcular dano físico
  - Defesa (DEF) = 1
    - Reduz o dano físico recebido
  - Magia (MAG) = 1
    - Utilizado para calcular dano de magia
  - Resistência (RES) = 1
    - Reduz o dano mágico recebido
- **Equipamento Inicial:**
  - 1x espada de aventureiro que causa 1 de dano
  - 2x Emplastros
  - 1x Éter
- Campo de visão do jogador não ultrapassa paredes.

> [!important]Evolução
> - Cada vez quer temina um labririnto, ele escolhe aumentar ATQ, DEF, ou MAG em 1 ponto ou aumentar VIDA ou MANA máxima em 5 pontos.
> - Quando conclui os labirintos 3, 6 e 9, ele pode fazer essa escolha duas vezes.

### Geral
- Movimentação baseada em turnos em grid, em 4 direções.
- Movimento, ataque, ativação de itens e interação com outros objetos equivalem a uma ação.
- Quando o jogador executa uma ação, todos os inimigos descobertos também realizam uma ação.
- Inimigos descobertos e fora do campo de visão também agem.
- Todos os inimigos tem direito a uma ação por turno, após a ação do jogador, a não ser que suas características digam o contrário.
- A ordem de ação de cada inimigo é determinada por uma lista onde o primeiro a aparecer e mais próximo do jogador ocupa o primeiro lugar, e assim por diante. A lista só se altera com a morte do inimigo, que o exclui dela.
- Inimigo Descoberto = ativado e sempre persegue (pathfinding)
- Não é possível se mover na diagonal.
- Não é possivel "passar por cima" de um inimigo ativo.
- Inimigos não podem ocupar o mesmo lugar, nem trocar de lugar.
- Um inimigo é descoberto quando o jogador entra na sala que ele está, mas não necessariamente entrou no campo de visão dele.
- Inimigos sempre atacam quando possível. Se não for, eles se movem para se posicionar para tal.
- Salas não visitadas não são renderizadas. Salas descobertas são renderizadas mas cobertas pela "névoa de guerra" quando estão além da visão do jogador.
- A visão do jogador é determinada pela luz de uma lanterna que ele carrega.
  - A luz tem um raio de 5x5 quadrados.
  - Sistema de combustível para a luz? Talvez os inimigos fiquem mais agressivos se a luz apagar? Como disponibilizar combustível suficiente para equilibrar o jogo?
- Equipamento define habilidade
- ***Herança do Herói:*** Ao final de cada 3 fases, o jogador pode transferir um item para o *Baú da Guilda* do nível 0. Caso morra, o novo personagem "herda" esses itens e pode começar a exploração com eles.
  - O *Baú da Guilda* suporta até 6 itens hereditários.
- Progressão se dá por escolhas no fim de cada nível, podendo aumentar o máximo de vida ou mana.
- O jogador recupera toda a vida e mana ao derrotar o chefe que aparece a cada 3 labirintos.
- A tela do jogo mostra no máximo o equivalente a 16x16 quadrados.

### Equipamento
- **Itens equipáveis:**
  - Armadura (*incrementa na defesa*)
  - Arma (*define dano*)
  - Amuleto (*incrementa a resistência*)
  - 3 slots de itens diversos que podem ser equipados, sendo esses consumíveis ou itens de magia.
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
- **Itens de Magia**
  - Magia é utilizada através da ativação de certos itens que consomem mana. Esses itens devem estar equipados em um dos 3 slots de itens diversos para serem ativados.
  - Magia pode ser de ataque ou defesa. Ataques provocam dano e defesa ajuda a absorver dano.
  - O alvo precisa estar no campo de visão do jogador. Alcance padrão de 5 quadrados.

- **Inventário**
  - Possui apenas 9 slots.
  - Itens consumíveis iguais se acumulam, ocupando o mesmo slot.
  - *Emplastros* e *Éter* não ocupam slot no inventário. Podem ter no máximo 10 de cada.
- **Dinheiro**
  - Ouro pode ser acumulado durante o jogo, encontrado em baús ou de inimigos derrotados
  - É contado separadamente. Ou seja, não ocupa slot do inventário.
  - Usado para comprar consumíveis do vendedor misterioso que aparece nos labirintos 2, 5, 8 e 10.

### Combate
  - Para ataques físicos, o atacante soma o seu valor de ATQ ao ATQ da arma em punho e diminui da esse valor da DEF do alvo. A diferença é o dano físico. Dano mínimo é 1.
  - Para ataques mágicos, o atacante soma o seu valor de MAG ao MAG da magia em punho e diminui da esse valor da RES do alvo. A diferença é o dano mágico. Dano mínimo é 1.
  - Para realizar um ataque, basta que o atacante faça colisão com o alvo andando em sua direção ou clicando nele com o mouse. Para ataques físicos corpo-a-corpo, é necessário que o oponente esteja adjacente ao atacante. Para ataques mágicos, é necessário que o inimigo esteja dentro do alcance.


## Narrativa (Story)
- 10 labirintos jogáveis + nível 0 como hub inicial.
  - **nível 0:** área inicial com o baú de herança e um npc explicando o jogo. Tema de acampamento de aventureiros. Outros npcs decorativos, sem interações.
  - **labirintos 1 à 3:** Tema de caverna. Inimigos são goblins (soldados, guerreiros, feiticeiros e shaman(chefão do 3º labirinto)). Algums armadilhas.
  - **labirintos 4 à 6:** tema de catacumba, profano. Inimigos são mortos-vivos (zumbis, esqueletos, ghouls e necromante(chefão do 6º labirinto)).
  - **labirintos 7 à 9:** tema demoníaco, inferno congelado. Inimigos são demônios, abominações e sombras. Chefão do lab 9 é um demônio de gelo e sombras.
  - **labirinto 10:** tema horror cósmico. Não exatamente um labirinto, mas uma fase fixa no estilo arena. 3 ondas de inimigos, abominações corrompidas dos níveis anteriores. Depois da terceira, o chefe se revela (inspirado em chthulu).
- Para passar de cada labirinto, o jogador deve derrotar todos os inimigos. Quando isso acontece, um portal se abre na sala atual em que o jogador se encontra para o próximo nível.
- **Derrota:** Em caso de derrota, tela de game over aparece, perguntando se o jogador deseja continuar. Se sim, o jogo volta do nível 0, levando em conta qualquer herança conquistada. Se não, o jogo volta para o menu principal.
- **Vitória:** O jogador derrota o chefe do labirinto 10. Com isso, ele salva o mundo da invasão dos monstros do outro lado. Jogador automaticamente herda um item lendário deste nível.
- Deve ser possível expandir a quantidade de labirintos no futuro.

## Estética (Aesthetics)
- Quadrados tem uma tamanho de 16x16 pixels.
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
  - UI
    - Barra de Vida com valor atual
    - Barra de Mana com valor atual
    - QTD de emplastro e éther, com a quantidade e indicação da tecla de atalho
    - Botão do inventário
      - Inventário com os 9 slots e os slots de equipamentos equipados.

## Tecnologia (Technology)
- PyGame
  - Sitema principal de desenvolvimento do jogo
- PyTest
  - Teste de sanidade para as mecânicas lógicas do jogo
- Piskel
  - Arte em pixel

# MVP
Lista do que será desenvolvido no MVP do jogo
## Incluir
- 3 primeiros níveis (caverna) e o respectivo chefe.
  - primeiro com até 6 salas conectadas
  - segundo com até 8 salas conectadas
  - terceiro com até 10 salas conectadas
  - Salas podem ter tamanhos variáveis de 4x4 a 10x10 quadrados.
  - podem existir corredores que conectam as salas, ou não.
- Inventário funcional.
- Raio de visão fixo 5x5 (sem combustível)
- Combate funcional
- Quantidade de inimigos por nível = 8 + 2 x N, onde N é o nível em que ele se encontra.
- Inimigos são goblins
  - Aparecem em lugares aleatórios, com excessão da sala onde o jogador começa no mapa. Salas grandes possuem mais inimigos que salas pequenas.
- Armas possíveis de se encontrar tem ATQ que varia de 2 a 4.
## Excluir
- Sistema da Lanterna
- Sistema de herança
- Vendedor misterioso
- Bombas
- Elixires
- Magia do Jogador
- Sem ouro


# Inimigos
#### Níveis Caverna

|INIMIGO|VD|MN|ATQ|DEF|MAG|RES|Local|
|---|---|---|---|---|---|---|---|
|Goblin|3|0|1|0|0|0|Nível 1/2/3|
|Goblin Guerreiro|5|0|2|1|0|0|Nível 1/2/3|
|Goblin Feiticeiro|4|5|1|1|2|1|Nível 2/3|
|Goblin Shaman (Chefão)|10|10|3|2|3|2|Nível 3|

Drop básico de um abate: 30% emplastro, 20% éter, 10% arma, 40% nada. (ajustar depois)

