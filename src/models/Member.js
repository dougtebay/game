import Position from './Position';

class Member {
  constructor(coordinates) {
    this.position = new Position(coordinates);

    this.actorType = 'actor';
    this.fixtureType = 'fixture';

    this.width = 1;
    this.height = 1;
  }

  get isActor() {
    return this.isType(this.actorType);
  }

  get isFixture() {
    return this.isType(this.fixtureType);
  }

  isType(type) {
    return this.type === type;
  }

  get positionX() {
    return this.position.x;
  }

  get positionY() {
    return this.position.y;
  }
}

export default Member;
