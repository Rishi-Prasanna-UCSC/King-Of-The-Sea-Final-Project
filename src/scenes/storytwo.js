class StoryTwo extends Phaser.Scene {
    constructor() {
        super("storyTwo");
    }

    preload() {
        // this.load.image('Home', 'assets/art/HouseIcon.png');
    }

    create() {
        this.cameras.main.fadeIn(2000, 0, 0, 0);
        this.add.text(250, 100, "I was once a great white shark."); 
        this.add.text(120, 140, "You know the ones I'm talking about.\nBlimey, they made a movie about me?");
        this.add.text(90, 260, "I savvy that attitude tempted me to bite off more than I could chew.");
        this.add.text(130, 300, "Anywho, ye, I remember now. I saw this big flash of light...");

        this.input.on('pointerdown', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.time.delayedCall(1000, () => {
                this.scene.start("storyThree");
            }, null, this);

        });

        this.time.delayedCall(2300, () => {
            // this.cameras.main.fadeIn(1000, 0, 0, 0)
            this.add.text(200, 340, "Click anywhere on the screen to continue").setColor('#00F000');
        }, null, this);
    }
    update() {

    }
}