class Pause extends Phaser.Scene {
    constructor() {
        super("pauseScene");
    }

    preload(){
        this.load.image('Pause', 'assets/art/PauseButton.png');
        this.load.image('MMBackground', 'assets/MainMenuBackground.png');
    }

    create(){
        this.resume = this.add.image(720, 50, 'Pause');
        let pauseConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            // fixedWidth: 100
        }

        this.pauseDisp = this.add.text(360,
            100, "Paused", pauseConfig);

        this.homeDisp = this.add.text(360,
            150, "Home", pauseConfig);
        
        this.resume.setInteractive();
        this.homeDisp.setInteractive();

        this.resume.on("pointerdown", () => {
            this.scene.stop();
            this.scene.resume("levelOne");
            // console.log("test");
            // this.scene.stop();
        });

        this.homeDisp.on("pointerdown", () => {
            this.scene.stop("levelOne");
            this.scene.start("menuScene");
            // console.log("test");
            // this.scene.stop();
        }); 

        

        

    }

    update(){

    }
}
