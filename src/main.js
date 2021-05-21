// Initialize the width and height.
let widthScreen = 800;
let heightScreen = 450;

// Initialize the game's configuration.
let config = {
    type: Phaser.CANVAS,
    width: widthScreen,
    height: heightScreen,
    // scene: [Intro, Menu, Levels, One],
    scene: [One],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
}

// Initialize the game.
let game = new Phaser.Game(config);

// Initialize the keys used to play the game.
let UP, DOWN, RIGHT, LEFT;