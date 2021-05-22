class One extends Phaser.Scene {
    constructor(){
        super("levelOne");
    }

    preload(){
        this.load.image('spider', 'assets/art/Spider.png'); //debug
        this.load.image('Pause', 'assets/art/PauseButton.png');
    }

    create(){

        //Key Controls
        UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //creating player
        this.p1Fish = new Player(this, 100, 340, "spider");

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
        this.p1Fish.update();
    }
}