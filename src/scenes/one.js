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
        
        // Transformation gem...probably to be used as the finish line.
        this.load.image('gemT', 'assets/sprites/TransformGem.png');

        // Health gem.
        this.load.image('gemH', 'assets/sprites/HealthGem.png');

        // 
        this.load.image('lifeH', 'assets/sprites/HeartIcon.png');
        this.load.image('lostH', 'assets/sprites/NotHeartIcon.png');
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
        this.finGemGroup = this.physics.add.group();
        this.helGemGroup = this.physics.add.group();

        //creating player
        this.p1Fish = new Fish(this, 100, 340, "fish");
        

        let rock1 = this.physics.add.sprite(500, 340, "rock");
        this.rockGroup.add(rock1);
        rock1.setScale(2);
        rock1.body.immovable = true;
        rock1.body.allowGravity = false;

        this.physics.add.collider(this.p1Fish, this.rockGroup);

        let clam = new Enemy(this, 300, 340, "clam");
        this.enemiesGroup.add(clam);
        clam.body.immovable = true;
        clam.body.allowGravity = false;


        let finish = this.physics.add.sprite(700, 150, 'gemT');
        this.finGemGroup.add(finish);
        finish.setScale(0.65);
        finish.body.immovable = true;
        finish.body.allowGravity = false;

        let health = this.physics.add.sprite(300, 100, 'gemH');
        this.helGemGroup.add(health);
        health.setScale(0.65);
        health.body.immovable = true;
        health.body.allowGravity = false;

        // Lives.
        this.heart1 = this.add.sprite(50, 50, 'lifeH');
        this.heart1.setScale(1.4);
        this.heart2 = this.add.sprite(110, 50, 'lifeH');
        this.heart2.setScale(1.4);
        this.heart3 = this.add.sprite(170, 50, 'lifeH');
        this.heart3.setScale(1.4);



        // Swimming Fish Animation.
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
            key: 'clamMouthOpen',
            frames: this.anims.generateFrameNumbers('clam', {
                start: 2, end: 2
            }),
            frameRate: 2.5,
            repeat: -1
        });
        this.anims.create({
            key: 'clamOpenAnim',
            frames: this.anims.generateFrameNumbers('clam', {
                start: 0, end: 2
            }),
            frameRate: 2.5,
            repeat: 0
        });
        clam.anims.play('clamMouthOpen');

        


        //creates pause button
        this.pause = this.add.image(720, 50, 'Pause');
        this.pause.setInteractive();
        this.pause.on("pointerdown", () => {
            // this.press.visible = false;
            this.scene.pause();
            this.scene.launch('pauseScene');
        });
        
        this.physics.add.collider(this.p1Fish, this.enemiesGroup, null, this.touchedEnemy, this);
        this.physics.add.collider(this.p1Fish, this.finGemGroup, null, this.touchedFinish, this);
        this.physics.add.overlap(this.p1Fish, this.helGemGroup, null, this.addLife, this);
    }

    update(){
        this.p1Fish.update();
        if (this.p1Fish.lifeNumChanged) {

            if (this.p1Fish.lives == 3) {
                this.heart3.destroy();
                this.heart3 = this.add.sprite(170, 50, 'lifeH');
                this.heart3.setScale(1.4);
                this.heart2.destroy();
                this.heart2 = this.add.sprite(110, 50, 'lifeH');
                this.heart2.setScale(1.4);
                this.heart1.destroy();
                this.heart1 = this.add.sprite(50, 50, 'lifeH');
                this.heart1.setScale(1.4);
            }
            if (this.p1Fish.lives == 2) {
                this.heart3.destroy();
                this.heart3 = this.add.sprite(170, 50, 'lostH');
                this.heart3.setScale(1.4);
                this.heart2.destroy();
                this.heart2 = this.add.sprite(110, 50, 'lifeH');
                this.heart2.setScale(1.4);
                this.heart1.destroy();
                this.heart1 = this.add.sprite(50, 50, 'lifeH');
                this.heart1.setScale(1.4);
            }
            else if (this.p1Fish.lives == 1) {
                this.heart3.destroy();
                this.heart3 = this.add.sprite(170, 50, 'lostH');
                this.heart3.setScale(1.4);
                this.heart2.destroy();
                this.heart2 = this.add.sprite(110, 50, 'lostH');
                this.heart2.setScale(1.4);
                this.heart1.destroy();
                this.heart1 = this.add.sprite(50, 50, 'lifeH');
                this.heart1.setScale(1.4);
            }
            else if (this.p1Fish.lives == 0) {
                this.heart3.destroy();
                this.heart3 = this.add.sprite(170, 50, 'lostH');
                this.heart3.setScale(1.4);
                this.heart2.destroy();
                this.heart2 = this.add.sprite(110, 50, 'lostH');
                this.heart2.setScale(1.4);
                this.heart1.destroy();
                this.heart1 = this.add.sprite(50, 50, 'lostH');
                this.heart1.setScale(1.4);
                this.p1Fish.destroy();
                numLevelFailed = 1;
                this.time.delayedCall(2000, () => {
                    this.scene.start("gameOver");
                }, null, this);
            }


            this.p1Fish.lifeNumChanged = false;
        }
    }

    addLife(fish, gem) {
        if (fish.lives < 3) {
            fish.lives++;
            fish.lifeNumChanged = true;
        }
        gem.destroy();
    }

    touchedEnemy(fish, clam){
        if (this.p1Fish.lives > 0) {
            this.p1Fish.lives--;
            this.p1Fish.lifeNumChanged = true;
            clam.anims.play('clamOpenAnim');
        }
    }

    touchedFinish(fish, finish){
        finish.destroy();
        // this.p1Fish.stop();
        this.time.delayedCall(600, () => {
            this.scene.resume();
            this.scene.start("levelComplete");
        }, null, this);
        // this.scene.pause();
  
        
    }
}