import { DIRECTIONS, DOWN, LEFT, PLAYER_NAME, RIGHT, UP } from '../constants'
import Member from './Member'
import Position from './Position'
import { capitalize } from '../utilities'

class Player extends Member {
  constructor (coordinates) {
    super(coordinates)

    this.type = this.actorType
    this.name = PLAYER_NAME

    this.isObstacle = false
    this.directions = []
    this.movementLength = 0.3
    this.minimumVerticalSpeed = 0
    this.maximumVerticalSpeed = 8
    this.verticalSpeed = 0
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
    return this.directions.includes(direction)
  }

  setDirection (direction) {
    this.directions.push(direction)
  }

  unsetDirection (direction) {
    this.directions.splice(this.directions.indexOf(direction), 1)
  }

  move () {
    DIRECTIONS.forEach(side => this.moveTo(side))
  }

  moveTo (side) {
    this.position = this.nextPosition(side)
  }

  nextPosition (side) {
    return this[`move${capitalize(side)}`]()
  }

  moveUp () {
    if (this.isBeingDirected(UP) && this.isVerticallyStationary) {
      this.verticalSpeed = this.maximumVerticalSpeed
    }

    if (this.isAscending) return this.moveVertically()

    return this.position
  }

  moveDown () {
    if (this.isBeingDirected(DOWN) && this.isVerticallyStationary) {
      this.verticalSpeed = -this.maximumVerticalSpeed
    }

    if (this.isDescending) return this.moveVertically()

    return this.position
  }

  moveLeft () {
    if (!this.isBeingDirected(LEFT)) return this.position

    return this.position.subtract({ x: this.movementLength })
  }

  moveRight () {
    if (!this.isBeingDirected(RIGHT)) return this.position

    return this.position.add({ x: this.movementLength })
  }

  isBeingDirected (direction) {
    return this.directionIsSet(direction)
  }

  get isVerticallyStationary () {
    return !this.isAscending && !this.isDescending
  }

  get isAscending () {
    return this.verticalSpeed > this.minimumVerticalSpeed
  }

  get isDescending () {
    return this.verticalSpeed < this.minimumVerticalSpeed
  }

  moveVertically () {
    this.verticalSpeed -= this.movementLength

    return this.position.subtract({ y: this.verticalMovementLength })
  }

  get verticalMovementLength () {
    return this.verticalSpeed / 30
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
    if (collision.side === DOWN) {
      this.verticalSpeed = this.minimumVerticalSpeed

      return collision.obstacle.topSide - this.width
    }

    return this.position.y
  }
}

export default Player
