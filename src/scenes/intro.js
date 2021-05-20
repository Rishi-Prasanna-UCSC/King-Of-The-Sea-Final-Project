class Intro extends Phaser.Scene {
    constructor(){
        super("intro");
        this.play = false;
    }

    preload() {
        this.load.audio('Text', 'assets/sounds/IntroSound.wav');
        this.load.audio('Hide', 'assets/sounds/IntroSoundHideText.wav');
    }

    create() {

        this.press = this.add.text(220, 220, 'Click on the screen to start the game');
        this.input.on("pointerdown", () => {
            this.press.visible = false;
            this.playIntro();
        });
    }

    update() {

    }

    playIntro() {
        this.created = this.time.delayedCall(400, () => {
            this.createdBy = this.add.text(340, 210, 'Created by:');
            this.playSoundText();
        }, null, this);
        this.names = this.time.delayedCall(1200, () => {
            this.nameCredits = this.add.text(200, 230, 'Jarrett Mao, Rishi Prasanna, Felix Tham');
            this.playSoundText();
        }, null, this);
        this.hideText = this.time.delayedCall(2700, () => {
            this.createdBy.visible = false;
            this.nameCredits.visible = false;
            this.playSoundHide();
        }, null, this);
        this.loadMainMenu = this.time.delayedCall(3400, () => {
            this.scene.start("menuScene");
        }, null, this);
    }
    playSoundText() {
        this.sound.play('Text'); 
    }
    playSoundHide() {
        this.sound.play('Hide'); 
    }
}