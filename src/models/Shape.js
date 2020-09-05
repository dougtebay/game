import { LEFT, RIGHT } from '../constants'
import Position from './Position'

class Shape {
  constructor (coordinates) {
    this.position = new Position(coordinates)

    this.width = this.constructor.width
    this.height = this.constructor.height
  }

  get leftSide () {
    return this.position.x
  }

  get rightSide () {
    return this.position.x + this.width
  }

  get topSide () {
    return this.position.y
  }

  get bottomSide () {
    return this.position.y + this.height
  }

  isAt (position) {
    return this.position.x === position.x && this.position.y === position.y
  }

  overlapsOn (side, shape) {
    if (side === LEFT) return this.leftSide < shape.rightSide
    if (side === RIGHT) return this.rightSide > shape.leftSide
  }
}

Shape.width = 1
Shape.height = 1

export default Shape
