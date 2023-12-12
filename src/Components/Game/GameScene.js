import Phaser from 'phaser';
import Player from './Player';
import Map from './Map';
import Slime from './Slime';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.hpBar = undefined;
    this.slimes = undefined;
    this.gameOver = false;
  }

  preload() {
      Player.preload(this);
      Map.preload(this);
      Slime.preload(this);
  }
  
create() {
  this.player = new Player(this, 100, 400);
  this.map = new Map(this, this.player);
  this.map.create();
  this.slimes = this.createSlimes();
  this.allowHorizontal = true;
  this.allowVertical = true;
  this.physics.add.overlap(this.player, this.slimes, this.player.onHit, null, this);
  this.cursors = this.input.keyboard.createCursorKeys();
}


update() {
  if (this.player.gameOver) {
    return;
  }
  this.slimes.getChildren().forEach(slime => {
    slime.playIdleAnimation();
  });
  // Check vertical movement
  if (this.player.allowVertical) {
    if (this.cursors.up.isDown) {
      this.player.moveUp();
    } else if (this.cursors.down.isDown) {
      this.player.moveDown();
    } else if (this.cursors.space.isDown) {
      this.player.playAttackAnimation();
    } else {
      this.player.playIdleAnimation();
    }
  }

  // Check horizontal movement
  if (this.player.allowHorizontal) {
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    } else if (this.cursors.space.isDown) {
      this.player.playAttackAnimation();
    } else {
      this.player.playIdleAnimation();
    }
  }
  }

createSlimes() {
    const numberOfSlimes = 4;
    const slimes = this.physics.add.group(); // create a new group

    for (let i = 0; i < numberOfSlimes; i += 1) {
        const randomX = Phaser.Math.Between(40, 500);
        const randomY = Phaser.Math.Between(40, 500);

        // Create a new Slime instance
        const slime = new Slime(this, randomX, randomY);

        slime.setSize(16, 16, true);
        slime.setCollideWorldBounds(true);

        // Add the slime instance to the group
        slimes.add(slime);
    }
    return slimes;
  }

}

export default GameScene;
