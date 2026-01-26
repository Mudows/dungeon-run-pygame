import pygame  # Biblioteca principal do jogo

# Inicializa o PyGame
pygame.init()

# Configura a janela (1024x768 pixels)
screen = pygame.display.set_mode((1024, 768))
pygame.display.set_caption("Dungeon Delvers MVP")  # Título da janela
clock = pygame.time.Clock()  # Controla 60 FPS

# Loop principal do jogo
running = True
while running:
    # Eventos (teclas, mouse, fechar janela)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:  # Clique X na janela
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:  # Tecla ESC
                running = False
    
    # Limpa tela com preto
    screen.fill((0, 0, 0))
    
    # Aqui vai TODO o jogo no futuro
    
    # Atualiza tela
    pygame.display.flip()
    
    # 60 FPS
    clock.tick(60)

# Fecha tudo
pygame.quit()
