class GreatWhiteShark extends Player {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.lives = 3;
        this.lifeNumChanged = false;
        this.dead = false;
        this.immobilized = false;
        this.hurt = 0;

        // Check which creature it is.
        this.type = 'gwshark';
    }

    update(){
        if ((!this.dead) && (!this.immobilized)) {
            if (this.hurt > 0) {
                this.hurt--;
                if ((this.hurt % 4 == 0) || (this.hurt % 4 == 1)) {
                    this.setVisible(true);
                }
                else if ((this.hurt % 4 == 2) || (this.hurt % 4 == 3)) {
                    this.setVisible(false);
                }
            }
            if (Phaser.Input.Keyboard.JustDown(LEFT)) {
                this.flipX = false;
                this.setBodySize(738, 310);
                this.angle = 0;
                this.setVelocityY(0);
                this.setVelocityX(-swimSpeed * 1.25);
            }
            else if (Phaser.Input.Keyboard.JustDown(RIGHT)) {
                this.flipX = true;
                this.setBodySize(738, 310);
                this.angle = 0;
                this.setVelocityY(0);
                this.setVelocityX(swimSpeed * 1.25);
            }
            else if (Phaser.Input.Keyboard.JustDown(UP)) {
                this.flipX = true;
                this.setBodySize(310, 738);
                this.angle = 270;
                this.setVelocityX(0);
                this.setVelocityY(-swimSpeed * 1.25);
            }
            else if (Phaser.Input.Keyboard.JustDown(DOWN)) {
                this.flipX = false;
                this.setBodySize(310, 738);
                this.angle = 270;
                this.setVelocityX(0);
                this.setVelocityY(swimSpeed * 1.25);
            }
        }
    }
}