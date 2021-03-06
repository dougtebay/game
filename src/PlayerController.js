import { LEFT, RIGHT, UP } from './constants'

class PlayerController {
  constructor (player) {
    this.player = player
    this.keyCodesMap = { 37: LEFT, 38: UP, 39: RIGHT }

    this.addEventListeners()
  }

  addEventListeners () {
    window.addEventListener('keydown', this.handleEvent.bind(this))
    window.addEventListener('keyup', this.handleEvent.bind(this))
  }

  handleEvent (event) {
    const direction = this.keyCodesMap[event.keyCode]

    if (direction) {
      const isActive = event.type === 'keydown'

      this.player.toggleDirection(direction, isActive)
    }
  }
}

export default PlayerController
