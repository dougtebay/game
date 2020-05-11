import Position from './Position';

class Shape {
  constructor(coordinates) {
    this.position = new Position(coordinates);
  }

  get leftSide() {
    return this.position.x;
  }

  get rightSide() {
    return this.position.x + this.width;
  }

  get topSide() {
    return this.position.y;
  }

  get bottomSide() {
    return this.position.y + this.height;
  }

  isAt({ x, y }) {
    return this.position.x === x && this.position.y === y;
  }
}

export default Shape;
