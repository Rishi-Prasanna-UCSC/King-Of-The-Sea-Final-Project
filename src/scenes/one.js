class One extends Phaser.Scene {
    constructor(){
        super("levelOne");
    }

    preload(){
        this.load.image('Pause', 'assets/art/PauseButton.png');
        this.load.image('BG', 'assets/art/PlayBackground.png');

        this.load.image('rock', 'assets/sprites/rock.png');

        this.load.spritesheet('fish', 'assets/character/fishSpriteSheet.png',
            {frameWidth: 275, frameHeight: 100});
        this.load.spritesheet('clam', 'assets/sprites/clamAnimation.png', 
            {frameWidth: 100, frameHeight: 100});
        

    }

    create(){
        
        this.add.image(0, 0, 'BG');

        //Key Controls
        UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //create groups
        this.rockGroup = this.physics.add.group();

        //creating player
        this.p1Fish = new Fish(this, 100, 340, "fish");
        

        this.rock1 = this.add.image(500, 340, "rock");
        this.rockGroup.add(this.rock1);

        this.physics.add.collider(this.p1Fish, this.rockGroup);

        this.clam = new Enemy(this, 300, 340, "clam");

        // Running Ant Animation.
        this.anims.create({
            key: 'FishSwimming',
            frames: this.anims.generateFrameNumbers('fish', {
                start: 0, end: 1
            }),
            frameRate: 5,
            repeat: -1
        });
        this.p1Fish.setScale(0.5);
        this.p1Fish.anims.play('FishSwimming');


        // this.anims.create({
        //     key: 'clam',
        //     frames: this.anims.generateFrameNumbers('clam', {
        //         start: 1, end: 4
        //     }),
        //     frameRate: 6
        // });




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
        if ()

        if (this.p1Fish.checkCollision(this.enemy)){
            console.log("game over");
        }

        // //rock collision
        // touchedRock(player, rock){

        // }
    }
}