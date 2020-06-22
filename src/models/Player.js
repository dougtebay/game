import { LEFT, PLAYER_NAME, RIGHT } from '../constants'
import Member from './Member'

class Player extends Member {
  constructor (coordinates) {
    super(coordinates)

    this.type = this.actorType
    this.name = PLAYER_NAME

    this.isObstacle = false
    this.directions = {}
    this.movementLength = this.width / 10
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
    if (this.isBeingDirectedTo(LEFT)) this.moveTo(LEFT)
    if (this.isBeingDirectedTo(RIGHT)) this.moveTo(RIGHT)

    return this
  }

  moveTo (side) {
    this.lastPosition = this.position

    this.position = this.nextPosition(side)
  }

  nextPosition (side) {
    if (side === LEFT) return this.position.subtract({ x: this.movementLength })
    if (side === RIGHT) return this.position.add({ x: this.movementLength })

    return this.position
  }

  isCollidingWith (obstacle) {
    if (this.isBeingDirectedTo(LEFT)) return this.overlapsOn(LEFT, obstacle)
    if (this.isBeingDirectedTo(RIGHT)) return this.overlapsOn(RIGHT, obstacle)

    return false
  }

  rebound () {
    this.position = this.lastPosition
  }
}

export default Player
