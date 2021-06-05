class StoryOne extends Phaser.Scene {
    constructor() {
        super("storyOne");
    }

    preload() {
        // this.load.image('Home', 'assets/art/HouseIcon.png');
    }

    create() {
        // this.time.delayedCall(600, () => {
        this.cameras.main.fadeIn(2000, 0, 0, 0)
        this.add.text(300, 150, "What am I you ask?");
        this.add.text(180, 200, "Well, I was once at the top of the food chain,");
        this.add.text(250, 250, "a king of the sea if you will...");
        this.add.text(230, 300, "Or so I thought... Where do I begin?");
        // }, null, this);

        this.input.on('pointerdown', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.time.delayedCall(1000, () => {
                this.scene.start("storyTwo");
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