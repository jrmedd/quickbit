function Comment(expectation) {
  this.commentDisplay = document.createElement("p");
  this.commentDisplay.id="commentDisplay";
  this.gameArea = document.getElementById("gameArea");
  this.gameArea.appendChild(this.commentDisplay);
  this.commentElement = document.getElementById("commentDisplay");

  this.rating;

  this.perfect = "Perfect";
  this.great = "Great";
  this.good = "Good";
  this.just = "Just";

  this.perfectRating = 0.7;
  this.greatRating = 0.8;
  this.goodRating = 0.85;
  this.justRating = 0.9;

  this.expectation = expectation;
  this.speed;

  this.rate = function(time) {
    this.speed = (time*0.01)/(this.expectation*0.01);
    if (this.speed <= this.perfectRating) {
      this.rating = this.perfect;
    }
    else if (this.speed <= this.greatRating) {
      this.rating = this.great;
    }
    else if (this.speed <= this.goodRating) {
      this.rating = this.good;
    }
    else {
      this.rating = this.just;
    }
    return this.rating;
  }

  this.show = function(text) {
    this.commentElement.className = 'standard';
    this.commentElement.innerHTML = text;
    return this.rating;
  }

  this.hide = function() {
    this.commentElement.className = 'fadeOut';
    return this.rating;
  }

}
