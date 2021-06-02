// Initialize the width and height.
let widthScreen = 800;
let heightScreen = 450;

// Initialize the game's configuration.
let config = {
    type: Phaser.CANVAS,
    width: widthScreen,
    height: heightScreen,
    // scene: [Intro, Menu, Levels, One, Pause, Tutorial, LevelComplete, GameOver],
    scene: [One, Pause, GameOver], // Debug
    physics: {
        default: 'arcade',
        arcade: {
            // debug: false
            debug: true
        }
    }
}

// Initialize the game.
let game = new Phaser.Game(config);

// Initialize the keys used to play the game.
let UP, DOWN, RIGHT, LEFT;

// playMusic[0] = main menu music.
// playMusic[1] = gameplay music.
let playMusic = [false, false];

let swimSpeed = 400;

// If a level is failed, set this to the number of the level that was failed.
let numLevelFailed = 0;