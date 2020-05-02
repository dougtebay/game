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

    if (direction) {
      const isActive = event.type === 'keydown';

      this.player.setDirection(direction, isActive);
    }
  }
}

export default Controller;
