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
        this.add.image(0, 0, 'BG').setOrigin(0);

        //Key Controls
        UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        

        //create groups
        // Walls
        this.rockGroup = this.physics.add.group();

        // Enemies
        this.clamsGroup = this.physics.add.group();
        this.sharksGroup = this.physics.add.group();

        // Gems
        this.finGemGroup = this.physics.add.group();
        this.helGemGroup = this.physics.add.group();

        //creating player
        this.p1Fish = new Fish(this, 300, 340, "fish");

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


        // Each rock is 200 x 200 (because of scale).
        // Format:
        // 'r', lowX, highX, y    -> create row.
        // 'c', x, lowY, highY    -> create column.
        // 'i', x, y, 0           -> create individual cell.
        let wallArr = [
            'r', 120, 1700, 120,
            'c', 120, 320, 920
        ];


        
        this.spawnWalls(this.rockGroup, wallArr);
        //this.spawnClams(this.clamsGroup);




        this.physics.add.collider(this.p1Fish, this.rockGroup);

        

        
        let finish = this.physics.add.sprite(3700, 3700, 'gemT');
        this.finGemGroup.add(finish);
        finish.setScale(0.65);
        finish.body.immovable = true;
        finish.body.allowGravity = false;
        /*
        let health = this.physics.add.sprite(300, 100, 'gemH');
        this.helGemGroup.add(health);
        health.setScale(0.65);
        health.body.immovable = true;
        health.body.allowGravity = false;
        */

        // Lives.
        this.heart1 = this.add.sprite(50, 50, 'lifeH');
        this.heart1.setScale(1.4);
        this.heart1.setScrollFactor(0);
        this.heart2 = this.add.sprite(110, 50, 'lifeH');
        this.heart2.setScale(1.4);
        this.heart2.setScrollFactor(0);
        this.heart3 = this.add.sprite(170, 50, 'lifeH');
        this.heart3.setScale(1.4);
        this.heart3.setScrollFactor(0);



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


        


        //creates pause button
        this.pause = this.add.image(720, 50, 'Pause');
        this.pause.setInteractive();
        this.pause.on("pointerdown", () => {
            // this.press.visible = false;
            this.scene.pause();
            this.scene.launch('pauseScene');
        });
        this.pause.setScrollFactor(0);
        
        this.physics.add.collider(this.p1Fish, this.clamsGroup, null, this.touchedClam, this);
        this.physics.add.overlap(this.p1Fish, this.finGemGroup, null, this.touchedFinish, this);
        this.physics.add.overlap(this.p1Fish, this.helGemGroup, null, this.addLife, this);



        // Create camera.
        this.cameras.main.setBounds(0, 0, 4000, 4000);

        // this.cameras.main.setZoom(1); // Real
        this.cameras.main.setZoom(0.1); // Debug mode, see the entire map.
        // have camera follow copter
        // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
        this.cameras.main.startFollow(this.p1Fish, true, 0.5, 0.5);
        // set camera dead zone
        this.cameras.main.setDeadzone(100, 50);
        this.cameras.main.setName("center");
    }

    spawnWalls(group, arr) {
        for (let i = 0; i < arr.length; i += 4) {
            if (arr[i] == 'r') {
                let row = [];
                row.push(arr[i+1], arr[i+2], arr[i+3]);
                this.spawnRow(group, row);
            }
            else if (arr[i] == 'c') {
                let col = [];
                col.push(arr[i+1], arr[i+2], arr[i+3]);
                this.spawnCol(group, col);
            }
        }
    }

    spawnRow(group, arr) {
        // arr[0] = low X.
        // arr[1] = high X.
        // arr[2] = y.

        for (let i = arr[0]; i <= arr[1]; i += 200) {
            let rock1 = this.physics.add.sprite(i, arr[2], "rock");
            group.add(rock1);
            rock1.setScale(2);
            rock1.body.immovable = true;
            rock1.body.allowGravity = false;
        }
    }
    spawnCol(group, arr) {
        // arr[0] = x.
        // arr[1] = low Y.
        // arr[2] = high Y.

        for (let i = arr[1]; i <= arr[2]; i += 200) {
            let rock1 = this.physics.add.sprite(arr[0], i, "rock");
            group.add(rock1);
            rock1.setScale(2);
            rock1.body.immovable = true;
            rock1.body.allowGravity = false;
        }
    }

    spawnClams(group) {
        let clam = new Enemy(this, 300, 340, "clam");
        group.add(clam);
        clam.body.immovable = true;
        clam.body.allowGravity = false;

        clam.anims.play('clamMouthOpen');
    }

    update(){
        
        this.p1Fish.update();
        if (!this.p1Fish.dead) {
            if (this.p1Fish.lifeNumChanged) {
                if (this.p1Fish.lives == 3) {
                    this.heart3.destroy();
                    this.heart3 = this.add.sprite(170, 50, 'lifeH');
                    this.heart3.setScale(1.4);
                    this.heart3.setScrollFactor(0);
                    this.heart2.destroy();
                    this.heart2 = this.add.sprite(110, 50, 'lifeH');
                    this.heart2.setScale(1.4);
                    this.heart2.setScrollFactor(0);
                    this.heart1.destroy();
                    this.heart1 = this.add.sprite(50, 50, 'lifeH');
                    this.heart1.setScale(1.4);
                    this.heart1.setScrollFactor(0);
                }
                if (this.p1Fish.lives == 2) {
                    this.heart3.destroy();
                    this.heart3 = this.add.sprite(170, 50, 'lostH');
                    this.heart3.setScale(1.4);
                    this.heart3.setScrollFactor(0);
                    this.heart2.destroy();
                    this.heart2 = this.add.sprite(110, 50, 'lifeH');
                    this.heart2.setScale(1.4);
                    this.heart2.setScrollFactor(0);
                    this.heart1.destroy();
                    this.heart1 = this.add.sprite(50, 50, 'lifeH');
                    this.heart1.setScale(1.4);
                    this.heart1.setScrollFactor(0);
                }
                else if (this.p1Fish.lives == 1) {
                    this.heart3.destroy();
                    this.heart3 = this.add.sprite(170, 50, 'lostH');
                    this.heart3.setScale(1.4);
                    this.heart3.setScrollFactor(0);
                    this.heart2.destroy();
                    this.heart2 = this.add.sprite(110, 50, 'lostH');
                    this.heart2.setScale(1.4);
                    this.heart2.setScrollFactor(0);
                    this.heart1.destroy();
                    this.heart1 = this.add.sprite(50, 50, 'lifeH');
                    this.heart1.setScale(1.4);
                    this.heart1.setScrollFactor(0);
                }
                else if (this.p1Fish.lives == 0) {
                    this.heart3.destroy();
                    this.heart3 = this.add.sprite(170, 50, 'lostH');
                    this.heart3.setScale(1.4);
                    this.heart3.setScrollFactor(0);
                    this.heart2.destroy();
                    this.heart2 = this.add.sprite(110, 50, 'lostH');
                    this.heart2.setScale(1.4);
                    this.heart2.setScrollFactor(0);
                    this.heart1.destroy();
                    this.heart1 = this.add.sprite(50, 50, 'lostH');
                    this.heart1.setScale(1.4);
                    this.heart1.setScrollFactor(0);
                    this.p1Fish.setVisible(false);
                    this.p1Fish.dead = true;
                }


                this.p1Fish.lifeNumChanged = false;
            }
        }
        else {
            numLevelFailed = 1;
            this.time.delayedCall(2000, () => {
                this.scene.start("gameOver");
            }, null, this);
        }
    }

    addLife(fish, gem) {
        if (fish.lives < 3) {
            fish.lives++;
            fish.lifeNumChanged = true;
        }
        gem.destroy();
    }

    touchedClam(fish, clam){
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