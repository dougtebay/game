class Position {
  constructor({ x, y }) {
    Object.assign(this, { x, y });

    this.correctionFactor = 10;
  }

  plus({ x = 0, y = 0 }) {
    return new Position({ x: this.add(this.x, x), y: this.add(this.y, y) });
  }

  minus({ x = 0, y = 0 }) {
    return new Position({ x: this.subtract(this.x, x), y: this.subtract(this.y, y) });
  }

  add(number1, number2) {
    return (this.correct(number1) + this.correct(number2)) / this.correctionFactor;
  }

  subtract(number1, number2) {
    return (this.correct(number1) - this.correct(number2)) / this.correctionFactor;
  }

  correct(number) {
    return number * this.correctionFactor;
  }
}

export default Position;
