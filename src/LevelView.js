import { PLAYER_NAME } from './constants';

class LevelView {
  constructor(level) {
    this.members = level.members;
    this.player = level.player;

    this.playerName = PLAYER_NAME;

    this.parentNode = document.body;
    this.elementType = 'div';
    this.unitType = 'px';
    this.scale = 20;

    this.render();
    this.animate();
  }

  render() {
    this.members.forEach((member) => {
      const element = this.createElement(member);

      this.styleElement(element, member);
      this.appendElement(element);
    });
  }

  createElement(member) {
    const element = document.createElement(this.elementType);
    element.setAttribute('class', `${member.type} ${member.name}`);

    return element;
  }

  styleElement(element, member) {
    this.setElementPosition(element, member);
    this.setElementDimensions(element, member);
  }

  setElementPosition(element, member) {
    element.style.top = this.toScaleUnit(member.position.y * member.height);
    element.style.left = this.toScaleUnit(member.position.x * member.width);
  }

  setElementDimensions(element, member) {
    element.style.height = this.toScaleUnit(member.height);
    element.style.width = this.toScaleUnit(member.width);
  }

  toScaleUnit(value) {
    return (value * this.scale) + this.unitType;
  }

  appendElement(element) {
    this.parentNode.appendChild(element);
  }

  animate() {
    const beforeRepaint = () => {
      if (this.player.hasDirection) this.updatePlayerPosition();
      requestAnimationFrame(beforeRepaint);
    };

    requestAnimationFrame(beforeRepaint);
  }

  updatePlayerPosition() {
    this.setElementPosition(this.playerElement, this.player.move());
  }

  get playerElement() {
    const [player] = document.getElementsByClassName(this.playerName);

    return player;
  }
}

export default LevelView;
