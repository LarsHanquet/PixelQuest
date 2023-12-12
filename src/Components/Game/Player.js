import Phaser from 'phaser';
import playerAsset from '../../assets/sprites/characters/player.png';
import HpBar from './HealthBar';

class Player extends Phaser.Physics.Arcade.Sprite {
    static PLAYER_KEY = 'player';

    constructor(scene, x, y) {
        super(scene, x, y, Player.PLAYER_KEY);
        scene.add.existing(this);
        this.gameOver = false;
        scene.physics.add.existing(this);
        this.setOffset(16, 20);
        this.setSize(16, 20, false);
        this.setCollideWorldBounds(true);
        this.createAnims();
        this.allowHorizontal = true;
        this.allowVertical = true;
        this.setDepth(1);
        this.hpBar = new HpBar(scene);
    }

    static preload(scene) {
        scene.load.spritesheet(Player.PLAYER_KEY, playerAsset, {
            frameWidth: 48,
            frameHeight: 48,
        });
    }

    createAnims() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(Player.PLAYER_KEY, { start: 24, end: 29 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'idle-down',
            frames: this.anims.generateFrameNumbers(Player.PLAYER_KEY, { start: 0, end: 5 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'idle-side',
            frames: this.anims.generateFrameNumbers(Player.PLAYER_KEY, { start: 6, end: 11 }),
            frameRate: 20,
            repeat: -1,
        });

            this.anims.create({
            key: 'idle-up',
            frames: this.anims.generateFrameNumbers(Player.PLAYER_KEY, { start: 12, end: 17 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(Player.PLAYER_KEY, { start: 24, end: 29 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers(Player.PLAYER_KEY, { start: 30, end: 35 }),
        frameRate: 10,
        repeat: -1,
        });

        this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers(Player.PLAYER_KEY, { start: 18, end: 23 }),
        frameRate: 10,
        });

        this.anims.create({
        key: 'attack-down',
        frames: this.anims.generateFrameNumbers(Player.PLAYER_KEY, { start: 37, end: 39 }),
        frameRate: 6,
        });

        this.anims.create({
        key: 'attack-side',
        frames: this.anims.generateFrameNumbers(Player.PLAYER_KEY, { start: 42, end: 45 }),
        frameRate: 6,
        });

        this.anims.create({
        key: 'attack-up',
        frames: this.anims.generateFrameNumbers(Player.PLAYER_KEY, { start: 48, end: 51 }),
        frameRate: 6,
        });

        this.anims.create({
        key: 'player-death',
        frames: this.anims.generateFrameNumbers(Player.PLAYER_KEY, { start: 54, end: 56 }),
        frameRate: 10,
        });
    }

    playDeathAnimation() {
    // Add logic for playing death animation
        this.anims.play('player-death', true);
    }

    onHit = () => {
        if (this.hpBar.loseHp() <= 0) {
            this.playDeathAnimation();
            this.gameOver = true;
            
        }
        this.setVelocity(0);
        if (this.direction === 'right') {
            this.x -= 20;
        } else if (this.direction === 'left') {
            this.x += 20;
        } else if (this.direction === 'up') {
            this.y += 20;
        } else if (this.direction === 'down') {
            this.y -= 20;
        }
    }


    playIdleAnimation() {
        this.setVelocity(0);
        this.allowHorizontal = true;
        this.allowVertical = true;

        if (this.direction === 'left') {
            this.anims.play('idle-side', true);
        } else if (this.direction === 'right') {
            this.anims.play('idle-side', true);
        } else if (this.direction === 'up') {
            this.anims.play('idle-up', true);
        } else {
            this.anims.play('idle-down', true);
        }

    }

    playAttackAnimation() {
    this.allowHorizontal = false;
    this.allowVertical = false;
    if (this.direction === 'left') {
    this.anims.play('attack-side', true);
    }
    else if (this.direction === 'right') {
    this.anims.play('attack-side', true);
    }
    else if (this.direction === 'up') {
    this.anims.play('attack-up', true);
    }
    else if (this.direction === 'down') {
    this.anims.play('attack-down', true);
    }
    this.on('animationcomplete', () => {
        this.allowHorizontal = true;
        this.allowVertical = true;
        }, this);
    }

    moveRight() {
        this.setVelocityX(80);
        this.flipX = false;
        this.direction = 'right';
        this.anims.play('right', true);
        this.allowVertical = false;
    }

    moveLeft() {
        this.setVelocityX(-80);
        this.flipX = true;
        this.direction = 'left';
        this.anims.play('left', true);
        this.allowVertical = false;
    }

    moveUp() {
        this.setVelocityY(-80);
        this.direction = 'up';
        this.anims.play('up', true);
        this.allowHorizontal = false;
    }

    moveDown() {
        this.setVelocityY(80);
        this.direction = 'down';
        this.anims.play('down', true);
        this.allowHorizontal = false;
    }

}

export default Player;
