class Pause extends Phaser.Scene {
    constructor() {
        super("pauseScene");
    }

    preload(){
        this.load.image('Pause', 'assets/art/PauseButton.png');
        this.load.image('MMBackground', 'assets/MainMenuBackground.png');
        this.load.image('Home', 'assets/art/HouseIcon.png');
    }

    create(){
        this.resume = this.add.image(720, 50, 'Pause');
        let pauseConfig = {
            fontFamily: 'Arial Black',
            fontSize: '32px',
            // backgroundColor: '#F3B141',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            // fixedWidth: 100
        }

        this.pauseDisp = this.add.text(360,
            100, "Paused", pauseConfig);

        this.homeDisp = this.add.image(720,
            100, "Home");
        this.homeDisp.setScale(0.02);
        
        this.resume.setInteractive();
        this.homeDisp.setInteractive();

        if (currLevel == 1){
            this.resume.on("pointerdown", () => {
                this.scene.stop();
                this.scene.resume("levelOne");
                // console.log("test");
                // this.scene.stop();
            });
        }
        else if (currLevel == 2){
            this.resume.on("pointerdown", () => {
                this.scene.stop();
                this.scene.resume("levelTwo");
                // console.log("test");
                // this.scene.stop();
            });
        }
        else {
            this.resume.on("pointerdown", () => {
                this.scene.stop();
                this.scene.resume("levelThree");
                // console.log("test");
                // this.scene.stop();
            });
        }



        this.homeDisp.on("pointerdown", () => {
            this.scene.stop();
            this.scene.start("menu");
            // console.log("test");
            // this.scene.stop();
        }); 

        

        

    }

    update(){

    }
}
