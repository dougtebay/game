import Member from './Member';

class Block extends Member {
  constructor(coordinates) {
    super(coordinates);

    this.type = this.fixtureType;
    this.name = 'block';
  }
}

export default Block;
