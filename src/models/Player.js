import Member from './Member';

export const PLAYER_NAME = 'player';

class Player extends Member {
  constructor(coordinates) {
    super(coordinates);

    this.type = this.actorType;
    this.name = PLAYER_NAME;
    this.directions = { 'left': false, 'up': false, 'right': false };
  }

  setDirection(direction, isActive) {
    this.directions[direction] = isActive;
  }
}

export default Player;
