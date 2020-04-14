import Block from './Block';
import Player, { PLAYER_NAME } from './Player';
import Space from './Space';

const BLOCK_SYMBOL = '#';
const PLAYER_SYMBOL = '@';
const SPACE_SYMBOL = ' ';

const LEVEL_PLAN = [
  '           ',
  ' #   @   # ',
  ' ######### ',
  '           ',
];

const LEVEL_MEMBERS_KEY = [
  { symbol: BLOCK_SYMBOL, class: Block },
  { symbol: PLAYER_SYMBOL, class: Player },
  { symbol: SPACE_SYMBOL, class: Space },
];

class Level {
  constructor() {
    this.plan = LEVEL_PLAN;
    this.membersKey = LEVEL_MEMBERS_KEY;
  }

  get player() {
    return this.members.find((member) => member.name === PLAYER_NAME);
  }

  get fixtures() {
    return this.members.filter((member) => member.isFixture);
  }

  get members() {
    return this.grid.map((row, y) => row.reduce((members, symbol, x) => [
      ...members,
      ...this.createMembers(symbol, { x, y }),
    ], [])).flat();
  }

  get grid() {
    return this.plan.map((row) => row.split(''));
  }

  createMembers(symbol, coordinates) {
    const member = this.createMember(symbol, coordinates);

    return member.isFixture ? [member] : [member, this.createSpace(member.position)];
  }

  createMember(symbol, coordinates) {
    const Member = this.membersKey.find((member) => member.symbol === symbol).class;

    return new Member(coordinates);
  }

  createSpace(coordinates) {
    return this.createMember(SPACE_SYMBOL, coordinates);
  }
}

export default Level;
