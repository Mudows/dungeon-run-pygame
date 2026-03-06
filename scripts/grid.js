export class Grid {

    constructor(tileSize = 16) {

        // tamanho de cada tile em pixels
        this.tileSize = tileSize;

    }

    // converte coordenada de GRID para PIXEL
    toPixel(gridX, gridY) {

        return {
            x: gridX * this.tileSize,
            y: gridY * this.tileSize
        };

    }

    // converte PIXEL para GRID
    toGrid(pixelX, pixelY) {

        return {
            x: Math.floor(pixelX / this.tileSize),
            y: Math.floor(pixelY / this.tileSize)
        };

    }

}