import Position from './Position';

export const ACTOR_TYPE = 'actor';
export const FIXTURE_TYPE = 'fixture';
export const MEMBER_NAME = 'member';

class Member {
  constructor(coordinates) {
    this.position = new Position(coordinates);
  }

  get isActor() {
    return this.isType(ACTOR_TYPE);
  }

  get isFixture() {
    return this.isType(FIXTURE_TYPE);
  }

  isType(type) {
    return this.type === type;
  }

  get classes() {
    return `${MEMBER_NAME} ${this.type} ${this.name}`;
  }
}

export default Member;
