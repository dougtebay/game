import Member from './Member';
import { combinations, range } from '../utilities';

export const PLAYER_NAME = 'player';

class Player extends Member {
  constructor(coordinates) {
    super(coordinates);

    this.type = this.actorType;
    this.name = PLAYER_NAME;

    this.directions = { left: false, right: false, up: false };
    this.movementLength = this.width / 10;
  }

  setDirection(direction, isActive) {
    this.directions[direction] = isActive;
  }

  get hasDirection() {
    return Object.values(this.directions).some(Boolean);
  }

  move() {
    if (this.directions.left) this.moveLeft();
    if (this.directions.right) this.moveRight();
    if (this.directions.up) this.moveUp();

    return this;
  }

  moveLeft() {
    this.position = this.position.minus({ x: this.movementLength });
  }

  moveRight() {
    this.position = this.position.plus({ x: this.movementLength });
  }

  moveUp() {
    this.position = this.position.minus({ y: this.movementLength });
  }

  get rangeOfMotionCoordinates() {
    const { x, y } = this.rangeOfMotion;
    const xRange = range(x.start, x.end);
    const yRange = range(y.start, y.end);

    return combinations(xRange, yRange).map(([x, y]) => ({ x, y }));
  }

  get rangeOfMotion() {
    return { ...this.rangeOfHorizontalMotion, ...this.rangeOfVerticalMotion };
  }

  get rangeOfHorizontalMotion() {
    return { x: { start: this.rangeOfMotionLeft, end: this.rangeOfMotionRight } };
  }

  get rangeOfVerticalMotion() {
    return { y: { start: this.rangeOfMotionUp, end: this.rangeOfMotionDown } };
  }

  get rangeOfMotionLeft() {
    return Math.floor(this.leftSide - this.movementLength);
  }

  get rangeOfMotionRight() {
    return Math.floor(this.rightSide);
  }

  get rangeOfMotionUp() {
    return Math.floor(this.topSide - this.movementLength);
  }

  get rangeOfMotionDown() {
    return Math.floor(this.bottomSide);
  }
}

export default Player;
