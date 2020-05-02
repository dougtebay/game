class Position {
  constructor({ x, y }) {
    Object.assign(this, { x, y });
  }

  add({ x = 0, y = 0 }) {
    this.x += x;
    this.y += y;
  }

  subtract({ x = 0, y = 0 }) {
    this.x -= x;
    this.y -= y;
  }
}

export default Position;
