var arrow = new Arrow('<', '>', '#', '$'); //arrow construct and representations
var pressedKeycode; //keycode of pressed key
var pressTimer; //timeout for press response
var currentTime; // current press time (debounce)
var lastTime = new Date().getTime(); //last press time (debounce)
var score = -1; // score..duh
var gameActive = false; //disable game between fails
var responseWait = 500; //time they've got to react
var showWait = responseWait/2; //time between showing a new arrow
var arrowShown; //when was the arrow shown (how fast were they?)
var count; //countdown for intro in seconds

var comment = new Comment(responseWait); //comment on performance

var startingFrequency = 220; //starting frequency of audio
var synthFrequency = startingFrequency; //synth frequency
var frequencyIncrease = 2; //frequency increase on success
voice1 = new simpleSynth(synthFrequency, 2, 2); //main voice
voice2 = new simpleSynth(synthFrequency*0.5, 1.5, 1.9); //inharmonic voice
introPip = new simpleSynth(360, 1, 0); // intro pip voice

//var highScoreTable = new HighScore('scores', 5); //create a scrore table
//highScoreTable.updateTable(); //populate it with nout

arrow.choose(score); //choose first arrow

//failure actions
function fail(){
  gameActive = false; //temporarily disable game
  arrow.text("GAME OVER"); //tell player it's over (sorry)
  document.getElementById("score").innerHTML = "You scored: " + score; //display their final score
  /*if (score > highScoreTable.lowest) {
    comment.show('New highscore!');
  }*/
  window.setTimeout(function() {
    score = -1;// reset score for next play
    document.getElementById("score").innerHTML = "Press button to start"; //ask them to play
    arrow.text("");
    //highScoreTable.show();
    arrow.choose(score);
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
  if (score > 0){
    voice1.simpleEnv(audioCtx.currentTime, synthFrequency, 10, 50); //play freqency
  }
  window.clearTimeout(pressTimer); //cancel press response timer (they beat it)
  window.setTimeout(function() {
    comment.hide(); //clear the previous rating
    arrow.choose(score); //pick a new arrow
    arrow.show(); //show a new arrow
    arrowShown = new Date().getTime();
    pressTimer = window.setTimeout(function(){
      fail(); // they missed it
    }, responseWait); //if not before time
  }, showWait); // show the new arrow, after a time
  arrow.hide(); //clear it before then
}

var triggers = [41, 42];
function evaluate(pressedKeycode) {
  if (triggers.includes(pressedKeycode)) {
    console.log("trigger");
  }
  else if (arrow.keyCodes.includes(pressedKeycode)) {
    currentTime = new Date().getTime(); //when did they press it?
    var difference =  currentTime - lastTime; //diference between this press and last press
    if (!gameActive && score < 0) {
      //highScoreTable.hide(); //hide the score table
      count = 3; //reset countdown timer
      startGame(); //countdown the game intro
    }
    else if (gameActive && (difference) >= showWait && score >= 0) { //is it long enough since the last press (and are we playing?)
      if (pressedKeycode == arrow.chosenKeycode && score >= 0) { //are they pressing the right key?
        success(); //they're successful
        var rating = comment.rate(currentTime - arrowShown); //how quick were they?
        comment.show(rating); //tell them!
      }
      else {
        fail(); //they're not
      }
    }
    lastTime = currentTime; //remember when they last pressed
  }
}

var onReceiveCallback = function(info) {
  if (info.connectionId == connectionId && info.data) {
    incoming += decoder.decode(info.data);
    if (incoming.slice(-1) == "\n") {
      if (incoming.length == 4) {
        evaluate(parseInt(incoming.slice(0, -1)));
      }
      incoming = "";
    }
  }
};


function startGame() {
  gameActive = true; //activate the game
  comment.show(count.toString()); //show countdown
  introPip.simpleEnv(audioCtx.currentTime, 360, 10, 75); //pip
  window.setTimeout(function() {
    if (count > 1) { //if the count hasn't finished
      count -= 1; //reduce count
      startGame(); //count agai
    }
    else {
      introPip.simpleEnv(audioCtx.currentTime, 720, 10, 200); //beeeeem
      comment.show("Go!"); //go go go
      success(); //increment score to zero
    }
  }, 750);
}
