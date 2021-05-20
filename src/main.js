// Initialize the game's configuration.
let config = {
    type: Phaser.CANVAS,
    width: 780,
    height: 440,
    scene: [Intro],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
}

// Initialize the game.
let game = new Phaser.Game(config);

// Initialize the width and height.
let width = 1000;
let height = 700;

// Initialize the keys used to play the game.
let UP, DOWN, RIGHT, LEFT;