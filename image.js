function Image() {
  this.imageDisplay = document.createElement("img");
  this.imageDisplay.id="imageDisplay";
  this.gameArea = document.getElementById("gameArea");
  this.gameArea.appendChild(this.imageDisplay);
  this.imageElement = document.getElementById("imageDisplay");

  this.show = function(filename) {
    this.imageElement.src = filename;
    this.imageElement.className = 'standard';

  }

  this.hide = function() {
    this.imageElement.className = 'fadeOut';
  }

}
