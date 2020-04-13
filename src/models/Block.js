import Member, { FIXTURE_TYPE } from './Member';

const BLOCK_NAME = 'block';

class Block extends Member {
  constructor(coordinates) {
    super(coordinates);
    this.type = FIXTURE_TYPE;
    this.name = BLOCK_NAME;
  }
}

export default Block;
