var arrow = new Arrow(0, 0, 0, '<', '>');
var pressedKeycode;
var pressTimer;
var currentTime;
var lastTime = new Date().getTime();
var score = 0;
var gameDisabled = false;

var startingFrequency = 220;
var synthFrequency = startingFrequency;
var frequencyIncrease = 2;
voice1 = new simpleSynth(synthFrequency, 2, 2);
voice2 = new simpleSynth(synthFrequency/2, 1.5, 1.9);

arrow.chooseArrow();
arrow.showArrow();

function fail(){
  gameDisabled = true;
  arrow.showText("GAME OVER");
  document.getElementById("score").innerHTML = "You scored: " + score;
  score = 0;
  window.setTimeout(function(){
    gameDisabled = false;
    document.getElementById("score").innerHTML = "Press button to start";
    arrow.showArrow();
  }, 3000);
  voice1.simpleEnv(audioCtx.currentTime, 180, 10, 50);
  voice2.simpleEnv(audioCtx.currentTime, 160, 10, 50)
  voice1.simpleEnv(audioCtx.currentTime+.25, 100, 10, 300);
  voice2.simpleEnv(audioCtx.currentTime+.25, 90, 10, 300);
  synthFrequency = startingFrequency;
  window.clearTimeout(pressTimer);
}

function success() {
  score += 1;
  document.getElementById("score").innerHTML = "Score: " + score;
  synthFrequency += frequencyIncrease;
  voice1.simpleEnv(audioCtx.currentTime, synthFrequency, 10, 50);
  window.clearTimeout(pressTimer);
  window.setTimeout(function() {
    arrow.chooseArrow();
    arrow.showArrow();
    pressTimer = window.setTimeout(function(){
      fail();
    }, 500);
  }, 250);
  arrow.clearArrow();
}

document.onkeydown = function(e) {
  pressedKeycode = e.keyCode;
  if (arrow.keyCodes.includes(pressedKeycode)) {
    currentTime = new Date().getTime();
    if (gameDisabled == false && (currentTime - lastTime) >= 250) {
      if (pressedKeycode == arrow.chosenKeycode) {
        success();
      }
      else {
        fail();
      }
    }
    lastTime = currentTime;
  }
};
