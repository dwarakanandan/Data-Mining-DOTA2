var match = JSON.parse(sessionStorage.match);

function displayScoreBoard(){
  document.getElementById('radiant-score').innerHTML = match.scoreboard.radiant.score;
  document.getElementById('dire-score').innerHTML = match.scoreboard.dire.score;
}

displayScoreBoard();
