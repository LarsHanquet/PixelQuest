import Phaser from 'phaser';

export default class Score extends Phaser.GameObjects.Text {
    constructor(scene) {
        super(scene);
        this.score = 0;
        this.timer = setInterval(this.autoUpdateScore, 10000);
    }

    autoUpdateScore() {
        this.score += 10;
    }
}
