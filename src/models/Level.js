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

    this.membersMap = [
      { symbol: this.blockSymbol, class: Block },
      { symbol: this.playerSymbol, class: Player },
      { symbol: this.spaceSymbol, class: Space },
    ];

    this.members = this.members();
    this.player = this.player();
  }

  members() {
    return this.grid.map((row, y) => row.map((symbol, x) => {
      const member = this.createMember(symbol, { x, y });

      return member.isFixture ? member : [member, this.createSpace(member.position)];
    })).flat(2);
  }

  get grid() {
    return this.plan.map((row) => row.split(''));
  }

  createMember(symbol, coordinates) {
    const Member = this.membersMap.find((member) => member.symbol === symbol).class;

    return new Member(coordinates);
  }

  createSpace(coordinates) {
    return this.createMember(this.spaceSymbol, coordinates);
  }

  player() {
    return this.members.find((member) => member.name === PLAYER_NAME);
  }
}

export default Level;
