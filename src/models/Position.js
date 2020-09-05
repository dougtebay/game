import { LEFT, RIGHT } from '../constants'

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

  cellTo (side) {
    if (side === LEFT) return new Position({ x: Math.floor(this.x), y: this.y })
    if (side === RIGHT) return new Position({ x: Math.ceil(this.x), y: this.y })

    return this
  }
}

export default Position
