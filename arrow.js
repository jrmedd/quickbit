function Arrow(leftArrow, rightArrow, upArrow, downArrow) {
  this.arrows = [leftArrow, rightArrow, upArrow, downArrow]; //set what gets displayed for left/right arrows
  this.arrowDisplay = document.createElement("p"); //make a paragraph element
  this.arrowDisplay.id="arrowDisplay"; //give it the arrowDisplay id
  this.gameArea = document.getElementById("gameArea"); //get the game area
  this.gameArea.appendChild(this.arrowDisplay); //stick the arrow display in it
  this.keyCodes = [37, 39, 38, 40]; //get four different keycode options
  this.chosenArrow; //arrow computer picks
  this.chosenKeycode; //its corrresponding keycode
  this.arrowElement = document.getElementById("arrowDisplay"); //arrowDisplay element for referral later
  this.arrowElement.style.opacity = 1; //make it VISIBLE

  //function to choose arrow
  this.chooseArrow = function(score) {
    if (score < 10) {
      this.whichArrow = parseInt(Math.random()*arrow.arrows.length/2);
    }
    else if (score < 20) {
      this.whichArrow = parseInt(Math.random()*arrow.arrows.length/2)+2;
    }
    else {
      this.whichArrow = parseInt(Math.random()*arrow.arrows.length); //pick a random option
    }
    this.chosenArrow = this.arrows[this.whichArrow]; //which arrow does it correspond to
    this.chosenKeycode = this.keyCodes[this.whichArrow] //what keycode does it correspond to
    return this.chosenArrow; //return it why not
  };

  //function to show arrow
  this.showArrow = function() {
    this.arrowElement.className = 'standard'; //reset visiblity and colour styles
    this.arrowElement.innerHTML = this.chosenArrow; //display the chosen arrow
    return this.chosenArrow; //return it why not
  };

  //function to show text
  this.showText = function(text) {
    this.arrowElement.innerHTML = text; //show the text
    return text; //return the text
  }

  //function for clearing the arrow from screen
  this.clearArrow = function() {
    this.arrowElement.className = 'success fadeOut'; //fade it with succesfull colours
    return this.choosenArrow; //return it why not
  }
};
