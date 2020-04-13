import Member, { ACTOR_TYPE } from './Member';

const PLAYER_NAME = 'player';

class Player extends Member {
  constructor(coordinates) {
    super(coordinates);
    this.type = ACTOR_TYPE;
    this.name = PLAYER_NAME;
  }
}

export default Player;
