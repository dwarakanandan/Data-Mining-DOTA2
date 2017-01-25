var heroes, match, netWorthRadiant = 0, netWorthDire = 0;

function n(n){
return n > 9 ? "" + n: "0" + n;
}

function matchDuration(){
  return (n(Math.floor(match.scoreboard.duration/60)) + ":" + n(Math.floor(((match.scoreboard.duration/60)%1) * 60)));
}

function preProcess(){
  for(i = 0;i < match.scoreboard.radiant.players.length;i++){
    netWorthRadiant += match.scoreboard.radiant.players[i].net_worth;
  }
  for(i = 0;i < match.scoreboard.dire.players.length;i++){
    netWorthDire += match.scoreboard.dire.players[i].net_worth;
  }
}

function loadMatchDetails(){
  document.getElementById("match_id").innerHTML = match.match_id;
  document.getElementById("match_duration").innerHTML = matchDuration();
  document.getElementById("net_worth_radiant").innerHTML = netWorthRadiant;
  document.getElementById("net_worth_dire").innerHTML = netWorthDire;
}

function loadPredictionDetails(result){
  if(match.scoreboard.duration > 119){
    if(result.prediction_success == "true"){
      var winningTeam = (result.prediction == "radiant" ? '<span class = "display_radiant">' + result.prediction.toUpperCase() + '</span>':'<span class = "display_dire">' + result.prediction.toUpperCase() + '</span>');
      document.getElementById("prediction_team").innerHTML = winningTeam;
      document.getElementById("prediction_probability_radiant").innerHTML = (result.prediction_probablity.radiant_probablity * 100).toFixed(2) + "%";
      document.getElementById("prediction_probability_dire").innerHTML = (result.prediction_probablity.dire_probablity * 100).toFixed(2) + "%";
      document.getElementById("prediciton_accuracy").innerHTML = result.global_prediction_accuracy.toFixed(2) + "%";
    }else {
      document.getElementById("prediction_team").innerHTML = "FAILED";
      document.getElementById("prediction_probability_radiant").innerHTML = "FAILED";
      document.getElementById("prediction_probability_dire").innerHTML = "FAILED";
      document.getElementById("prediciton_accuracy").innerHTML = "FAILED";
    }

  }else{
    document.getElementById("pie-chart-wrapper").style.display = "none";
    document.getElementById("row_prediction_details").innerHTML = "Match Duration is less than 2 min. Please try again later";
  }
}

function onloadFunc(){
  var matchString = sessionStorage.match;
  match = JSON.parse(matchString);
  heroes = JSON.parse(sessionStorage.heroes);
  preProcess();
  loadMatchDetails();
  //post request to predictor
  var xhr = new XMLHttpRequest();
  xhr.open("POST","predict", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(matchString)
  xhr.onload = function(){
  var result = xhr.responseText;
  result= JSON.parse(result);
  console.log(result);
  loadPredictionDetails(result);
  var htmlString = "";
    if(match.scoreboard.duration > 119){
      pieGraph(result["prediction_probablity"]["radiant_probablity"].toFixed(4),result["prediction_probablity"]["dire_probablity"].toFixed(4));
    }
  }
};

function pieGraph(radiantProb,direProb){
radiantProb = radiantProb * 100.0 ;
direProb = direProb * 100.0 ;
var data = google.visualization.arrayToDataTable([
         ['Team', 'Win Probablity'],
         ['Radiant', 0],
         ['Dire', 100],
       ]);

var options = {
             titlePosition: 'none',
             is3D: true,
             pieSliceTextStyle : {color:'black',fontSize:30},
             titleTextStyle:{ color : 'white'},
             legend : {position: "bottom", textStyle: { color: 'white' } },
             backgroundColor: 'black',
             chartArea: {
                           left:200,
                           top:0,
                         },
            tooltip : { text:'percentage'} ,
            slices: {
                     0: { color: '#00ff00' },
                     1: { color: '#ff0000' }
                   },

      };
var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
//google.charts.setOnLoadCallback(drawChart); <!-- setting callback -->
function drawChart(){
  chart.draw(data, options);
  var percent = 0;
  var handler = setInterval(function(){
  percent += 1;
  data.setValue(0, 1, percent);
  data.setValue(1, 1, 100 - percent);

  chart.draw(data, options);

  if (percent > (radiantProb -1) ){
      clearInterval(handler);
      data.setValue(0, 1, radiantProb);
      data.setValue(1, 1, direProb);
      chart.draw(data,options);
  }
  }, 30);

  }

  drawChart();
}
