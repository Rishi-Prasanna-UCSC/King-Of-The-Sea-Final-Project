class SeaKing extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        this.lives = 3;
        this.idle = true;
        this.idlePeriod = 0;
        this.originalY = this.y;
        this.hurt = 0;
        this.throw = false;
    }

    update(){
        if (!this.throw) {
            this.idlePeriod++;
        }

        if (this.hurt > 0) {
            this.hurt--;
            if ((this.hurt % 4 == 0) || (this.hurt % 4 == 1)) {
                this.setVisible(true);
            }
            else if ((this.hurt % 4 == 2) || (this.hurt % 4 == 3)) {
                this.setVisible(false);
            }
        }

        if (this.idlePeriod % 60 == 0) {
            this.y = this.originalY;
        }
        else if (this.idlePeriod % 30 == 0) {
            this.y = this.originalY - 10;
        }
    }
}