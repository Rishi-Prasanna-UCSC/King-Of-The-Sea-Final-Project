class Menu extends Phaser.Scene {
    constructor(){
        super("menu");
    }

    preload() {
        // Main Menu Music.
        this.load.audio('MMMusic', 'assets/music/KingOfTheSeaScoreMainMenu.wav');

        // Note: Created loading screen with a bit of help from this resource:
        // https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
        let bar = this.add.graphics();
        let box = this.add.graphics();
        box.fillStyle(0x111111, 0.8);
        box.fillRect(240, 270, 320, 50);

        this.load.on('progress', function (value) {
            bar.clear();
            bar.fillStyle(0xffffff, 1);
            bar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('complete', function() {
            // console.log('complete');
            bar.destroy();
            box.destroy();
        });
    }

    create() {
        // Initialize music.
        let music = this.sound.add('MMMusic');
        music.setLoop(true);
        music.play();

        // Initialize background.

        // Initialize title text configuration.
        this.titleConfig = {
            fontFamily: 'Georgia',
            fontSize: '60px',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5
            },
            // fixedWidth: 100
        }

        this.optionsConfig = {
            fontFamily: 'Cormorant Garamond',
            fontSize: '30px',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5
            },
            // fixedWidth: 100
        }
        
        // Initialize background text.
        this.title = this.add.text(-250, 50, 'KING OF\nTHE SEA', this.titleConfig);

        this.play = this.add.text(900, 80, 'PLAY', this.optionsConfig);
        this.levels = this.add.text(900, 160, 'LEVELS', this.optionsConfig);
        this.tutorial = this.add.text(900, 240, 'TUTORIAL', this.optionsConfig);
        this.credits = this.add.text(900, 320, 'CREDITS', this.optionsConfig);

        this.play.setInteractive();
        this.levels.setInteractive();
        this.tutorial.setInteractive();

        this.play.on('pointerdown', () => {
            this.scene.start("levelOne");
        });

        this.levels.on('pointerdown', () => {
            this.scene.start("levelSelection");
        });

        this.tutorial.on('pointerdown', () => {
            this.scene.start("tutorial");
        });
    }

    update() {
        this.transitionTitleText();

        // Nested delay calls, because I can.
        // Have an increase in delay for 20 seconds for every option from the levels, tutorial, and credits.
        this.time.delayedCall(50, () => {
            this.transitionOptionText(this.play);

            this.time.delayedCall(20, () => {
                this.transitionOptionText(this.levels);
    
                this.time.delayedCall(20, () => {
                    this.transitionOptionText(this.tutorial);
    
                    this.time.delayedCall(20, () => {
                        this.transitionOptionText(this.credits);
                    }, null, this);
    
                }, null, this);
    
            }, null, this);
        }, null, this);
        
    }

    transitionTitleText() {
        if (this.title.x + 8 < 50) {
            this.title.x += 8;
        }
        else {
            this.title.x = 50;
        }
    }
    transitionOptionText(text) {
        if (text.x - 8 > 550) {
            text.x -= 8;
        }
        else {
            text.x = 550;
        }
    }
}