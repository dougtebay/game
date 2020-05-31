class Position {
  constructor({ x, y }) {
    Object.assign(this, { x, y });
  }

  add({ x = 0, y = 0 }) {
    return new Position({ x: this.x + x, y: this.y + y });
  }

  subtract({ x = 0, y = 0 }) {
    return new Position({ x: this.x - x, y: this.y - y });
  }
}

export default Position;
