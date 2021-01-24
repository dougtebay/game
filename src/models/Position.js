import { DOWN, LEFT, RIGHT } from '../constants'

class Position {
  constructor ({ x, y }) {
    Object.assign(this, { x, y })
  }

  add ({ x = 0, y = 0 }) {
    return new Position({ x: this.x + x, y: this.y + y })
  }

  subtract ({ x = 0, y = 0 }) {
    return new Position({ x: this.x - x, y: this.y - y })
  }

  positionsTo (side) {
    if (side === DOWN) return this.positionsDown
    if (side === LEFT) return this.positionsLeft
    if (side === RIGHT) return this.positionsRight

    return [this]
  }

  get positionsDown () {
    return [
      new Position({ x: Math.floor(this.x), y: Math.ceil(this.y) }),
      new Position({ x: Math.ceil(this.x), y: Math.ceil(this.y) })
    ]
  }

  get positionsLeft () {
    return [new Position({ x: Math.floor(this.x), y: Math.floor(this.y) })]
  }

  get positionsRight () {
    return [new Position({ x: Math.ceil(this.x), y: Math.floor(this.y) })]
  }
}

export default Position
