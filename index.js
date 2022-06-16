import demo from "./scenes/demo.js";
import firstgame from "./scenes/firstgame.js";
import Example from "./scenes/tiles.js";

var config = {
  type: Phaser.AUTO,
//     width: 800,
//     height: 600,
  width: 1024,
  height: 768,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
//   backgroundColor: "#0d0d0d",
//   parent: "phaser-example",
  scene: [Example],
};

const game = new Phaser.Game(config);

// function preload() {
//   this.load.setBaseURL("http://labs.phaser.io");

//   this.load.image("sky", "assets/skies/space3.png");
//   this.load.image("logo", "assets/sprites/phaser3-logo.png");
//   this.load.image("red", "assets/particles/red.png");
// }

// function create() {
//   this.add.image(400, 300, "sky");

//   var particles = this.add.particles("red");

//   var emitter = particles.createEmitter({
//     speed: 100,
//     scale: { start: 1, end: 0 },
//     blendMode: "ADD",
//   });

//   var logo = this.physics.add.image(400, 100, "logo");

//   logo.setVelocity(100, 200);
//   logo.setBounce(1, 1);
//   logo.setCollideWorldBounds(true);

//   emitter.startFollow(logo);
// }
