class View {
  constructor(level) {
    this.level = level;
    this.parentNode = document.body;
    this.elementType = 'div';
    this.unitType = 'px';
    this.scale = 20;

    this.renderLevel();
  }

  renderLevel() {
    this.levelMembers.forEach((member) => {
      const element = this.createElement(member);

      this.setStyleAttribute(element, member);
      this.appendElement(element);
    });
  }

  get levelMembers() {
    return this.level.members;
  }

  createElement(member) {
    const element = document.createElement(this.elementType);
    element.setAttribute('class', `${member.type} ${member.name}`);

    return element;
  }

  setStyleAttribute(element, member) {
    const topStyle = `top: ${this.toScaleUnit(member.positionY)};`;
    const leftStyle = `left: ${this.toScaleUnit(member.positionX)};`;
    const heightStyle = `height: ${this.toScaleUnit(member.height)};`;
    const widthStyle = `width: ${this.toScaleUnit(member.width)};`;

    element.setAttribute('style', `${topStyle} ${leftStyle} ${heightStyle} ${widthStyle}`);
  }

  appendElement(element) {
    this.parentNode.appendChild(element);
  }

  toScaleUnit(value) {
    return (value * this.scale) + this.unitType;
  }
}

export default View;
