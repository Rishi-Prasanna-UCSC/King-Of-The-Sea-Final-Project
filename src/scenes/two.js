class Two extends Phaser.Scene {
    constructor(){
        super("levelTwo");
    }

    preload(){
        this.load.image('Pause', 'assets/art/PauseButton.png');
    }

    create(){
             //creates pause button
             this.pause = this.add.image(720, 50, 'Pause');
             this.pause.setInteractive();
             this.pause.on("pointerdown", () => {
                 // this.press.visible = false;
                 this.scene.pause();
                 this.scene.launch('pauseScene');
             });

             
    }

    update(){

    }
}