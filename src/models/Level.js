import Block from './Block';
import Player, { PLAYER_NAME } from './Player';
import Space from './Space';

class Level {
  constructor() {
    this.blockSymbol = '#';
    this.playerSymbol = '@';
    this.spaceSymbol = ' ';

    this.plan = [
      '           ',
      ' #   @   # ',
      ' ######### ',
      '           ',
    ];

    this.membersKey = [
      { symbol: this.blockSymbol, class: Block },
      { symbol: this.playerSymbol, class: Player },
      { symbol: this.spaceSymbol, class: Space },
    ];
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
    return this.createMember(this.spaceSymbol, coordinates);
  }
}

export default Level;
