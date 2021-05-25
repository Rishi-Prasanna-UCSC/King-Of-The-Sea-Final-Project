class Tutorial extends Phaser.Scene {
    constructor(){
        super("tutorial");
    }

    preload() {

    }

    create() {
        this.movement = this.add.text(240, 180, 'Use the "WASD" keys to move around!');
        // this.spiders = this.add.text(180, 220, "Watch out for spiders! And avoid the crevices!");
        this.pause = this.add.text(180, 260, "Need a break? Just hit pause on the top right!");
        this.add.text(200, 300, "Click anywhere on the screen to continue");

        this.input.on("pointerdown", () => {
            this.scene.start("menu");
        });
    }

    update(){
        
    }
}