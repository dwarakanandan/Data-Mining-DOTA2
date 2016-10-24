package dwaraka.ddns.net;

import java.io.File;
import java.io.FileReader;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class Main {
	
	static PlayerDatabase playerDatabase;
	static int g_count;
	
	public static void main(String[] args) throws Exception {
		playerDatabase = new PlayerDatabase();
		File folder = new File("replays_dem");
		File[] listOfFiles = folder.listFiles();
		for(File f:listOfFiles){
			try{
				g_count++;
				processMatch(f.getName());
			}
			catch(Exception e){
				cleanUp(f.getName());
			}
		}
		playerDatabase.closeConnection();
	}
	
	private static void processMatch(String fName) throws Exception{
		String match_id = fName.split("[.]")[0].split("_")[0];
		if(!playerDatabase.exists(match_id))
		{
			System.out.println(g_count+":Processing match "+match_id+" ...");
			Replay replay = new Replay("replays_dem/"+fName);
			int first_tick = 4500;
			while(replay.getPrimaryRune()==16777215)replay.seek(first_tick++);
			int last_tick = 30*1800+first_tick;
			first_tick = first_tick+1800;
			replay.seek(first_tick);
			insertMatchDetails(match_id,replay);
			int current_minute = 0;
			for(int t=first_tick;t<=last_tick;t+=1800)
			{
				replay.seek(t);
				current_minute++;
				playerDatabase.insertPlayerData(match_id,current_minute,replay.getPlayerData());
			}
			replay.stop();
		}
	}
	
	private static void cleanUp(String fName) throws Exception{
		String match_id_replay_salt = fName.split("[.]")[0];
		new File("replays_dem/"+match_id_replay_salt+".dem").delete();
		new File("replays/"+match_id_replay_salt+".dem.bz2").delete();
		new File("match_details/"+match_id_replay_salt.split("_")[0]+".json").delete();
		System.out.println("Deleted corrupt replay "+match_id_replay_salt);
	}
	
	private static void insertMatchDetails(String match_id,Replay replay)throws Exception{
		JSONParser parser = new JSONParser();
		JSONObject jsonObject = (JSONObject) parser.parse(new FileReader("match_details/"+match_id+".json"));
		JSONObject match = (JSONObject) jsonObject.get("match");
		long duration = (long) match.get("duration");
		long game_mode = (long) match.get("game_mode");
		String result = "";
		if((long)match.get("match_outcome") == 2)result = "radiant";
		else result = "dire";
		String details = match_id+","+game_mode+","+duration+",'"+result+"'";
		for(int i=0;i<10;i++)
			details+=","+replay.getHeroId(i);
		playerDatabase.insertMatchData(details);
	}
	
}
