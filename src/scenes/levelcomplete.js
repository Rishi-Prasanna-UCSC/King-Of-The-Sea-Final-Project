class LevelComplete extends Phaser.Scene {
    constructor() {
        super("levelComplete");
    }
    preload() {


    }
    create() {
        this.add.text(200, 300, "Click anywhere on the screen to continue");

        this.input.on("pointerdown", () => {
            this.scene.start("levelTwo");
        });
    }
    update() {

    }
}