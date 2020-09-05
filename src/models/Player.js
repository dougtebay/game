import { LEFT, PLAYER_NAME, RIGHT } from '../constants'
import Member from './Member'
import Position from './Position'

class Player extends Member {
  constructor (coordinates) {
    super(coordinates)

    this.type = this.actorType
    this.name = PLAYER_NAME

    this.isObstacle = false
    this.directions = {}
    this.movementLength = this.width / 5
  }

  setDirection (direction, isActive) {
    this.directions[direction] = isActive
  }

  get isBeingDirected () {
    return Object.values(this.directions).some(Boolean)
  }

  isBeingDirectedTo (direction) {
    return this.activeDirections.includes(direction)
  }

  get activeDirections () {
    return Object.entries(this.directions)
      .filter(([, isActive]) => isActive)
      .map(([direction]) => direction)
  }

  move () {
    this.activeDirections.forEach((side) => this.moveTo(side))
  }

  moveTo (side) {
    this.position = this.nextPosition(side)
  }

  nextPosition (side) {
    if (side === LEFT) return this.position.subtract({ x: this.movementLength })
    if (side === RIGHT) return this.position.add({ x: this.movementLength })

    return this.position
  }

  isCollidingWith (obstacle) {
    return this.activeDirections.some((side) => this.overlapsOn(side, obstacle))
  }

  reboundFrom (collision) {
    this.position = this.reboundPosition(collision)
  }

  reboundPosition (collision) {
    return new Position({ x: this.reboundPositionX(collision), y: this.position.y })
  }

  reboundPositionX (collision) {
    if (collision.side === LEFT) return collision.obstacle.rightSide
    if (collision.side === RIGHT) return collision.obstacle.leftSide - this.width

    return this.position.x
  }
}

export default Player
