var arrow = new Arrow('<', '>', '#', '$'); //arrow construct and representations
var pressedKeycode; //keycode of pressed key
var pressTimer; //timeout for press response
var currentTime; // current press time (debounce)
var lastTime = new Date().getTime(); //last press time (debounce)
var score = 0; // score..duh
var gameDisabled = false; //disable game between fails
var responseWait = 500; //time they've got to react
var showWait = responseWait/2; //time between showing a new arrow
var arrowShown; //when was the arrow shown (how fast were they?)

var comment = new Comment(responseWait); //comment on performance

var startingFrequency = 220; //starting frequency of audio
var synthFrequency = startingFrequency; //synth frequency
var frequencyIncrease = 2; //frequency increase on success
voice1 = new simpleSynth(synthFrequency, 2, 2); //main voice
voice2 = new simpleSynth(synthFrequency/2, 1.5, 1.9); //inharmonic voice

var highScoreTable = new HighScore('scores');
highScoreTable.updateTable();

arrow.chooseArrow(score); //choose first arrow
arrow.showArrow(); // show first arrow

//failure actions
function fail(){
  gameDisabled = true; //temporarily disable game
  arrow.showText("GAME OVER"); //tell player it's over (sorry)
  document.getElementById("score").innerHTML = "You scored: " + score; //display their final score
  score = 0;// reset score for next play
  window.setTimeout(function(){
    gameDisabled = false; //reenable game
    document.getElementById("score").innerHTML = "Press button to start"; //ask them to play
    arrow.chooseArrow(score);
    arrow.showArrow(); //show a new arrow
  }, 3000); // do all of this after so many seconds
  voice1.simpleEnv(audioCtx.currentTime, 180, 10, 50); //uh
  voice2.simpleEnv(audioCtx.currentTime, 160, 10, 50) //uh
  voice1.simpleEnv(audioCtx.currentTime+.25, 100, 10, 300); //oh
  voice2.simpleEnv(audioCtx.currentTime+.25, 90, 10, 300); //oh
  synthFrequency = startingFrequency; //reset synth frequency
  window.clearTimeout(pressTimer); //cancel press response timer (they failed)
}

//success actions
function success() {
  score += 1; //increase score
  document.getElementById("score").innerHTML = "Score: " + score; //tell player their score
  synthFrequency += frequencyIncrease; //increase audio frequnecy (nail-bitingly)
  voice1.simpleEnv(audioCtx.currentTime, synthFrequency, 10, 50); //play freqency
  window.clearTimeout(pressTimer); //cancel press response timer (they beat it)
  window.setTimeout(function() {
    comment.clearRating(); //clear the previous rating
    arrow.chooseArrow(score); //pick a new arrow
    arrow.showArrow(); //show a new arrow
    arrowShown = new Date().getTime();
    pressTimer = window.setTimeout(function(){
      fail(); // they missed it
    }, responseWait); //if not before time
  }, showWait); // show the new arrow, after a time
  arrow.clearArrow(); //clear it before then
}


//detect keypresses
document.onkeydown = function(e) {
  pressedKeycode = e.keyCode; //what did they press
  if (arrow.keyCodes.includes(pressedKeycode)) { //did they press an expected key?
    currentTime = new Date().getTime(); //when did they press it?
    var difference =  currentTime - lastTime; //diference between this press and last press
    if (gameDisabled == false && (difference) >= showWait) { //is it long enough since the last press (and are we playing?)
      if (pressedKeycode == arrow.chosenKeycode) { //are they pressing the right key?
        success(); //they're successful
        if (score > 1) { //only rate after there's something compare
          comment.howWell(currentTime - arrowShown); //how quick were they?
          comment.showRating(); //tell them!
        }
      }
      else {
        fail(); //they're not
      }
    }
    lastTime = currentTime; //remember when they last pressed
  }
};
