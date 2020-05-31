import Member from './Member';

export const PLAYER_NAME = 'player';

class Player extends Member {
  constructor(coordinates) {
    super(coordinates);

    this.type = this.actorType;
    this.name = PLAYER_NAME;

    this.isObstacle = false;
    this.directions = { left: false, right: false, up: false };
    this.movementLength = this.width / 10;
  }

  setDirection(direction, isActive) {
    this.directions[direction] = isActive;
  }

  hasDirection(direction) {
    return this.activeDirections.includes(direction);
  }

  get activeDirections() {
    return Object.entries(this.directions)
      .filter(([, isActive]) => isActive)
      .map(([direction]) => direction);
  }

  move() {
    if (this.directions.left) this.moveLeft();
    if (this.directions.right) this.moveRight();
    if (this.directions.up) this.moveUp();

    return this;
  }

  moveLeft() {
    this.position = this.nextPositionLeft();
  }

  moveRight() {
    this.position = this.nextPositionRight();
  }

  moveUp() {
    this.position = this.nextPositionUp();
  }

  nextPositionLeft() {
    return this.position.subtract({ x: this.movementLength });
  }

  nextPositionRight() {
    return this.position.add({ x: this.movementLength });
  }

  nextPositionUp() {
    return this.position.subtract({ y: this.movementLength });
  }

  get rangeOfMotionLeft() {
    return Math.floor(this.leftSide - this.movementLength);
  }

  get rangeOfMotionRight() {
    return Math.floor(this.rightSide + this.movementLength);
  }

  get rangeOfMotionUp() {
    return Math.floor(this.topSide - this.movementLength);
  }

  get rangeOfMotionDown() {
    return Math.floor(this.bottomSide + this.movementLength);
  }
}

export default Player;
