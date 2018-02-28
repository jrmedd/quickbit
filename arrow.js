function Arrow(x, y, size, leftArrow, rightArrow) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.arrows = [leftArrow, rightArrow];
  this.arrowDisplay = document.createElement("p");
  this.arrowDisplay.id="arrowDisplay";
  this.gameArea = document.getElementById("gameArea");
  this.gameArea.appendChild(this.arrowDisplay);
  this.keyCodes = [37, 39];
  this.chosenArrow;
  this.chosenKeycode;
  this.arrowElement = document.getElementById("arrowDisplay");
  this.arrowElement.style.opacity = 1;

  this.chooseArrow = function() {
    this.leftOrRight = parseInt(Math.random()*2);
    this.chosenArrow = this.arrows[this.leftOrRight];
    this.chosenKeycode = this.keyCodes[this.leftOrRight]
    return this.chosenArrow;
  };

  this.showArrow = function() {
    this.arrowElement.className = 'standard';
    this.arrowElement.innerHTML = this.chosenArrow;
    return this.chosenArrow;
  };

  this.showText = function(text) {
    this.arrowElement.className = 'fail';
    this.arrowElement.innerHTML = text;
    return this.chosenArrow;
  }

  this.clearArrow = function() {
    this.arrowElement.className = 'success fadeOut';
    return this.choosenArrow;
  }
};
