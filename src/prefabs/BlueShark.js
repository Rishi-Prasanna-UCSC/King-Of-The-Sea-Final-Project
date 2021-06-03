class BlueShark extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.startX;
        this.endX;
        this.dir = 1;
    }

    update(){
        // If you're going right,
        // If you are beyond the right point,
        // Then turn around.
        // Else, keep swimming right.
        if (this.dir == 1) {
            if (this.x >= this.endX) {
                this.dir = 0;
            }
            else if (this.x < this.endX) {
                this.flipX = true;
                this.x += 5;
            }
        }
        else if (this.dir == 0) {
            if (this.x <= this.startX) {
                this.dir = 1;
            }
            else if (this.x > this.startX) {
                this.flipX = false;
                this.x -= 5;
            }
        }
    }
}