class Two extends Phaser.Scene {
    constructor(){
        super("levelTwo");
    }

    preload(){
        this.load.image('Pause', 'assets/art/PauseButton.png');
        this.load.image('BG', 'assets/art/PlayBackground.png');

        this.load.image('rock', 'assets/sprites/rock.png');
        this.load.image('break', 'assets/sprites/breakableRock.png');

        this.load.spritesheet('fish', 'assets/character/fishSpritesheet.png',
            {frameWidth: 275, frameHeight: 100});
        this.load.spritesheet('clam', 'assets/sprites/clamAnimation.png', 
            {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('blueShark', 'assets/character/blueSharkSpritesheet.png',
            {frameWidth: 736, frameHeight: 258});
        this.load.spritesheet('hammerheadSharkH', 'assets/character/HammerheadSpritesheetH.png',
            {frameWidth: 630, frameHeight: 322});
        
        // Transformation gem...probably to be used as the finish line.
        this.load.image('gemT', 'assets/sprites/TransformGem.png');

        // Health gem.
        this.load.image('gemH', 'assets/sprites/HealthGem.png');

        // 
        this.load.image('lifeH', 'assets/sprites/HeartIcon.png');
        this.load.image('lostH', 'assets/sprites/NotHeartIcon.png');
    }

    create(){

        currLevel = 2;

        this.add.image(0, 0, 'BG').setOrigin(0);

        //Key Controls
        UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        ONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        TWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        THREE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

        

        //create groups
        // Walls
        this.rockGroup = this.physics.add.group();
        this.bRockGroup = this.physics.add.group();

        // Enemies
        this.clamsGroup = this.physics.add.group();
        this.BSharksGroup = this.physics.add.group();

        // Gems
        this.finGemGroup = this.physics.add.group();
        this.helGemGroup = this.physics.add.group();

        //creating player
        this.p1Fish = new HammerheadShark(this, 3320, 520, "hammerheadSharkH");
        this.currLives = 3;

        this.saveX;
        this.saveY;
        this.saveHurt;

        // Swimming Fish Animation.
        this.anims.create({
            key: 'FishSwimming',
            frames: this.anims.generateFrameNumbers('fish', {
                start: 0, end: 1
            }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'HammerSwimming',
            frames: this.anims.generateFrameNumbers('hammerheadSharkH', {
                start: 0, end: 1
            }),
            frameRate: 5,
            repeat: -1
        });
        // Clam mouth is already open.
        this.anims.create({
            key: 'clamMouthOpen',
            frames: this.anims.generateFrameNumbers('clam', {
                start: 2, end: 2
            }),
            frameRate: 2.5,
            repeat: -1
        });
        // Clam's mouth opening animation.
        this.anims.create({
            key: 'clamOpenAnim',
            frames: this.anims.generateFrameNumbers('clam', {
                start: 0, end: 2
            }),
            frameRate: 2.5,
            repeat: 0
        });
        // Blue shark swimming.
        this.anims.create({
            key: 'blueSharkSwim',
            frames: this.anims.generateFrameNumbers('blueShark', {
                start: 0, end: 1
            }),
            frameRate: 2.5,
            repeat: -1
        });
        // Blue shark eating.
        this.anims.create({
            key: 'blueSharkEat',
            frames: this.anims.generateFrameNumbers('blueShark', {
                start: 2, end: 2
            }),
            frameRate: 2.5,
        });
        // Hammerhead shark swimming horizontally.
        this.anims.create({
            key: 'hammerheadSharkSwimH',
            frames: this.anims.generateFrameNumbers('hammerheadSharkH', {
                start: 0, end: 1
            }),
            frameRate: 2.5,
            repeat: -1
        });





        // Each rock is 200 x 200 (because of scale).
        // Format:
        // 'r', lowX, highX, y    -> create row.
        // 'c', x, lowY, highY    -> create column.
        // 'i', x, y, 0           -> create individual cell.
        let wallArr = [
            // boundaries.
            false, 'r', 120, 3720, 120,
            false, 'c', 120, 320, 3720,
            false, 'r', 320, 3720, 3720,
            false, 'c', 3720, 320, 3520,

            // top right.
            false, 'r', 2520, 3520, 920,
            false, 'c', 2520, 520, 720,

        ];

        // Much easier format.
        // x, y
        let clamArr = [
            520, 320,
            920, 1720,
            1320, 1720,
            2120, 520,
            3120, 720,
            520, 3120,
            1320, 3120,
        ];

        // Blue Shark Guards.
        // x1, x2, y <- Shark moves horizontally from x1 to x2.
        let BSharkArr = [
            540, 1120, 2720,
            540, 2120, 3020,
            2020, 2920, 3320,
            1920, 3320, 340,
        ];


        
        this.spawnWalls(this.rockGroup, this.bRockGroup, wallArr);
        this.spawnClams(this.clamsGroup, clamArr);
        this.spawnBSharks(this.BSharksGroup, BSharkArr);




        this.physics.add.collider(this.p1Fish, this.rockGroup);
        this.physics.add.collider(this.p1Fish, this.bRockGroup, null, this.breakWall, this);

        

        
        let finish = this.physics.add.sprite(3500, 3500, 'gemT');
        this.finGemGroup.add(finish);
        finish.setScale(0.65);
        finish.body.immovable = true;
        finish.body.allowGravity = false;
        
        let health = this.physics.add.sprite(320, 3520, 'gemH');
        this.helGemGroup.add(health);
        health.setScale(0.65);
        health.body.immovable = true;
        health.body.allowGravity = false;

        // Blue sharks.
        

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



        this.p1Fish.setScale(0.5);
        this.p1Fish.anims.play('HammerSwimming');


        


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
        this.physics.add.collider(this.p1Fish, this.BSharksGroup, null, this.touchedBShark, this);
        this.physics.add.overlap(this.p1Fish, this.finGemGroup, null, this.touchedFinish, this);
        this.physics.add.overlap(this.p1Fish, this.helGemGroup, null, this.addLife, this);
        



        // Create camera.
        this.cameras.main.setBounds(0, 0, 4000, 4000);

        // this.cameras.main.setZoom(1); // Real
        this.cameras.main.setZoom(0.1); // Debug mode, see the entire map.
        // have camera follow copter
        // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
        this.cameras.main.startFollow(this.p1Fish, true, 1, 1);
        // set camera dead zone
        this.cameras.main.setDeadzone(100, 50);
        this.cameras.main.setName("center");
    }
    update(){
        this.p1Fish.update();
        this.saveX = this.p1Fish.x;
        this.saveY = this.p1Fish.y;
        this.saveHurt = this.p1Fish.hurt;
        if (Phaser.Input.Keyboard.JustDown(ONE)) {
            this.p1Fish.destroy();
            this.p1Fish = new Fish(this, this.saveX, this.saveY, "fish");
            this.p1Fish.hurt = this.saveHurt;
            this.p1Fish.setScale(0.5);
            this.p1Fish.anims.play('FishSwimming');
            this.p1Fish.lives = this.currLives;
            
            this.cameras.main.startFollow(this.p1Fish, true, 1, 1);
            // set camera dead zone
            this.cameras.main.setDeadzone(100, 50);
            this.cameras.main.setName("center");

            this.physics.add.collider(this.p1Fish, this.rockGroup);
            this.physics.add.collider(this.p1Fish, this.bRockGroup, null, this.breakWall, this);
            this.physics.add.collider(this.p1Fish, this.clamsGroup, null, this.touchedClam, this);
            this.physics.add.collider(this.p1Fish, this.BSharksGroup, null, this.touchedBShark, this);
            this.physics.add.overlap(this.p1Fish, this.finGemGroup, null, this.touchedFinish, this);
            this.physics.add.overlap(this.p1Fish, this.helGemGroup, null, this.addLife, this);
        }
        else if (Phaser.Input.Keyboard.JustDown(TWO)) {
            this.p1Fish.destroy();
            this.p1Fish = new HammerheadShark(this, this.saveX, this.saveY, "hammerheadSharkH");
            this.p1Fish.hurt = this.saveHurt;
            this.p1Fish.setScale(0.5);
            this.p1Fish.anims.play('HammerSwimming');
            this.p1Fish.lives = this.currLives;
            this.cameras.main.startFollow(this.p1Fish, true, 1, 1);
            // set camera dead zone
            this.cameras.main.setDeadzone(100, 50);
            this.cameras.main.setName("center");

            this.physics.add.collider(this.p1Fish, this.rockGroup);
            this.physics.add.collider(this.p1Fish, this.bRockGroup, null, this.breakWall, this);
            this.physics.add.collider(this.p1Fish, this.clamsGroup, null, this.touchedClam, this);
            this.physics.add.collider(this.p1Fish, this.BSharksGroup, null, this.touchedBShark, this);
            this.physics.add.overlap(this.p1Fish, this.finGemGroup, null, this.touchedFinish, this);
            this.physics.add.overlap(this.p1Fish, this.helGemGroup, null, this.addLife, this);
        }

        for (let i = 0; i < this.BSharksGroup.children.entries.length; i++) {
            this.BSharksGroup.children.entries[i].update();
        }
        if (!this.p1Fish.dead) {
            if (this.p1Fish.lifeNumChanged) {
                
                this.updateHearts(true);

                this.p1Fish.lifeNumChanged = false;
            }
        }
        else {
            numLevelFailed = 2;
            this.p1Fish.destroy();
            this.time.delayedCall(2800, () => {
                this.scene.start("gameOver");
            }, null, this);
        }
    }

    spawnWalls(group, bGroup, arr) {
        for (let i = 0; i < arr.length; i += 5) {
            if (arr[i+1] == 'r') {
                let row = [];
                row.push(arr[i+2], arr[i+3], arr[i+4]);
                if (arr[i]) {this.spawnRow(bGroup, row, true);}
                else {this.spawnRow(group, row, false);}
            }
            else if (arr[i+1] == 'c') {
                let col = [];
                col.push(arr[i+2], arr[i+3], arr[i+4]);
                if (arr[i]) {this.spawnCol(bGroup, col, true);}
                else {this.spawnCol(group, col, false);}
            }
            else if (arr[i+1] == 'i') {
                if (arr[i]) {this.spawnInd(bGroup, arr[i+2], arr[i+3], true);}
                else {this.spawnInd(group, arr[i+2], arr[i+3], true);}
            }
        }
    }

    spawnRow(group, arr, breakable) {
        // arr[0] = low X.
        // arr[1] = high X.
        // arr[2] = y.

        for (let i = arr[0]; i <= arr[1]; i += 200) {
            let rock1;
            if (breakable) {rock1 = this.physics.add.sprite(i, arr[2], "break");}
            else {rock1 = this.physics.add.sprite(i, arr[2], "rock");}
            group.add(rock1);
            rock1.setScale(2);
            rock1.body.immovable = true;
            rock1.body.allowGravity = false;
        }
    }
    spawnCol(group, arr, breakable) {
        // arr[0] = x.
        // arr[1] = low Y.
        // arr[2] = high Y.

        for (let i = arr[1]; i <= arr[2]; i += 200) {
            let rock1;
            if (breakable) {rock1 = this.physics.add.sprite(arr[0], i, "break");}
            else {rock1 = this.physics.add.sprite(arr[0], i, "rock");}
            
            group.add(rock1);
            rock1.setScale(2);
            rock1.body.immovable = true;
            rock1.body.allowGravity = false;
        }
    }
    spawnInd(group, x, y, breakable) {
        let rock1;
        if (breakable) {rock1 = this.physics.add.sprite(x, y, "break");}
        else {rock1 = this.physics.add.sprite(x, y, "rock");}
        
        group.add(rock1);
        rock1.setScale(2);
        rock1.body.immovable = true;
        rock1.body.allowGravity = false;
    }

    spawnClams(group, arr) {
        for (let i = 0; i < arr.length; i += 2) {
            let clam = new Enemy(this, arr[i], arr[i+1]+60, "clam");
            group.add(clam);
            clam.setScale(0.7);
            clam.body.immovable = true;
            clam.body.allowGravity = false;

            clam.anims.play('clamMouthOpen');
        }
    }

    spawnBSharks(group, arr) {
        for (let i = 0; i < arr.length; i += 3) {
            let bshark = new BlueShark(this, arr[i], arr[i+2], "blueShark");
            group.add(bshark);

            bshark.startX = arr[i];
            bshark.endX = arr[i+1];

            bshark.setScale(0.7);
            bshark.body.immovable = true;
            bshark.body.allowGravity = false;
            bshark.anims.play('blueSharkSwim');
        }
    }

    breakWall(fish, bWall) {
        if (fish.type == 'hshark') {
            bWall.destroy();
        }
        else {
            // Do nothing.
        }
    }
    
    updateHearts(triggerDead) {
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
            if (triggerDead) {
                this.p1Fish.dead = true;
            }
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
        if (fish.type == 'fish') {
            if (fish.hurt == 0) {
                if (fish.lives > 0) {
                    this.currLives--;
                    fish.lives--;
                    fish.lifeNumChanged = true;
                    fish.hurt = 200;
                    clam.anims.play('clamOpenAnim');
                }
            }
        }
        else {
            clam.destroy();
        }
    }

    touchedBShark(fish, shark) {
        if (fish.hurt == 0) {
            if (fish.lives > 1) {
                this.currLives--;
                fish.lives--;
                fish.hurt = 200;
                fish.lifeNumChanged = true;
                if (fish.type == 'hshark') {
                    shark.destroy();
                }
            }
            else {
                fish.lives--;
                fish.lifeNumChanged = true;
                this.updateHearts(true);
                if (fish.type == 'fish') {
                    shark.anims.play('blueSharkEat');
                    this.time.delayedCall(300, () => {
                        shark.anims.play('blueSharkSwim');
                    }, null, this);
                }
                else if (fish.type == 'hshark') {
                    shark.destroy();
                }
            }
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