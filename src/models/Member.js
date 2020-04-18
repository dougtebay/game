import Position from './Position';

export const ACTOR_TYPE = 'actor';
export const FIXTURE_TYPE = 'fixture';

class Member {
  constructor(coordinates) {
    this.position = new Position(coordinates);
    this.width = 1;
    this.height = 1;
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
    return `${this.type} ${this.name}`;
  }
}

export default Member;
