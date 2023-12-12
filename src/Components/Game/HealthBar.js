import Phaser from 'phaser';

export default class HpBar extends Phaser.GameObjects.Text {
  constructor(scene) {
    super(scene);
    this.hpContainer = document.createElement('div');
    this.fillHpContainer();
    this.setPosition(0, 0);
    this.hpValue = 100;
    scene.game.canvas.parentElement.appendChild(this.hpContainer);
  }

  loseHp() {
    this.hpValue -= 10;
    this.healthLevel.style.width = `${this.hpValue}%`;
    return this.hpValue;
  }

  fillHpContainer() {
    this.hpContainer.style.width = '200px';
    this.hpContainer.style.height = '20px';
    this.hpContainer.style.border = '2px solid #330000';
    this.hpContainer.style.position = 'absolute';
    this.hpContainer.style.backgroundColor = 'white';

    this.healthLevel = document.createElement('div');
    this.healthLevel.style.width = `${this.hpValue}%`;
    this.healthLevel.style.height = '100%';
    this.healthLevel.style.backgroundColor = 'red';
    this.hpContainer.appendChild(this.healthLevel);
  }
}
