class StoryThree extends Phaser.Scene {
    constructor() {
        super("storyTwo");
    }

    preload() {
        // this.load.image('Home', 'assets/art/HouseIcon.png');
    }

    create() {
        this.cameras.main.fadeIn(2000, 0, 0, 0);
        this.add.text(280, 100, "So that's my life story."); 
        this.add.text(285, 140, "I'm now some puny fish"); 
        this.add.text(220, 180, "because some magic sea king was pissy.");
        this.add.text(280, 220, "So, what's next for me?");
        this.add.text(170, 260, "I'm going to slowly climb back up the food chain, ");
        this.add.text(180, 300, "and I'll show him what a real king looks like.");

        this.input.on('pointerdown', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.time.delayedCall(1000, () => {
                this.scene.start("levelOne");
                console.log("test");
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