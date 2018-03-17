function HighScore(storagePlace) {
  this.scoreDisplay = document.createElement("table");
  this.scoreDisplay.id="scoreDisplay";
  this.gameArea = document.getElementById("gameArea");
  this.gameArea.appendChild(this.scoreDisplay);
  this.scoreElement = document.getElementById("scoreDisplay");
  this.scores;

  this.getScores = function(){
    this.scores = this.scores = JSON.parse(window.localStorage.getItem(storagePlace)) || [];
    return this.scores;
  }

  this.addScore = function(newName, newScore) {
    this.getScores();
    for (var i = 0; i < this.scores.length; i++) {
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
    for (var i = 0; i < this.scores.length; i ++) {
      this.rank = i + 1;
      this.updatedTable += '<tr><td>'+this.rank+'</td><td>'+this.scores[i].score+'<td>'+this.scores[i].name+'</td></tr>'
    }
    this.updatedTable += '</tbody>';
    this.scoreElement.innerHTML = this.updatedTable;
  }
}
