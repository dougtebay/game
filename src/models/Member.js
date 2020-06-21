import Shape from './Shape';

class Member extends Shape {
  constructor(coordinates) {
    super(coordinates);

    this.actorType = 'actor';
    this.fixtureType = 'fixture';
  }

  get isFixture() {
    return this.isType(this.fixtureType);
  }

  isType(type) {
    return this.type === type;
  }
}

export default Member;
