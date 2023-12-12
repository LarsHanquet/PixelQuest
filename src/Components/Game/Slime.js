import Phaser from 'phaser';
import slimeAsset from '../../assets/sprites/characters/slime.png';

class Slime extends Phaser.Physics.Arcade.Sprite {
    static SLIME_KEY = 'slime';

    constructor(scene, x, y) {
        super(scene, x, y, Slime.SLIME_KEY);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setSize(16, 16, true);
        this.setCollideWorldBounds(true);
        this.createAnims();
        this.setDepth(1);
    }

    static preload(scene) {
        scene.load.spritesheet(Slime.SLIME_KEY, slimeAsset, {
        frameWidth: 32,
        frameHeight: 32,
        });
    }


    createAnims() {
        // Add slime animations here
        this.anims.create({
            key: 'slime-idle',
            frames: this.anims.generateFrameNumbers(Slime.SLIME_KEY, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'slime-jump',
            frames: this.anims.generateFrameNumbers(Slime.SLIME_KEY, { start: 7, end: 12 }),
            frameRate: 10,
            repeat: -1,
        })
    }

    playIdleAnimation() {
            this.once('animationcomplete', (animation) => {
                if (animation.key === 'slime-jump') {
                    this.anims.play('slime-idle', true);
                } else if (animation.key === 'slime-idle') {
                    this.anims.play('slime-jump', true);
                }
            });

            this.anims.play('slime-jump', true);
        }
    }

export default Slime;
