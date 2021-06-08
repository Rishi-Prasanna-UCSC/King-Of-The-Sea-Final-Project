class StoryThree extends Phaser.Scene {
    constructor() {
        super("storyThree");
    }

    preload() {
        // this.load.image('Home', 'assets/art/HouseIcon.png');
    }

    create() {
        this.cameras.main.fadeIn(2000, 0, 0, 0);
        this.add.text(200, 100, "And all of a sudden, I'm now a puny little fish."); 
        this.add.text(250, 140, "Nowhere near the size of what I once was."); 
        this.add.text(180, 180, "Oh, crumbs and chips, Mister Octopus is proclaimin' \n'imself the new King of the Sea! NO WAY.");
        this.add.text(180, 220, "Arrrrrrgh, I'm gonna show that tentacle-sucker...");
        this.add.text(170, 260, "I'm going to slowly climb back up the food chain...");
        this.add.text(180, 300, "and I'll show him what a real king looks like.");

        this.input.on('pointerdown', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.time.delayedCall(1000, () => {
                this.scene.start("levelOne");
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