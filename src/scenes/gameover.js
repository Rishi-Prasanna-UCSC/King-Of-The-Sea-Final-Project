class GameOver extends Phaser.Scene {
    constructor(){
        super("gameOver");
    }
    preload() {
        this.load.image('dead', 'assets/character/fishDead.png');
    }
    create() {
        this.time = 0;
        this.dead = this.add.image(200, 200, 'dead');

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

        this.title = this.add.text(550, 50, 'GAME\nOVER', this.titleConfig);
        this.retry = this.add.text(550, 250, 'RETRY', this.optionsConfig);
        this.menu = this.add.text(550, 340, 'MENU', this.optionsConfig);

        this.retry.setInteractive();
        this.menu.setInteractive();

        this.retry.on('pointerdown', () => {
            if (numLevelFailed == 1) {
                this.scene.start("levelOne");
            }
            else if (numLevelFailed == 2) {
                this.scene.start("levelTwo");
            }
        });

        this.menu.on('pointerdown', () => {
            this.scene.start("menu");
        });
    }

    update() {
        // so sin(time / 50);
        this.time++;
        this.dead.y = (Math.sin(this.time/50) * 20) + 200;
        this.dead.flipY = true;
        this.dead.flipX = true;
    }
}