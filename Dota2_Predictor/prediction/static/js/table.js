  var matchString = sessionStorage.match;
  var match = JSON.parse(matchString);
  var match_players = match.players;
  var player_names = [];
  var player_teams = [];
  var teams = ['radiant', 'dire'];
  var players = [];
  var order = {};

  for(var i = 0;i < match_players.length;i++){
    if(match_players[i].hero_id > 0){
      player_names[match_players[i].hero_id] = match_players[i].name;
      player_teams[match_players[i].hero_id] = match_players[i].team;
    }
  }

  for(t = 0;t < teams.length;t++){
    for(var i = 0;i < match.scoreboard[teams[t]].players.length;i++){
      match.scoreboard[teams[t]].players[i].name = player_names[match.scoreboard[teams[t]].players[i].hero_id]
      match.scoreboard[teams[t]].players[i].team = player_teams[match.scoreboard[teams[t]].players[i].hero_id]
      players.push(match.scoreboard[teams[t]].players[i]);
    }
  }


  function players_sort(val){
    /*Case 1: when the previous sort was on a different column.
    *Now set the previous sort to the current column and sort it in descending order.
    *Case 2: When the previous sort was done on the same column.
    *Check the order in which the previous sort was done and reverse it.*/
      if(order['previous'] != val || (order['previous'] == val && order['order'] == "ascending")){//If previous sort was done on the same column and was sorted in ascending order.
        order['previous'] = val;
        order['order'] = "descending";
        players.sort(function(a,b){
          return b[val] - a[val];
      });
    }else{
      if(order['order'] == "descending"){
          order['order'] = "ascending";
          players.sort(function(a,b){
            return a[val] - b[val];
        });
      }
    }

    drawTable();
  }

  function checkActive(val){
    return (val == order['previous']) ? "active":"notactive";
  }

  function drawTable(){
    var str = '<span class = "heading">PLAYER STATISTICS</span>';

    str += '<div class = "table-wrapper">'
    str += '<table border = "0">';
    str += '<tr>';
    str += '<th>Name</th>';
    str += '<th onclick = "players_sort(\'level\')" class = ' + checkActive("level") + '>Lvl</th>';
    str += '<th onclick = "players_sort(\'net_worth\')" class = ' + checkActive("net_worth") + '>Net</th>';
    str += '<th onclick = "players_sort(\'gold\')" class = ' + checkActive("gold") + '>Gold</th>';
    str += '<th onclick = "players_sort(\'kills\')" class = ' + checkActive("kills") + '>K/D/A</th>';
    str += '<th onclick = "players_sort(\'gold_per_min\')" class = ' + checkActive("gold_per_min") + '>GPM/XPM</th>';
    str += '<th onclick = "players_sort(\'last_hits\')" class = ' + checkActive("last_hits") + '>LH/DN</th>';
    str += '</tr>';
    for(i = 0;i < players.length;i++){
      str += '<tr class = "tr ' + teams[players[i].team] + '">';
      str += '<td><i class = "d2mh hero-' + players[i].hero_id + '"></i>' + players[i].name + '</td>';
      str += '<td class = ' + checkActive("level") + '>' + players[i].level + '</td>';
      str += '<td class = ' + checkActive("net_worth") + '>' + players[i].net_worth + '</td>';
      str += '<td class = ' + checkActive("gold") + '>' + players[i].gold + '</td>';
      str += '<td class = ' + checkActive("kills") + '>' + players[i].kills + '/' + players[i].death + '/' + players[i].assists + '</td>';
      str += '<td class = ' + checkActive("gold_per_min") + '>' + players[i].gold_per_min + '/' + players[i].xp_per_min + '</td>';
      str += '<td class = ' + checkActive("last_hits") + '>' + players[i].last_hits + '/' + players[i].denies + '</td>';
      str += '</tr>';
    }
    str += '</table></div>';

    document.getElementById('table').innerHTML = str;
  }

  players_sort("net_worth");
