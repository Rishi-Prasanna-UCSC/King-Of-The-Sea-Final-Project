class Tutorial extends Phaser.Scene {
    constructor(){
        super("tutorial");
    }

    preload() {

    }

    create() {
        this.movement = this.add.text(240, 160, 'Use the "WASD" keys to move around!');
        this.spiders = this.add.text(120, 200, "Use the number keys to transform as you unlock more powers!");
        this.pause = this.add.text(180, 240, "Need a break? Just hit pause on the top right!");

        this.home = this.add.text(190, 280, "Want to restart? Hit the home button below!");

        this.add.text(200, 340, "Click anywhere on the screen to continue");

        this.input.on("pointerdown", () => {
            this.scene.start("menu");
        });
    }

    update(){
        
    }
}