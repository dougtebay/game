import Member from './Member';

export const PLAYER_NAME = 'player';

class Player extends Member {
  constructor(coordinates) {
    super(coordinates);

    this.type = this.actorType;
    this.name = PLAYER_NAME;
    this.directions = { left: false, right: false, up: false };
    this.speed = 0.1;
  }

  setDirection(direction, isActive) {
    this.directions[direction] = isActive;
  }

  move() {
    if (this.directions.left) this.moveLeft();
    if (this.directions.right) this.moveRight();
    if (this.directions.up) this.moveUp();

    return this;
  }

  moveLeft() {
    this.position.subtract({ x: this.speed });
  }

  moveRight() {
    this.position.add({ x: this.speed });
  }

  moveUp() {
    this.position.subtract({ y: this.speed });
  }
}

export default Player;
