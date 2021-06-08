class Victory extends Phaser.Scene {
    constructor() {
        super("victory");
    }

    preload() {
        // this.load.image('Home', 'assets/art/HouseIcon.png');
    }

    create() {
        // this.time.delayedCall(600, () => {
        this.cameras.main.fadeIn(2000, 0, 0, 0)
        this.add.text(130, 150, "And so my rule over the seven seas continues once again.");
        this.add.text(130, 200, "But blimey...now I really feel for the small fish.");
        this.add.text(130, 250, "It's hard for them. Maybe I'll cut down on my diet.");
        this.add.text(130, 300, "Or even better...transform into a little fish again!");
        // }, null, this);

        this.input.on('pointerdown', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.time.delayedCall(1000, () => {
                this.scene.start("menu");
            }, null, this);
        });

        this.time.delayedCall(2300, () => {
            // this.cameras.main.fadeIn(1000, 0, 0, 0)
            this.add.text(200, 340, "Click anywhere on the screen to continue").setColor('#00F000');
        }, null, this);


        // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        //     this.scene.start('phaser-logo')
        // })
    }
    update() {

    }
}