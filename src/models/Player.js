import { DOWN, LEFT, PLAYER_NAME, RIGHT } from '../constants'
import Member from './Member'
import Position from './Position'

class Player extends Member {
  constructor (coordinates) {
    super(coordinates)

    this.type = this.actorType
    this.name = PLAYER_NAME

    this.isObstacle = false
    this.directions = []
    this.movementLength = this.width / 5
  }

  toggleDirection (direction, isActive) {
    isActive ? this.addDirection(direction) : this.removeDirection(direction)
  }

  addDirection (direction) {
    if (!this.directionIsSet(direction)) this.setDirection(direction)
  }

  removeDirection (direction) {
    if (this.directionIsSet(direction)) this.unsetDirection(direction)
  }

  directionIsSet (direction) {
    return this.indexOfDirection(direction) > -1
  }

  setDirection (direction) {
    this.directions.push(direction)
  }

  unsetDirection (direction) {
    this.directions.splice(this.indexOfDirection(direction), 1)
  }

  indexOfDirection (direction) {
    return this.directions.indexOf(direction)
  }

  get isBeingDirected () {
    return Boolean(this.directions.length)
  }

  isBeingDirectedTo (direction) {
    return this.directions.includes(direction)
  }

  move () {
    this.directions.forEach(side => this.moveTo(side))
  }

  moveTo (side) {
    this.position = this.nextPosition(side)
  }

  nextPosition (side) {
    if (side === DOWN) return this.moveDown()
    if (side === LEFT) return this.moveLeft()
    if (side === RIGHT) return this.moveRight()

    return this.position
  }

  moveDown () {
    return this.position.add({ y: this.movementLength })
  }

  moveLeft () {
    return this.position.subtract({ x: this.movementLength })
  }

  moveRight () {
    return this.position.add({ x: this.movementLength })
  }

  isCollidingWith (obstacle) {
    return this.directions.some(side => this.overlapsOn(side, obstacle))
  }

  reboundFrom (collision) {
    this.position = this.reboundPosition(collision)
  }

  reboundPosition (collision) {
    return new Position({
      x: this.reboundPositionX(collision),
      y: this.reboundPositionY(collision)
    })
  }

  reboundPositionX (collision) {
    if (collision.side === LEFT) return collision.obstacle.rightSide
    if (collision.side === RIGHT) return collision.obstacle.leftSide - this.width

    return this.position.x
  }

  reboundPositionY (collision) {
    if (collision.side === DOWN) return collision.obstacle.topSide - this.width

    return this.position.y
  }
}

export default Player
