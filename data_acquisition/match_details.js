var current =3;
var max = process.argv.length;
var match_id = process.argv[current];
var config_file = process.argv[2];


var steam = require("../../plugins/node-dota2/node_modules/steam"),
		util = require("util"),
		fs = require("fs"),
		crypto = require("crypto"),
		dota2 = require("../../plugins/node-dota2"),
		steamClient = new steam.SteamClient(),
		steamUser = new steam.SteamUser(steamClient),
		steamFriends = new steam.SteamFriends(steamClient),
		Dota2 = new dota2.Dota2Client(steamClient, true);

global.config = require(config_file);


var onSteamLogOn = function onSteamLogOn(logonResp) {
				if (logonResp.eresult == steam.EResult.OK) {
						steamFriends.setPersonaState(steam.EPersonaState.Busy);
						steamFriends.setPersonaName("dhdeubot");
						//util.log("Logged on.");
						Dota2.launch();
						Dota2.on("ready", function() {
								//console.log("Node-dota2 ready.");
								Dota2.requestMatchDetails(match_id);//expens
						});
						Dota2.on("matchDetailsData", function (matchId, matchData) {
							console.log((current-2)+"  Got match details - "+matchId);
							var outputFilename = "../../resources/match_details/"+matchId+".json";
							fs.writeFile(outputFilename,JSON.stringify(matchData, null, 2), function(err) {
									if(err) {
										console.log(err);
									}
									current = current+1;
									if(current<max){
										match_id = process.argv[current];
										Dota2.requestMatchDetails(match_id);
									}
									else{
										process.exit();
									}
							});
					});
				}
		},
		onSteamServers = function onSteamServers(servers) {
				//util.log("Received servers.");
		},
		onSteamLogOff = function onSteamLogOff(eresult) {
				//util.log("Logged off from Steam.");
		},
		onSteamError = function onSteamError(error) {
				util.log("Connection closed by server.");
		};

steamUser.on('updateMachineAuth', function(sentry, callback) {
    var hashedSentry = crypto.createHash('sha1').update(sentry.bytes).digest();
    fs.writeFileSync('./config/sentry', hashedSentry)
    util.log("sentryfile saved");
    callback({
        sha_file: hashedSentry
    });
});

var logOnDetails = {
    "account_name": global.config.steam_user,
    "password": global.config.steam_pass,
};
if (global.config.steam_guard_code) logOnDetails.auth_code = global.config.steam_guard_code;

try {
    var sentry = fs.readFileSync('./config/sentry');
    if (sentry.length) logOnDetails.sha_sentryfile = sentry;
} catch (beef) {
    //util.log("Cannae load the sentry. " + beef);
}

steamClient.connect();
steamClient.on('connected', function() {
    steamUser.logOn(logOnDetails);
});
steamClient.on('logOnResponse', onSteamLogOn);
steamClient.on('loggedOff', onSteamLogOff);
steamClient.on('error', onSteamError);
steamClient.on('servers', onSteamServers);
