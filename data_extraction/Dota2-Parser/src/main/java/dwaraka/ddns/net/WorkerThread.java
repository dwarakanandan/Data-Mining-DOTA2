package dwaraka.ddns.net;

import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

class WorkerThread implements Runnable{
	Thread t;
	PlayerDatabase playerDatabase;
	ArrayList<String> listOfFiles;
	ArrayList<Long> matchIds;
	String threadID;
	int num;
	int max;

	WorkerThread(String threadID,ArrayList<String> listOfFiles,ArrayList<Long> matchIds){
		t = new Thread(this,threadID);
		this.listOfFiles = listOfFiles;
		this.threadID = threadID;
		this.matchIds = matchIds;
		max = listOfFiles.size();
		num = 0;
		t.start();
	}

	public void run(){
		try{
			playerDatabase = new PlayerDatabase("dota2_"+threadID+".db");
			for(String s:listOfFiles){
				File f = new File("replays_dem/"+s);
				try{
					num++;
					processMatch(f.getName());
					if((num%2)==0)
						playerDatabase.performCommit();
				}
				catch(Exception e){
					cleanUp(f.getName());
				}
			}
			playerDatabase.performCommit();
			playerDatabase.closeConnection();
		}
		catch(Exception e){

		}
	}

	private boolean exists(String match_id){
		Long matchId = Long.parseLong(match_id);
		for(Long i:matchIds)
		{
			if(i.longValue()==matchId.longValue())
			{
				return true;
			}
		}
		return false;
	}

	private void processMatch(String fName) throws Exception{
		String match_id = fName.split("[.]")[0].split("_")[0];
		if(!exists(match_id))
		{
			System.out.println("[Thread "+threadID+"]"+"["+(max-num)+"]"+":Processing match "+match_id+"...");
			Replay replay = new Replay("replays_dem/"+fName);
			int first_tick = 4500;
			if(Long.parseLong(match_id)>=2842495294L)
				while(replay.getBountyRune_1()==16777215)replay.seek(first_tick++);
			else
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

	private void cleanUp(String fName) throws Exception{
		String match_id_replay_salt = fName.split("[.]")[0];
		new File("replays_dem/"+match_id_replay_salt+".dem").delete();
		new File("replays/"+match_id_replay_salt+".dem.bz2").delete();
		new File("match_details/"+match_id_replay_salt.split("_")[0]+".json").delete();
		System.out.println("[Thread "+threadID+"]"+":Deleted corrupt replay "+match_id_replay_salt);
	}

	private void insertMatchDetails(String match_id,Replay replay)throws Exception{
		JSONParser parser = new JSONParser();
		FileReader fileReader = new FileReader("match_details/"+match_id+".json");
		JSONObject jsonObject = (JSONObject) parser.parse(fileReader);
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
		fileReader.close();
	}
}
