  var order = {};

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

    str += '<div class = "table">'
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

    document.getElementById('table-wrapper').innerHTML = str;
  }

  players_sort("net_worth");
