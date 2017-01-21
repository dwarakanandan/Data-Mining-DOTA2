var matches, heroes, timer = 20, tempHeroes;

function n(n){
return n > 9 ? "" + n: "0" + n;
}

function updateTimer(){
  document.getElementById("timer").innerHTML = "<center>Updating this page in " + timer + " seconds</center>";
  if(timer > 0){
    timer--;
  }else{
    timer = 20;
  }
  setTimeout(updateTimer, 1000);
}

function getHeroURL(id) {
  for(var p = (((id -2)<0) ? 0:(id - 2));p < tempHeroes.length;p++){
    if(tempHeroes[p].id == id) return tempHeroes[p].url_small_portrait;
  }
}

function onBtnClick(matchIndex){
  var match = matches[matchIndex];
  sessionStorage.setItem('match',JSON.stringify(match));
  sessionStorage.setItem('heroes',JSON.stringify(heroes));
  window.location.href = "/prediction/";
};

function matchList(){
    var userRequest = new  XMLHttpRequest();
    userRequest.open("GET", "http://127.0.0.1:8000/livegames/details.json");
    //userRequest.open("GET", "http://anibhat2004.ddns.net:8000/livegames/details.json");
    userRequest.onload = function(){
    var heroesArray = new Array();
    var teams = ['radiant', 'dire'];     //Use it to reduce repetition of code in the for loop below
    var response = userRequest.responseText;
    var userData = JSON.parse(response);
    heroes = userData.heroes;
    tempHeroes = heroes.heroes;
    tempHeroes.sort(function(a,b){      //Sort so that iteration in method getHeroURL can begin from id - 2 instead of 0
      return a.id - b.id;
    });
    matches = userData.livegames.result.games;
    matches.sort(function(a,b){
      return b.spectators - a.spectators;
    });
    var htmlString = '<div class = "container" id = "match">';
    htmlString += '<span class = "heading"><center>MATCHES</center></span><br/>';
    for (i = 0;i < matches.length;i++)
    {
      heroesArray = [];
      try{
          if(matches[i].scoreboard && matches[i].scoreboard.duration > 0){
            for(var t = 0;t < teams.length;t++){
              if(matches[i].scoreboard[teams[t]].players.length > 1){
                matches[i].scoreboard[teams[t]].players.sort(function(a,b){
                  return a.player_slot - b.player_slot;
                });
              }
              for(j = 0;j < matches[i].scoreboard[teams[t]].players.length;j++){
                heroesArray.push(getHeroURL(matches[i].scoreboard[teams[t]].players[j].hero_id));
              }
            }

            htmlString += '<div class = matchlist-wrapper onclick = "onBtnClick(' + i + ')">';
            htmlString += '<div class = "row" id = "firstrow"><div class = "col-sm-4"><center>Radiant</center></div><div class = "col-sm-4" id = "matchid"><center>'+ matches[i].match_id +'</center></div><div class = "col-sm-4"><center>Dire</center></div></div>';
            htmlString += '<div class = "row" id = "secondRow"><div class = "col-sm-4" id = "radiant-score"><center>';
            htmlString += matches[i].scoreboard.radiant.score +'</center></div><div class = "col-sm-4" id = "matchduration"><center>';
            htmlString += n(Math.floor(matches[i].scoreboard.duration/60)) + ":" + n(Math.floor(((matches[i].scoreboard.duration/60)%1) * 60));
            htmlString += '</center></div><div class = "col-sm-4" id = "dire-score"><center>'+ matches[i].scoreboard.dire.score +'</center></div></div>';
            htmlString += '<div class = "row" id = "thirdrow"><div class = "col-sm-6" id = "radiant-heroes"><center>';
              for(j = 0;j < matches[i].scoreboard.radiant.players.length;j++){
                htmlString += '<img src = "'+ heroesArray[j] +'">';
              }
            htmlString += '</center></div>';
            htmlString += '<div class = "col-sm-6" id = "dire-heroes"><center>';
              for(j = 0;j < matches[i].scoreboard.dire.players.length;j++){
                htmlString += '<img src = "'+ heroesArray[j+matches[i].scoreboard.radiant.players.length] +'">';
              }
            htmlString += '</center></div></div>';

            htmlString += '<div class = "row" id = "fourthrow"><div class = "col-sm-12" id = "spectators"><center>'+ matches[i].spectators +' viewers watching</center></div></div>';
            htmlString += '<div id = "overlay"></div></div>';
          }
          }
          catch(e){console.log(i);}
    }
    htmlString += '</div>';
    document.getElementById("matchlist").innerHTML = htmlString;
  }
    userRequest.send();
  };
