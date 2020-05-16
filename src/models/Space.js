import Member from './Member';

class Space extends Member {
  constructor(coodinates) {
    super(coodinates);

    this.type = this.fixtureType;
    this.name = 'space';
    this.isObstacle = false;
  }
}

export default Space;
