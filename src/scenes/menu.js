class Menu extends Phaser.Scene {
    constructor(){
        super("menu");
    }

    preload() {
        // Main Menu Music and BG.
        this.load.audio('MMMusic', 'assets/music/KingOfTheSeaScoreMainMenu.wav');
        this.load.image('MMBackground', 'assets/art/MMBackground.png');

        // Bubbles.
        this.load.image('B01', 'assets/sprites/bubble01.png');
        this.load.image('B02', 'assets/sprites/bubble02.png');
        this.load.image('B03', 'assets/sprites/bubble03.png');

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
        // Initialize background.
        this.add.image(widthScreen / 2, heightScreen / 2, 'MMBackground');

        this.bubbleGracePeriod = -1;

        // Initialize music.
        let music = this.sound.add('MMMusic');
        music.setLoop(true);
        if (!playMusic) {
            music.play();
            playMusic = true;
        }

        this.bubbleGroup = this.physics.add.group();

        

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
            backgroundColor: 'rgba(0,0,0,0.7)',
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
            this.scene.start("storyOne");
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

        this.bubbleGracePeriod += 1;
        if (this.bubbleGracePeriod % 200 == 0) {
            // console.log(this.bubbleGracePeriod);
            let min = 1;
            let max = 4;
            let rand = Math.floor(Math.random() * (max - min) + min);

            let bubble;
            switch (rand) {
                case 1:
                    bubble = this.physics.add.sprite(
                        Math.random() * widthScreen,
                        heightScreen,
                        'B01');
                    bubble.setScale(0.2);
                    break;
                case 2:
                    bubble = this.physics.add.sprite(
                        Math.random() * widthScreen,
                        heightScreen,
                        'B02');
                    bubble.setScale(0.5);
                    break;
                case 3:
                    bubble = this.physics.add.sprite(
                        Math.random() * widthScreen,
                        heightScreen,
                        'B03');
                    bubble.setScale(0.5);
                    break;
            }
            this.bubbleGroup.add(bubble);
            bubble.setVelocityY(-50);
            bubble.body.immovable = false;
            bubble.body.allowGravity = false;
        }
        
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