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
        this.enemiesGroup = this.physics.add.group();

        //creating player
        this.p1Fish = new Fish(this, 100, 340, "fish");
        

        let rock1 = this.physics.add.sprite(500, 340, "rock");
        this.rockGroup.add(rock1);
        rock1.body.immovable = true;
        rock1.body.allowGravity = false;

        this.physics.add.collider(this.p1Fish, this.rockGroup);

        let clam = new Enemy(this, 300, 340, "clam");
        this.enemiesGroup.add(clam);
        clam.body.immovable = true;
        clam.body.allowGravity = false;
        this.physics.add.collider(this.p1Fish, this.enemiesGroup, null, this.touchedEnemy, this);


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


        this.anims.create({
            key: 'clamOpen',
            frames: this.anims.generateFrameNumbers('clam', {
                start: 0, end: 2
            }),
            frameRate: 2.5,
            repeat: 1
        });
        clam.anims.play('clamOpen');

        


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

        if (Phaser.Input.Keyboard.JustDown(LEFT)) {
            this.p1Fish.flipX = true;
            this.p1Fish.angle = 0;
            this.p1Fish.setVelocityY(0);
            this.p1Fish.setVelocityX(-swimSpeed);
        }
        else if (Phaser.Input.Keyboard.JustDown(RIGHT)) {
            this.p1Fish.flipX = false;
            this.p1Fish.angle = 0;
            this.p1Fish.setVelocityY(0);
            this.p1Fish.setVelocityX(swimSpeed);
        }
        else if (Phaser.Input.Keyboard.JustDown(UP)) {
            this.p1Fish.flipX = false;
            this.p1Fish.body.angle = 270;
            this.p1Fish.angle = 270;
            this.p1Fish.setVelocityX(0);
            this.p1Fish.setVelocityY(-swimSpeed);
        }
        else if (Phaser.Input.Keyboard.JustDown(DOWN)) {
            this.p1Fish.flipX = false;
            this.p1Fish.body.angle = 90;
            this.p1Fish.angle = 90;
            this.p1Fish.setVelocityX(0);
            this.p1Fish.setVelocityY(swimSpeed);
        }

        this.p1Fish.update();
        // if ()

        if (this.p1Fish.checkCollision(this.enemy)){
            console.log("game over");
        }

        // //rock collision
        // touchedRock(player, rock){

        // }
    }

    touchedEnemy(){
        console.log("help");
    }
}