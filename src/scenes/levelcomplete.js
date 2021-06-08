class LevelComplete extends Phaser.Scene {
    constructor() {
        super("levelComplete");
    }
    preload() {


    }
    create() {
        let levelConfig = {
            // fontFamily: 'Arial Black',
            fontSize: '32px',
            // backgroundColor: '#F3B141',
            // color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            // fixedWidth: 100
        }

        let levelName = "";
        console.log(currLevel);

        // currLevel = 3; //debug

        switch(currLevel) {
            case 1:
                levelName = "One";
                this.add.text(100, 200, "Hooray! You can transform into a Hammerhead!\nHammerheads can ram red walls and kill blue sharks by ramming them,\n but ramming blue sharks still hurts! \nUse 2 to switch to a hammerhead. Use 1 to switch back to a fish!\nI can still fit through small cracks as the fish, but not the shark.");
                this.input.on("pointerdown", () => {
                    this.scene.start("levelTwo");
                });
                break;
            case 2:
                levelName = "Two";
                this.add.text(50, 200, "Yo ho ho! You can transform back into the mighty Great White!\nAs a great white, you can now eat blue sharks AND clams.\nUse 3 to switch to a great white shark.\nUse 2 to be a hammerhead and 1 for fish!\nThe great white shark cannot blast walls, or fit through cracks.");
                this.input.on("pointerdown", () => {
                    this.scene.start("levelThree");
                });
                break;
            case 3: 
                levelName = "Three";
                this.add.text(60, 240, "Congratulations!\nWe devoured the Sea King\n and restored our rule across the Seven Seas!");
                this.input.on("pointerdown", () => {
                    this.scene.start("victory");
                });
                break;
        }

        this.lev = this.add.text(200, 150, "Level " + levelName + " Complete.", levelConfig);

        this.add.text(200, 300, "Click anywhere on the screen to continue").setColor("#00F000");


    }
    update() {

    }
}