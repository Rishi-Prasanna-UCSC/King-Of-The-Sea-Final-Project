class Coconut extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update(){
        this.x -= 5;
        if (this.x < -100) {
            this.destroy();
        }
    }
}