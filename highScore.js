function HighScore(storagePlace, topPlaces) {
  this.highScoreDisplay = document.createElement("table");
  this.highScoreDisplay.id="highScoreDisplay";
  this.gameArea = document.getElementById("gameArea");
  this.gameArea.appendChild(this.highScoreDisplay);
  this.highScoreElement = document.getElementById("highScoreDisplay");
  this.topPlaces = topPlaces;
  this.scores =  JSON.parse(window.localStorage.getItem(storagePlace));
  if (!this.scores) {
    window.localStorage.setItem(storagePlace, JSON.stringify([
        {'name':'QTE','score':30},
        {'name':'LSK','score':24},
        {'name':'DTD','score':18},
        {'name':'RYO','score':12},
        {'name':'JRM', 'score':3}

    ]));
    this.scores = JSON.parse(window.localStorage.getItem(storagePlace));
  }
  this.lowest = this.scores[this.topPlaces-1];
  this.getScores = function(){
    this.scores = this.scores = JSON.parse(window.localStorage.getItem(storagePlace));
    this.lowest = this.scores[this.topPlaces-1].score;
    return this.scores;
  }

  this.addScore = function(newName, newScore) {
    this.getScores();
    for (var i = 0; i < this.topPlaces; i++) {
      if (newScore > this.scores[i].score) {
        break;
      }
    }
    this.newScoreIndex = i;
    this.newScores = [];
    this.newScores = this.newScores.concat(this.scores.slice(0, this.newScoreIndex));
    this.newScores = this.newScores.concat({name: newName, score: newScore});
    this.newScores = this.newScores.concat(this.scores.slice(this.newScoreIndex, this.scores.length));
    window.localStorage.setItem(storagePlace, JSON.stringify(this.newScores));
    this.getScores();
  };

  this.updateTable = function() {
    this.getScores();
    this.updatedTable = '<caption>High Scores</caption>'
    this.updatedTable += '<thead><tr><th>Rank</th><th>Score</th><th>Name</th></tr></thead>';
    this.updatedTable += '<tbody>';
    for (var i = 0; i < this.topPlaces; i ++) {
      if (i > 5) {
        break;
      }
      this.rank = i + 1;
      this.updatedTable += '<tr><td>'+this.rank+'</td><td>'+this.scores[i].score+'<td>'+this.scores[i].name+'</td></tr>'
    }
    this.updatedTable += '</tbody>';
    this.highScoreElement.innerHTML = this.updatedTable;
  }

  this.show = function() {
    this.updateTable();
    this.highScoreElement.style.display = 'block';
  }

  this.hide = function() {
    this.highScoreElement.style.display = 'none';
  }
}
