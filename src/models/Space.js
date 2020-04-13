import Member, { FIXTURE_TYPE } from './Member';

const SPACE_NAME = 'space';

class Space extends Member {
  constructor(coodinates) {
    super(coodinates);
    this.type = FIXTURE_TYPE;
    this.name = SPACE_NAME;
  }
}

export default Space;
