google.charts.load('current', {'packages':['corechart']}); <!-- load the visualization api -->
var heroes, match;
var radiant_tower_state, dire_tower_state, radiant_barracks_state, dire_barracks_state;

function n(n){
return n > 9 ? "" + n: "0" + n;
}

function displayScoreBoard(match){
  document.getElementById('radiant-score').innerHTML = match.scoreboard.radiant.score;
  document.getElementById('dire-score').innerHTML = match.scoreboard.dire.score;
}

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
  radiant_tower_state = toBinary(match.scoreboard.radiant.tower_state, 16);
  dire_tower_state = toBinary(match.scoreboard.dire.tower_state, 16);
  radiant_barracks_state = toBinary(match.scoreboard.radiant.barracks_state, 8);
  dire_barracks_state = toBinary(match.scoreboard.dire.barracks_state, 8);

  console.log("Radiant tower state: " + match.scoreboard.radiant.tower_state + " : " + radiant_tower_state);
  console.log("Dire tower state: " + match.scoreboard.dire.tower_state + " : " + dire_tower_state);
  console.log("Radiant barracks state: " + match.scoreboard.radiant.barracks_state + " : " + radiant_barracks_state);
  console.log("Dire barracks state: " +match.scoreboard.dire.barracks_state + " : " + dire_barracks_state);


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

function onloadFunc(){
  var matchString = sessionStorage.match;
  match = JSON.parse(matchString);
  heroes = JSON.parse(sessionStorage.heroes);
  //post request to predictor
  var xhr = new XMLHttpRequest();
  xhr.open("POST","predict", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(matchString)
  xhr.onload = function(){
  var result = xhr.responseText;
  result= JSON.parse(result);
  console.log(result);
  var htmlString = "";
  displayScoreBoard(match);
  drawMap();
  if(match.scoreboard.duration < 120)
  {
    htmlString += "<h3>The match duration is less than 2 mins. Try again later.</h3>"
    document.getElementById('toggleteamindividual').style.display = 'none';
  }else{
    if(result.prediction_success == "true"){
      var predict_result = "<h3>Prediction probablity for Radiant : "+ result["prediction_probablity"]["radiant_probablity"].toFixed(3)+"</h3>";
      predict_result += "<h3> Prediction probablity for Dire :"+ result["prediction_probablity"]["dire_probablity"].toFixed(3)+"</h3>";
      predict_result += "<h3> Prediction accuracy is : "+result["global_prediction_accuracy"].toFixed(3)+"</h3>";
      predict_result += "<h3> Predicted Winner is : "+result["prediction"]+"</h3>";
      document.getElementById("prediction").innerHTML = predict_result;
    }
    htmlString += "<h3>The match duration is " + n(Math.floor(match.scoreboard.duration/60)) + ":" + n(Math.floor(((match.scoreboard.duration/60)%1) * 60)) + "</h3>";
    //htmlString += "<h3>The Score of Radiant:Dire is " + match.scoreboard.radiant.score + " : " + match.scoreboard.dire.score + "</h3>";
    htmlString += "<h3>Networth of Radiant:Dire is ";

    var netWorthRadiant = 0;
    var netWorthDire = 0;
    var netWorthRArr = [];
		var netWorthDArr = [];
      for(i = 0;i < match.scoreboard.radiant.players.length;i++){
        netWorthRadiant += match.scoreboard.radiant.players[i].net_worth;
        netWorthRArr[i] = match.scoreboard.radiant.players[i].net_worth;
      }
      for(i = 0;i < match.scoreboard.dire.players.length;i++){
        netWorthDire += match.scoreboard.dire.players[i].net_worth;
  			netWorthDArr[i] = match.scoreboard.dire.players[i].net_worth;
      }
    htmlString +=  netWorthRadiant + " : " + netWorthDire;

    htmlString += "<h3>Math ID is " + match.match_id;
    
    barGraph(netWorthRadiant,netWorthDire,netWorthRArr,netWorthDArr);
    }
    document.getElementById("match_details").innerHTML = htmlString  + "</h3>";
  }
};



function barGraph(netWorthRadiant,netWorthDire,netWorthRArr,netWorthDArr){
  var toggleteamindividual = document.getElementById('toggleteamindividual');

  var data1 = google.visualization.arrayToDataTable([
      ['Team', 'Player 1',{ role: 'style' }, 'Player 2',{ role: 'style' }, 'Player 3',{ role: 'style' }, 'Player 4',{ role: 'style' },'Player 5', { role: 'style' }],
      ['Radiant', netWorthRArr[0],'opacity:0.8',netWorthRArr[1],'opacity:0.8', netWorthRArr[2],'opacity:0.8', netWorthRArr[3],'opacity:0.8',netWorthRArr[4], 'opacity:0.8'],
      ['Dire', netWorthDArr[0],'opacity:0.8', netWorthDArr[1],'opacity:0.8',netWorthDArr[2],'opacity:0.8',netWorthDArr[3],'opacity:0.8',netWorthDArr[4], 'opacity:0.8'],
   ]);

   var data2 = google.visualization.arrayToDataTable([
     ['Team', 'Net Worth',{ role: 'style' }],
     ['Radiant', netWorthRadiant,'opacity:0.8; color: #00ff00;'],
     ['Dire', netWorthDire,'opacity:0.8; color: #ff0000;'],
   ]);

   var options = {
      title: "Net Worth of Each Player",
      width: 680,
      height: 400,
      bar: {groupWidth: "45%"},
      legend : {position: "bottom", textStyle: { color: 'white' } },
      titleTextStyle:{ color : 'white'},
      vAxis: {title:'Team',  titleTextStyle: { color: 'white'} , textStyle: { color: 'white'} },
      hAxis: {title:'Net Worth',minValue: 0  , titleTextStyle: { color: 'white'}, textStyle: { color: 'white'} },
      isStacked: 'absolute',
      backgroundColor: 'black',
      chartArea: {
                    backgroundColor: {
                           stroke: 'white',
                             strokeWidth: 3
                      }
                  },

     animation: {easing: 'out', duration: 1000,}
       };

    var chart = new google.visualization.BarChart(document.getElementById('chart'));

  //  google.charts.setOnLoadCallback(drawChart); <!-- setting callback -->
    function drawChart(){
   /* var data = google.visualization.arrayToDataTable([
       ['Team', 'this color needs to change', { role: 'style' },  { role: 'annotation' }],
       ['Radiant', netWorthRadiant, 'color:green ; opacity:0.8',netWorthRadiant],
       ['Dire', netWorthDire, 'color:red ; opacity:0.8', netWorthDire ],
    ]); */
      toggleteamindividual.disabled = true;
      google.visualization.events.addListener(chart, 'ready',
        function() {
          toggleteamindividual.disabled = false;
          toggleteamindividual.innerHTML = 'Switch to ' + (options.title == "Net Worth of Each Player" ? 'Team' : 'Players');
        });

    chart.draw(data1, options);
    }

      toggleteamindividual.onclick = function(){
        if(options.title == "Net Worth of Each Player"){
          options.title = "Net Worth of Teams";
          options.legend = { position: 'none' };
          options.animation = {easing: 'out', duration: 1000 };
          chart.draw(data2, options);
        }else{
          options.title = "Net Worth of Each Player";
          options.legend = { position: "bottom", textStyle: { color: 'white' } };
          chart.draw(data1, options);
        }
      }

      drawChart();
  }
