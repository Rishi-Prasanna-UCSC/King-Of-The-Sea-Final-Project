class StoryTwo extends Phaser.Scene {
    constructor() {
        super("storyTwo");
    }

    preload() {
        // this.load.image('Home', 'assets/art/HouseIcon.png');
    }

    create() {
        this.cameras.main.fadeIn(2000, 0, 0, 0);
        this.add.text(250, 100, "I was once a great white."); 
        this.add.text(220, 140, "You know the ones I'm talking about."); 
        this.add.text(200, 180, "They made a little known movie about me?");
        this.add.text(230, 220, "Sound familiar? Starts with a J?");
        this.add.text(90, 260, "I guess that fame caused me to bite off more than I could chew...");
        this.add.text(90, 300, "Because, a moment later... Poof! I was some bottom feeding herring.");

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