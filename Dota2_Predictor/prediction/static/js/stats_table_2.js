var stats_table_2_string = '<span class = "heading"><center>STATISTICS</center></span>';
var img_url = [];

function obtainImageUrl(id){
  return items_list[id].url_image;
}

function populateItems(i){
  img_url = [];
  for(tmp = 0;tmp < 5;tmp++){
    if(players[i]["item"+tmp] != 0){
      img_url.push(obtainImageUrl(players[i]["item"+tmp]));
    }
  }
}

function populateData(team_name){
  if(team_name == "radiant"){
    team = 0;
  }
  else {
    team = 1;
  }
  stats_table_2_string += '<table border = "0">';
  stats_table_2_string += '<thead><th colspan = "3" class = "team_name"><center id = '+team_name+'>'+team_name.toUpperCase()+'</center></th></thead><tbody>';
  for(i = 0;i < players.length;i++){
    if(players[i].hero_id != 0 && players[i].team == team){
      populateItems(i);
      stats_table_2_string += '<tr class = "row_player"><td colspan = "3" class = "player_name">' + players[i].name + '</td></tr>';
      stats_table_2_string += '<tr><td colspan = "3" vertical-align = "center"><i class = "d2mh hero-' + players[i].hero_id + '"></i> L <span class = "player_level">' + players[i].level + '</span> <span class = "hero_name">' + heroes_list[players[i].hero_id].localized_name.toUpperCase() + '</span></td></tr>';

      stats_table_2_string += '<tr><td><img class = "hero_image" src=' + heroes_list[players[i].hero_id].url_large_portrait + "></td><td>"
      stats_table_2_string += '<div class = "kda"><span class = "kills">'+players[i].kills+'</span> / <span class = "deaths">'+players[i].death+'</span> / <span class = "assists">'+players[i].assists+'</span></div></br>';
      stats_table_2_string += '<span class = "lh">LH/D: '+players[i].last_hits+'/'+players[i].denies+'</span>';

      stats_table_2_string += '</td><td><div id = "image_container"><div class = "row" id = "itemrow">';

      for(ii = 0;ii < 3;ii++){
        if(img_url.length >= (ii+1))
          stats_table_2_string += '<span class = "itemimg"><img src = "'+img_url[ii]+'"></span>';
        else
            stats_table_2_string += '<span class = "itemimg"></span>';
      }

      stats_table_2_string += '</div><div class = "row" id = "itemrow">';

      for(ii = 3;ii < 6;ii++){
        if(img_url.length >= (ii+1))
          stats_table_2_string += '<span class = "itemimg"><img src = "'+img_url[ii]+'"></span>';
        else
            stats_table_2_string += '<span class = "itemimg"></span>';
      }
    }
  }
  stats_table_2_string += '</div></div></td></tbody></table>';
}

stats_table_2_string += '<div class = "stats_table_2-wrapper">';
stats_table_2_string += '<div class = "col-sm-6">';
stats_table_2_string += '<div class = "stats_table_2">';
populateData("radiant");
stats_table_2_string += '</div></div>';
stats_table_2_string += '<div class = "col-sm-6">';
stats_table_2_string += '<div class = "stats_table_2">';
populateData("dire");
stats_table_2 += '</div></div></div>';
document.getElementById("stats_table_2").innerHTML = stats_table_2_string;
