class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.movementSpeed = 4;

    }

    update(){
        if (UP.isDown){
            // console.log("up");
            this.y -= this.movementSpeed;
        }
        if (DOWN.isDown){
            // console.log("down");
            this.y += this.movementSpeed;
        }
        if (LEFT.isDown){
            // console.log("left");
            this.x -= this.movementSpeed;
        }
        if (RIGHT.isDown){
            // console.log("right");
            this.x += this.movementSpeed;
        }


    }
}