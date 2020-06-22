import Block from './Block'
import { LEFT, PLAYER_NAME, RIGHT } from '../constants'
import Player from './Player'
import Space from './Space'

class Level {
  constructor () {
    this.blockSymbol = '#'
    this.playerSymbol = '@'
    this.spaceSymbol = ' '

    this.plan = [
      '           ',
      ' #   @   # ',
      ' ######### ',
      '           '
    ]

    this.membersMap = [
      { symbol: this.blockSymbol, class: Block },
      { symbol: this.playerSymbol, class: Player },
      { symbol: this.spaceSymbol, class: Space }
    ]

    this.members = this.members()
    this.player = this.player()
  }

  members () {
    return this.grid.flatMap((row, y) => row.flatMap((symbol, x) => {
      const member = this.createMember(symbol, { x, y })

      return member.isFixture ? member : [member, this.createSpace(member.position)]
    }))
  }

  get grid () {
    return this.plan.map((row) => row.split(''))
  }

  createMember (symbol, coordinates) {
    const Member = this.membersMap.find((member) => member.symbol === symbol).class

    return new Member(coordinates)
  }

  createSpace (coordinates) {
    return this.createMember(this.spaceSymbol, coordinates)
  }

  player () {
    return this.members.find((member) => member.name === PLAYER_NAME)
  }

  playerIsColliding () {
    if (this.player.isBeingDirectedTo(LEFT)) return this.playerIsCollidingOn(LEFT)
    if (this.player.isBeingDirectedTo(RIGHT)) return this.playerIsCollidingOn(RIGHT)

    return false
  }

  playerIsCollidingOn (side) {
    const obstacle = this.obstacleOn(side, this.player.position)

    if (!obstacle) return false

    return this.player.isCollidingWith(obstacle)
  }

  obstacleOn (side, position) {
    const gridPosition = position.gridPositionTo(side)

    return this.obstacleAt(gridPosition)
  }

  obstacleAt (position) {
    return this.membersAt(position).find((member) => member.isObstacle)
  }

  membersAt (position) {
    return this.members.filter((member) => member.isAt(position))
  }
}

export default Level
