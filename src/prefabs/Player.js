class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.movementSpeed = 4;

    }

    update(){
        if (keyW.isDown){
            this.y -= this.movementSpeed;
        }
        if (keyS.isDown){
            this.y += this.movementSpeed;
        }
        if (keyA.isDown){
            this.x -= this.movementSpeed;
        }
        if (keyD.isDown){
            this.x += this.movementSpeed;
        }

        
    }
}