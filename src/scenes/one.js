class One extends Phaser.Scene {
    constructor(){
        super("levelOne");
    }

    preload(){
        this.load.image('spider', 'assets/art/Spider.png'); //debug
        this.load.image('Pause', 'assets/art/PauseButton.png');
        this.load.image('BG', 'assets/art/PlayBackground.png');

        this.load.spritesheet('clam', 'assets/sprites/clamAnimation.png', 
            {frameWidth: 150, frameHeight: 271});

    }

    create(){
        this.add.image(0, 0, 'BG');

        //Key Controls
        UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //creating player
        this.p1Fish = new Fish(this, 100, 340, "spider");

        this.clam = new Enemy(this, 300, 340, "clam");
        this.anims.create({
            key: 'clam',
            frames: this.anims.generateFrameNumbers('clam', {
                start: 1, end: 4
            }),
            frameRate: 6
        });


        //creates pause button
        this.pause = this.add.image(720, 50, 'Pause');
        this.pause.setInteractive();
        this.pause.on("pointerdown", () => {
            // this.press.visible = false;
            this.scene.pause();
            this.scene.launch('pauseScene');
        });
        
    }

    update(){
        this.p1Fish.update();

        if (this.p1Fish.checkCollision(this.enemy)){
            console.log("game over");
        }
    }
}