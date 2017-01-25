var match = JSON.parse(sessionStorage.match);

function toBinary(number, bits){
  number = number.toString(2);
  while(number.length < bits){
    number = '0' + number;
  }
  return number;
}

function buildingStatus(value){
  return (value == "1") ? "true":"false";
}

function drawMap(){
  var towers_radiant = "";
  var towers_dire = "";
  var rax_radiant = "";
  var rax_dire = "";
  var radiant_tower_state = toBinary(match.scoreboard.radiant.tower_state, 16);
  var dire_tower_state = toBinary(match.scoreboard.dire.tower_state, 16);
  var radiant_barracks_state = toBinary(match.scoreboard.radiant.barracks_state, 8);
  var dire_barracks_state = toBinary(match.scoreboard.dire.barracks_state, 8);

  /*console.log("Radiant tower state: " + match.scoreboard.radiant.tower_state + " : " + radiant_tower_state);
  console.log("Dire tower state: " + match.scoreboard.dire.tower_state + " : " + dire_tower_state);
  console.log("Radiant barracks state: " + match.scoreboard.radiant.barracks_state + " : " + radiant_barracks_state);
  console.log("Dire barracks state: " +match.scoreboard.dire.barracks_state + " : " + dire_barracks_state);*/


  towers_radiant += '<div class = "tower0 ' + buildingStatus(radiant_tower_state[15]) + '"></div>';//Top Tier 1
  towers_radiant += '<div class = "tower1 ' + buildingStatus(radiant_tower_state[14]) + '"></div>';//Top Tier 2
  towers_radiant += '<div class = "tower2 ' + buildingStatus(radiant_tower_state[13]) + '"></div>';//Top Tier 3
  towers_radiant += '<div class = "tower3 ' + buildingStatus(radiant_tower_state[12]) + '"></div>';//Middle Tier 1
  towers_radiant += '<div class = "tower4 ' + buildingStatus(radiant_tower_state[11]) + '"></div>';//Middle Tier 2
  towers_radiant += '<div class = "tower5 ' + buildingStatus(radiant_tower_state[10]) + '"></div>';//Middle Tier 3
  towers_radiant += '<div class = "tower6 ' + buildingStatus(radiant_tower_state[9]) + '"></div>';//Bottom Tier 1
  towers_radiant += '<div class = "tower7 ' + buildingStatus(radiant_tower_state[8]) + '"></div>';//Bottom Tier 2
  towers_radiant += '<div class = "tower8 ' + buildingStatus(radiant_tower_state[7]) + '"></div>';//Bottom Tier 3
  towers_radiant += '<div class = "tower9 ' + buildingStatus(radiant_tower_state[6]) + '"></div>';//Ancient Top
  towers_radiant += '<div class = "tower10 ' + buildingStatus(radiant_tower_state[5]) + '"></div>';//Ancient Bottom
  document.getElementById('towers-radiant').innerHTML = towers_radiant;

  towers_dire += '<div class = "tower11 ' + buildingStatus(dire_tower_state[15]) + '"></div>';//Top Tier 1
  towers_dire += '<div class = "tower12 ' + buildingStatus(dire_tower_state[14]) + '"></div>';//Top Tier 2
  towers_dire += '<div class = "tower13 ' + buildingStatus(dire_tower_state[13]) + '"></div>';//Top Tier 3
  towers_dire += '<div class = "tower14 ' + buildingStatus(dire_tower_state[12]) + '"></div>';//Middle Tier 1
  towers_dire += '<div class = "tower15 ' + buildingStatus(dire_tower_state[11]) + '"></div>';//Middle Tier 2
  towers_dire += '<div class = "tower16 ' + buildingStatus(dire_tower_state[10]) + '"></div>';//Middle Tier 3
  towers_dire += '<div class = "tower17 ' + buildingStatus(dire_tower_state[9]) + '"></div>';//Bottom Tier 1
  towers_dire += '<div class = "tower18 ' + buildingStatus(dire_tower_state[8]) + '"></div>';//Bottom Tier 2
  towers_dire += '<div class = "tower19 ' + buildingStatus(dire_tower_state[7]) + '"></div>';//Bottom Tier 3
  towers_dire += '<div class = "tower20 ' + buildingStatus(dire_tower_state[6]) + '"></div>';//Ancient Top
  towers_dire += '<div class = "tower21 ' + buildingStatus(dire_tower_state[5]) + '"></div>';//Ancient Bottom
  document.getElementById('towers-dire').innerHTML = towers_dire;

  rax_radiant += '<div class = "rax0 ' + buildingStatus(radiant_barracks_state[7]) + '"></div>';//Top Melee
  rax_radiant += '<div class = "rax1 ' + buildingStatus(radiant_barracks_state[6]) + '"></div>';//Top Ranged
  rax_radiant += '<div class = "rax2 ' + buildingStatus(radiant_barracks_state[5]) + '"></div>';//Middle Melee
  rax_radiant += '<div class = "rax3 ' + buildingStatus(radiant_barracks_state[4]) + '"></div>';//Middle Ranged
  rax_radiant += '<div class = "rax4 ' + buildingStatus(radiant_barracks_state[3]) + '"></div>';//Bottom Melee
  rax_radiant += '<div class = "rax5 ' + buildingStatus(radiant_barracks_state[2]) + '"></div>';//Bottom Ranged
  document.getElementById('rax-radiant').innerHTML = rax_radiant;

  rax_dire += '<div class = "rax6 ' + buildingStatus(dire_barracks_state[6]) + '"></div>';//Top Ranged
  rax_dire += '<div class = "rax7 ' + buildingStatus(dire_barracks_state[7]) + '"></div>';//Top Melee
  rax_dire += '<div class = "rax8 ' + buildingStatus(dire_barracks_state[5]) + '"></div>';//Middle Melee
  rax_dire += '<div class = "rax9 ' + buildingStatus(dire_barracks_state[4]) + '"></div>';//Middle Ranged
  rax_dire += '<div class = "rax10 ' + buildingStatus(dire_barracks_state[2]) + '"></div>';//Bottom Ranged
  rax_dire += '<div class = "rax11 ' + buildingStatus(dire_barracks_state[3]) + '"></div>';//Bottom Melee

  document.getElementById('rax-dire').innerHTML = rax_dire;
}

drawMap();
