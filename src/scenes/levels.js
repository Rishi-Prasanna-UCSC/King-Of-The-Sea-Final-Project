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
        this.load.image('Lv04', 'assets/art/Level04.png');
        this.load.image('Lv05', 'assets/art/Level05.png');
    }

    create() {
        let levels = [];
        levels.push(this.add.image(100, 220, 'Lv01'));
        levels.push(this.add.image(155, 220, 'Lv02'));
        levels.push(this.add.image(210, 220, 'Lv03'));
        levels.push(this.add.image(265, 220, 'Lv04'));
        levels.push(this.add.image(320, 220, 'Lv05'));

        for (let level of levels) {
            level.setScale(0.5);
        }

    }

    update() {

    }
}