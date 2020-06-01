import Block from './Block';
import { PLAYER_NAME } from '../constants';
import Player from './Player';
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
    return this.grid.flatMap((row, y) => row.flatMap((symbol, x) => {
      const member = this.createMember(symbol, { x, y });

      return member.isFixture ? member : [member, this.createSpace(member.position)];
    }));
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

  membersAt(coordinates) {
    return this.members.filter((member) => member.isAt(coordinates));
  }

  obstaclesAt(coordinates) {
    return this.membersAt(coordinates).filter((member) => member.isObstacle);
  }
}

export default Level;
