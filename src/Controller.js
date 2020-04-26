class Controller {
  constructor(player) {
    this.player = player;
    this.keyCodesMap = { 37: 'left', 38: 'up', 39: 'right' };

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('keydown', this.handleEvent.bind(this));
    window.addEventListener('keyup', this.handleEvent.bind(this));
  }

  handleEvent(event) {
    const direction = this.keyCodesMap[event.keyCode];
    const isActive = event.type === 'keydown';

    if (direction) this.player.setDirection(direction, isActive);
  }
}

export default Controller;
