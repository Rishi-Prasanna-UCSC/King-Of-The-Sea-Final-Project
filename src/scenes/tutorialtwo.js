class TutorialTwo extends Phaser.Scene {
    constructor() {
        super("tutorialTwo");
    }

    preload() {
        this.load.spritesheet('clam', 'assets/sprites/clamAnimation.png',
            { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('blueShark', 'assets/character/blueSharkSpritesheet.png',
            { frameWidth: 736, frameHeight: 258 });
        // Transformation gem...probably to be used as the finish line.
        this.load.image('gemT', 'assets/sprites/TransformGem.png');

        // Health gem.
        this.load.image('gemH', 'assets/sprites/HealthGem.png');
        
        this.load.spritesheet('blueShark', 'assets/character/blueSharkSpritesheet.png',
            {frameWidth: 736, frameHeight: 258});
    }

    create() {

        this.enemies = this.add.text(80, 80, "Enemies!"); 
        this.enemies = this.add.text(70, 100, "Avoid them!");

        this.clam = new Enemy(this, 120, 160, "clam");
        this.clam.setScale(0.7);
        // Clam mouth is already open.
        this.anims.create({
            key: 'clamOpen',
            frames: this.anims.generateFrameNumbers('clam', {
                start: 0, end: 2
            }),
            // frameRate: 6
            frameRate: 2.5,
            repeat: -1
        });
        this.clam.anims.play('clamOpen');

        this.shark = new Enemy(this, 130, 250, "blueShark");
        this.shark.setScale(0.25);

        this.anims.create({
            key: 'blueSharkSwim',
            frames: this.anims.generateFrameNumbers('blueShark', {
                start: 0, end: 2
            }),
            frameRate: 2.5,
            repeat: -1
        });

        this.shark.anims.play("blueSharkSwim");

        this.healthText = this.add.text(350, 80, "Collect me to ");
        this.healthText2 = this.add.text(340, 100, "restore health!");
        this.health = this.add.image(410, 200, "gemH");
        this.health.setScale(0.5);

        this.healthText = this.add.text(600, 80, "Collect me to ");
        this.healthText2 = this.add.text(590, 100, "win and evolve!");
        this.health = this.add.image(660, 200, "gemT");
        this.health.setScale(0.5);
        


        this.add.text(200, 340, "Click anywhere on the screen to continue").setColor('#00F000');

        this.input.on("pointerdown", () => {
            this.scene.start("menu");
        });
    }

    update() {

    }
}