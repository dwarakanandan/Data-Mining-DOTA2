var match = JSON.parse(sessionStorage.match);
//google.charts.setOnLoadCallback(drawChart);
var toggleteamindividual = document.getElementById('toggleteamindividual');

var netWorthRadiant2 = 0;
var netWorthDire2 = 0;
var netWorthRArr = [];
var netWorthDArr = [];
for(i = 0;i < match.scoreboard.radiant.players.length;i++){
//  console.log(netWorthRadiant2);
 netWorthRadiant2 += match.scoreboard.radiant.players[i].net_worth;
  netWorthRArr[i] = match.scoreboard.radiant.players[i].net_worth;
}
for(i = 0;i < match.scoreboard.dire.players.length;i++){
  //console.log(netWorthDire2);
  netWorthDire2 += match.scoreboard.dire.players[i].net_worth;
  netWorthDArr[i] = match.scoreboard.dire.players[i].net_worth;
}

var data1, data2, chart;

var options = {
  title: "Net Worth of Each Player",
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

 animation: {"startup": true, easing: 'out', duration: 1000,}
   };
drawChart();
//  google.charts.setOnLoadCallback(drawChart); <!-- setting callback -->
function drawChart(){
/* var data = google.visualization.arrayToDataTable([
   ['Team', 'this color needs to change', { role: 'style' },  { role: 'annotation' }],
   ['Radiant', netWorthRadiant2, 'color:green ; opacity:0.8',netWorthRadiant2],
   ['Dire', netWorthDire2, 'color:red ; opacity:0.8', netWorthDire2 ],
]); */
  toggleteamindividual.style.display = "inline";
  chart = new google.visualization.BarChart(document.getElementById('chart'))

  data1 = google.visualization.arrayToDataTable([
    ['Team', 'Player 1',{ role: 'style' }, 'Player 2',{ role: 'style' }, 'Player 3',{ role: 'style' }, 'Player 4',{ role: 'style' },'Player 5', { role: 'style' }],
    ['Radiant', netWorthRArr[0],'opacity:0.8',netWorthRArr[1],'opacity:0.8', netWorthRArr[2],'opacity:0.8', netWorthRArr[3],'opacity:0.8',netWorthRArr[4], 'opacity:0.8'],
    ['Dire', netWorthDArr[0],'opacity:0.8', netWorthDArr[1],'opacity:0.8',netWorthDArr[2],'opacity:0.8',netWorthDArr[3],'opacity:0.8',netWorthDArr[4], 'opacity:0.8'],
  ]);

  data2 = google.visualization.arrayToDataTable([
   ['Team'   , '' ,'Net Worth' ,{ role: 'style' },' ','Net Worth'     ,{ role: 'style' },''],//Use same number of columns as data1 and then use 0.0 as the values of the not needed values
   ['Radiant',0.0 ,0.0         , ' '             ,0.0, netWorthRadiant2,'opacity:0.8;'   ,0.0],
   ['Dire'   ,0.0 ,netWorthDire2,'opacity:0.8;'   ,0.0,0.0             ,'opacity:0.8;'   ,0.0],
  ]);

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
    chart.draw(data2, options);
  }else{
    options.title = "Net Worth of Each Player";
    options.legend = { position: "bottom", textStyle: { color: 'white' } };
    chart.draw(data1, options);
  }
}
