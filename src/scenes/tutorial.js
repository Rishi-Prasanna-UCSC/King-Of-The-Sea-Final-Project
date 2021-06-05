class Tutorial extends Phaser.Scene {
    constructor(){
        super("tutorial");
    }

    preload() {
        this.load.image('Home', 'assets/art/HouseIcon.png');
    }

    create() {
        this.homeDisp = this.add.image(720,
            100, "Home");
        this.homeDisp.setScale(0.02);
        this.homeDisp.setInteractive();
        this.homeDisp.on("pointerdown", () => {
            this.scene.stop();
            this.scene.start("menu");
            // console.log("test");
            // this.scene.stop();
        }); 

        this.movement = this.add.text(240, 160, 'Use the "WASD" keys to move around!');
        this.spiders = this.add.text(120, 200, "Use the number keys to transform as you unlock more powers!");
        this.pause = this.add.text(180, 240, "Need a break? Just hit pause on the top right!");

        this.home = this.add.text(190, 280, "Want to restart? Hit the home button below!");

        this.add.text(180, 340, "Click anywhere on the screen for more information");

        this.input.on("pointerdown", () => {
            this.scene.start("tutorialTwo");
        });
    }

    update(){
        
    }
}