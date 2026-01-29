# MSAT — Dungeon Delvers

Documento de planejamento do jogo baseado no modelo MSAT  
(Mecânicas · História · Estética · Tecnologia)

---

## Identificação do Projeto

- **Nome do jogo:** Dungeon Delvers  
- **Plataforma:** PC  
- **Gênero:** Roguelike  
- **Faixa etária:** 10+  
- **Câmera:** Top-down (90°)  
- **Jogabilidade:** Teclado e mouse  
- **Objetivo do projeto:**  
  Desenvolver um jogo roguelike top-down jogável, com foco em progressão, tomada de decisão e possibilidade de expansão futura.

---

## M — Mecânicas

### Core Gameplay
- Movimentação baseada em **turnos**, em grid, 4 direções.
- Não é possível mover na diagonal.
- Movimento, ataque, uso de item ou interação equivalem a **uma ação**.
- Após a ação do jogador, todos os inimigos realizam uma ação.

### Sistema de Turnos
- Todos os inimigos têm direito a uma ação por turno.
- A ordem de ação dos inimigos é definida por uma lista:
  - Inimigos mais próximos e ativados agem primeiro.
  - A lista só muda quando um inimigo morre.

### Visão e Exploração
- Campo de visão limitado, não ultrapassa paredes.
- Visão definida por uma área de **5×5 quadrados**.
- Salas não visitadas não são renderizadas.
- Salas descobertas permanecem cobertas por “névoa de guerra” quando fora da visão.

### Combate
- **Combate físico:**
  - `(ATQ do jogador + ATQ da arma) − DEF do alvo`
- **Combate mágico:**
  - `(MAG do jogador + MAG da magia) − RES do alvo`
- Dano mínimo sempre igual a **1**.
- Ataque físico exige alvo adjacente.
- Ataque mágico exige alvo dentro do alcance e no campo de visão.

### Progressão do Jogador
- Ao concluir um labirinto, o jogador escolhe:
  - +1 em ATQ, DEF ou MAG  
  - **ou** +5 em Vida ou Mana máxima
- Nos labirintos **3, 6 e 9**, a escolha acontece **duas vezes**.
- Vida e Mana são totalmente restauradas ao derrotar chefes (a cada 3 labirintos).

### Inventário e Equipamentos
- Inventário com **9 slots**.
- Itens iguais se acumulam.
- Emplastros e Éter não ocupam slot (máx. 10 de cada).
- Slots de equipamento:
  - Arma
  - Armadura
  - Amuleto
  - 3 slots de itens diversos

---

## S — História (Story)

- Estrutura composta por **10 labirintos** + **nível 0** (hub).
- **Nível 0:**  
  Hub inicial com baú de herança e NPC explicativo.
- Progressão temática:
  - Labirintos 1–3: Caverna (Goblins)
  - Labirintos 4–6: Catacumba (Mortos-vivos)
  - Labirintos 7–9: Inferno congelado
  - Labirinto 10: Horror cósmico (arena fixa)
- Para avançar, o jogador deve derrotar **todos os inimigos** do nível.
- **Derrota:** retorno ao nível 0.
- **Vitória:** derrota do chefe final e obtenção de item lendário.
- Estrutura pensada para **expansão futura de labirintos**.

---

## A — Estética

### Visual
- Pixel art **16×16**
- Estilo **Dark Fantasy**
- Câmera top-down fixa

### Interface (UI)
- Barra de Vida com valor atual
- Barra de Mana com valor atual
- Indicador de Emplastros e Éter com atalhos
- Botão de inventário
- Tela de inventário com:
  - 9 slots
  - Slots de equipamentos

### Áudio
- BGM estilo 16-bit inspirada em Metal
  - Referências: Blind Guardian, Iced Earth, Demons & Wizards
- SFX para:
  - Movimento
  - Combate
  - Coleta de itens
  - Dano
  - Morte do jogador
  - Morte de inimigos
  - Vitória contra chefes

---

## T — Tecnologia

### Engine
- **PyGame**
- Jogo 2D top-down
- Suporte a grid, turnos e input por teclado/mouse

### Assets
- Arte em pixel criada no **Piskel**
- Tilesets simples e reutilizáveis
- Sprites com foco em legibilidade

### Ferramentas
- **PyTest** para testes lógicos
- Editor de código (IDE padrão)

---

## MVP — Escopo Inicial

### ENTRA no MVP
- Labirintos 1 a 3 (tema caverna)
- Até:
  - 6 salas (nível 1)
  - 8 salas (nível 2)
  - 10 salas (nível 3)
- Combate funcional
- Inventário funcional
- Inimigos goblins
- Visão fixa 5×5
- Progressão básica do jogador

### NÃO entra no MVP
- Sistema de lanterna
- Sistema de herança
- Magias do jogador
- Vendedor misterioso
- Bombas
- Elixires
- Ouro

### Pipeline
1. Implementar movimentação em grid
2. Implementar sistema de turnos
3. Combate básico funcional
4. Inimigos simples
5. Interface mínima
6. Conteúdo adicional, se houver tempo

