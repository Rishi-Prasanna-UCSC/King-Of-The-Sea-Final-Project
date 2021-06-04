class LevelComplete extends Phaser.Scene {
    constructor() {
        super("levelComplete");
    }
    preload() {


    }
    create() {
                let levelConfig = {
            // fontFamily: 'Arial Black',
            fontSize: '32px',
            // backgroundColor: '#F3B141',
            // color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            // fixedWidth: 100
        }
        this.lev = this.add.text(200, 150, "Level One Complete.", levelConfig);

        this.add.text(200, 300, "Click anywhere on the screen to continue");

        this.input.on("pointerdown", () => {
            this.scene.start("levelTwo");
        });
    }
    update() {

    }
}