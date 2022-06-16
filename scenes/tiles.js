class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.setBaseURL("http://labs.phaser.io");
    this.load.atlas(
      "isoblocks",
      "assets/atlas/isoblocks.png",
      "assets/atlas/isoblocks.json"
    );
    //     this.load.setBaseURL("../assets/Tiles/");
    //     this.load.image("castleCenterE", "castle_center_E.png");
    //     this.load.image("grassCenterE", "grass_center_E.png");
  }

  create() {
    var frames = this.textures.get("isoblocks").getFrameNames();
    console.log(frames);
    //  blocks are 50x50
    //     const [tileImage] = this.textures.get("castleCenterE").source;
    //     console.log(tileImage);

    //     const kapa = this.add
    //       .image(0, 0, "castleCenterE")
    //       .setOrigin(0.5, 0.4)
    //       .setInteractive()
    //       .on("pointermove", (e) => {
    //         console.log("on: ", e);
    //       });

    //     kapa.on("pointerdown", (e) => {
    //       console.log("click:", e);
    //     });
    //     kapa.on("pointerout", (e) => {
    //       console.log("out: ", e);
    //     });

    var mapWidth = 40;
    var mapHeight = 40;

    var tileWidthHalf = 20;
    var tileHeightHalf = 12;
    //     var tileWidthHalf = (tileImage.width * 0.902) / 2;
    //     var tileHeightHalf = (tileImage.height * 0.3) / 2;

    var centerX = (mapWidth / 2) * tileWidthHalf;
    var centerY = -100;

    var blocks = [];

    for (var y = 0; y < mapHeight; y++) {
      for (var x = 0; x < mapWidth; x++) {
        var tx = (x - y) * tileWidthHalf;
        var ty = (x + y) * tileHeightHalf;

        var block = x % 2 === 0 ? "block-123" : "block-132";
        // var block = x % 2 === 0 ? "castleCenterE" : "grassCenterE";

        var tile = this.add.image(
          centerX + tx,
          centerY + ty,
          "isoblocks",
          block
        );

        // var tile = this.add
        //   .image(centerX + tx, centerY + ty, block)
        //   .setOrigin(0.5, 0.4);

        tile.setData("row", x);
        tile.setData("col", y);

        tile.setDepth(centerY + ty);

        blocks.push(tile);
      }
    }
    console.log(blocks.length);
    blocks.forEach((element, index) => {
      element
        .setInteractive()
        // .on("pointermove", (e) => {
        //   console.log("move: ", e);
        //   element.setTint(0x00ff0000);
        // })
        .on("pointerover", (e) => {
          console.log("over: ", e);
          element.setTint(0x00ff0000);
        })
        .on("pointerdown", (e) => {
          console.log("down: ", e.x, e.y);
          blocks.splice(index, 1);
          element.destroy();
        })
        .on("pointerout", (e) => {
          console.log("out: ", e);
          element.setTint();
        });
    });

    //     this.tweens.add({
    //       targets: blocks,

    //       x: function (target, key, value) {
    //         return value - (30 - target.getData("col") * 4);
    //       },

    //       y: function (target, key, value) {
    //         return value - target.getData("row") * 5;
    //       },

    //       yoyo: true,
    //       ease: "Sine.easeInOut",
    //       repeat: -1,
    //       duration: 700,
    //       delay: function (target, key, value, targetIndex, totalTargets, tween) {
    //         return target.getData("row") * 60 + target.getData("col") * 60;
    //       },
    //     });

    const cursors = this.input.keyboard.createCursorKeys();

    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      zoomIn: cursors.up,
      zoomOut: cursors.down,
      acceleration: 0.04,
      drag: 0.0005,
      maxSpeed: 0.7,
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig
    );

    //     this.cameras.main.zoom = 0.1;
    this.cameras.main.zoom = 0.62;
    console.log(this.cameras.main.zoom);
    this.cameras.main.scrollX = -110;

    //     cria o evento que escuta o movimento do mouse
    //     this.input.on("pointermove", function (pointer) {
    //       console.log(pointer);
    //     });
    this.input.on(
      "wheel",
      function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        this.cameras.main.zoom += this.cameras.main.zoom * (-deltaY / 1000);
      }
    );
  }

  update(time, delta) {
    this.controls.update(delta);
  }
}

export default Example;
