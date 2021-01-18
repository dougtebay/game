import Block from './Block'
import { DOWN, PLAYER_NAME } from '../constants'
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

  exertGravitationalForce () {
    this.player.addDirection(DOWN)
  }

  playerHasCollisions () {
    return Boolean(this.playerCollisions().length)
  }

  playerCollisions () {
    return this.sidesPlayerIsCollidingOn().map((side) => {
      return { side, obstacle: this.obstacleOn(side, this.player.position) }
    })
  }

  sidesPlayerIsCollidingOn () {
    return this.player.directions.filter((side) => this.playerIsCollidingOn(side))
  }

  playerIsCollidingOn (side) {
    const obstacle = this.obstacleOn(side, this.player.position)

    return obstacle ? this.player.isCollidingWith(obstacle) : false
  }

  obstacleOn (side, position) {
    const positions = position.positionsTo(side)

    return this.obstaclesAt(positions)[0]
  }

  obstaclesAt (positions) {
    return positions.reduce((obstacles, position) => {
      const obstacle = this.obstacleAt(position)

      if (obstacle) obstacles.push(obstacle)

      return obstacles
    }, [])
  }

  obstacleAt (position) {
    return this.membersAt(position).find((member) => member.isObstacle)
  }

  membersAt (position) {
    return this.members.filter((member) => member.isAt(position))
  }

  resolvePlayerCollisions () {
    return this.playerCollisions().forEach((collision) => this.player.reboundFrom(collision))
  }
}

export default Level
