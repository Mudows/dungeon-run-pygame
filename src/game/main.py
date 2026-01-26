import pygame

pygame.init()

screen = pygame.display.set_mode((1024, 768))
pygame.display.set_caption("Dungeon Delvers MVP")
clock = pygame.time.Clock()


running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:  # Clique X na janela
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:  # Tecla ESC
                running = False
    
    screen.fill((0, 0, 0))
        
    # Atualiza tela
    pygame.display.flip()
    
    # 60 FPS
    clock.tick(60)

pygame.quit()
