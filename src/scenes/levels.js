class Levels extends Phaser.Scene {
    constructor(){
        super("levelSelection");
        this.play = false;
    }

    preload() {
        // Load all the images for the levels.
        this.load.image('Lv01', 'assets/art/Level01.png');
        this.load.image('Lv02', 'assets/art/Level02.png');
        this.load.image('Lv03', 'assets/art/Level03.png');
    }

    create() {
        this.one = this.add.image(100, 220, 'Lv01');
        this.two = this.add.image(155, 220, 'Lv02');
        this.three = this.add.image(210, 220, 'Lv03');
        

        let levels = [];
        levels.push(this.one);
        levels.push(this.two);
        levels.push(this.three);

        for (let level of levels) {
            level.setScale(0.5);
        }
        this.one.setInteractive();
        this.two.setInteractive();
        this.three.setInteractive();


        this.one.on("pointerdown", () => {
            this.scene.start("levelOne");

        });

        this.two.on("pointerdown", () => {
            this.scene.start("levelTwo");

        });

        this.three.on("pointerdown", () => {
            this.scene.start("levelThree");

        });

    }

    update() {

    }
}