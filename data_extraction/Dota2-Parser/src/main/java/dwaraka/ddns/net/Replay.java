package dwaraka.ddns.net;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import skadistats.clarity.decoder.Util;
import skadistats.clarity.model.EngineType;
import skadistats.clarity.model.Entity;
import skadistats.clarity.model.FieldPath;
import skadistats.clarity.processor.entities.Entities;
import skadistats.clarity.processor.entities.UsesEntities;
import skadistats.clarity.processor.runner.ControllableRunner;
import skadistats.clarity.source.MappedFileSource;
import skadistats.clarity.util.TextTable;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.IOException;
import java.io.FileReader;
import java.io.File;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

@UsesEntities
class Replay{
	private final ControllableRunner runner;

	public Replay(String fileName) throws IOException,InterruptedException {
		runner = new ControllableRunner(new MappedFileSource(fileName)).runWith(this);
		runner.seek(2);
	}
	
	public void seek(int tick) throws InterruptedException{
		runner.seek(tick);
	}
	
	public void stop(){
		runner.halt();
	}
	
	public int getLastTick() throws IOException{
		return runner.getLastTick();
	}
	
	public int getHeroId(int player_pos){return getIntResource("CDOTA_PlayerResource","m_vecPlayerTeamData.000"+player_pos+".m_nSelectedHeroID");}
	public int getKills(int player_pos){return getIntResource("CDOTA_PlayerResource","m_vecPlayerTeamData.000"+player_pos+".m_iKills");}
	public int getAssists(int player_pos){return getIntResource("CDOTA_PlayerResource","m_vecPlayerTeamData.000"+player_pos+".m_iAssists");}
	public int getDeaths(int player_pos){return getIntResource("CDOTA_PlayerResource","m_vecPlayerTeamData.000"+player_pos+".m_iDeaths");}
	public int getLevel(int player_pos){return getIntResource("CDOTA_PlayerResource","m_vecPlayerTeamData.000"+player_pos+".m_iLevel");}
	public int getNetWorth(int player_pos){return getIntResource("CDOTA_DataSpectator","m_iNetWorth.000"+player_pos);}
	public int getTotalGoldEarned(int player_pos){
		if(player_pos<5)
			return getIntResource("CDOTA_DataRadiant","m_vecDataTeam.000"+player_pos+".m_iTotalEarnedGold");
		return getIntResource("CDOTA_DataDire","m_vecDataTeam.000"+(player_pos-5)+".m_iTotalEarnedGold");
	}
	public int getTotalXPEarned(int player_pos){
		if(player_pos<5)
			return getIntResource("CDOTA_DataRadiant","m_vecDataTeam.000"+player_pos+".m_iTotalEarnedXP");
		return getIntResource("CDOTA_DataDire","m_vecDataTeam.000"+(player_pos-5)+".m_iTotalEarnedXP");
	}
	public int getDenyCount(int player_pos){
		if(player_pos<5)
			return getIntResource("CDOTA_DataRadiant","m_vecDataTeam.000"+player_pos+".m_iDenyCount");
		return getIntResource("CDOTA_DataDire","m_vecDataTeam.000"+(player_pos-5)+".m_iDenyCount");
	}
	public int getLastHitCount(int player_pos){
		if(player_pos<5)
			return getIntResource("CDOTA_DataRadiant","m_vecDataTeam.000"+player_pos+".m_iLastHitCount");
		return getIntResource("CDOTA_DataDire","m_vecDataTeam.000"+(player_pos-5)+".m_iLastHitCount");
	}
	public float getStunDuration(int player_pos){
		if(player_pos<5)
			return getFloatResource("CDOTA_DataRadiant","m_vecDataTeam.000"+player_pos+".m_fStuns");
		return getFloatResource("CDOTA_DataDire","m_vecDataTeam.000"+(player_pos-5)+".m_fStuns");
	}
	public float getHealing(int player_pos){
		if(player_pos<5)
			return getFloatResource("CDOTA_DataRadiant","m_vecDataTeam.000"+player_pos+".m_fHealing");
		return getFloatResource("CDOTA_DataDire","m_vecDataTeam.000"+(player_pos-5)+".m_fHealing");
	}
	public int getTowerKills(int player_pos){
		if(player_pos<5)
			return getIntResource("CDOTA_DataRadiant","m_vecDataTeam.000"+player_pos+".m_iTowerKills");
		return getIntResource("CDOTA_DataDire","m_vecDataTeam.000"+(player_pos-5)+".m_iTowerKills");
	}
	public int getRoshanKills(int player_pos){
		if(player_pos<5)
			return getIntResource("CDOTA_DataRadiant","m_vecDataTeam.000"+player_pos+".m_iRoshanKills");
		return getIntResource("CDOTA_DataDire","m_vecDataTeam.000"+(player_pos-5)+".m_iRoshanKills");
	}
	public int getObserverWardsPlaced(int player_pos){
		if(player_pos<5)
			return getIntResource("CDOTA_DataRadiant","m_vecDataTeam.000"+player_pos+".m_iObserverWardsPlaced");
		return getIntResource("CDOTA_DataDire","m_vecDataTeam.000"+(player_pos-5)+".m_iObserverWardsPlaced");
	}
	public int getSentryWardsPlaced(int player_pos){
		if(player_pos<5)
			return getIntResource("CDOTA_DataRadiant","m_vecDataTeam.000"+player_pos+".m_iSentryWardsPlaced");
		return getIntResource("CDOTA_DataDire","m_vecDataTeam.000"+(player_pos-5)+".m_iSentryWardsPlaced");
	}
	public int getRunePickups(int player_pos){
		if(player_pos<5)
			return getIntResource("CDOTA_DataRadiant","m_vecDataTeam.000"+player_pos+".m_iRunePickups");
		return getIntResource("CDOTA_DataDire","m_vecDataTeam.000"+(player_pos-5)+".m_iRunePickups");
	}
	public int getCampsStacked(int player_pos){
		if(player_pos<5)
			return getIntResource("CDOTA_DataRadiant","m_vecDataTeam.000"+player_pos+".m_iCampsStacked");
		return getIntResource("CDOTA_DataDire","m_vecDataTeam.000"+(player_pos-5)+".m_iCampsStacked");
	}
	public int getPrimaryRune(){
		return getIntResource("CDOTA_DataSpectator","m_hPrimaryRune");
	}
	
	public int getBountyRune_1(){
		return getIntResource("CDOTA_DataSpectator","m_hBountyRune_1");
	}
	
	private int getIntResource(String entityName,String fieldName){
		Entity entity = getEntity(entityName);
		FieldPath fieldPath = entity.getDtClass().getFieldPathForName(fieldName);
		return entity.getPropertyForFieldPath(fieldPath);
	}
	
	public float getFloatResource(String entityName,String fieldName){
		Entity entity = getEntity(entityName);
		FieldPath fieldPath = entity.getDtClass().getFieldPathForName(fieldName);
		return entity.getPropertyForFieldPath(fieldPath);
	}

	private Entity getEntity(String entityName) {
			return runner.getContext().getProcessor(Entities.class).getByDtName(entityName);
	}
		
	public String getPlayerData() throws Exception{
		String playerData = "";
		for(int i=0;i<9;i++){
			String individualPlayerData = getIndividualPlayerData(i);
			playerData+=individualPlayerData+",";
		}
		playerData+=getIndividualPlayerData(9);
		return playerData;
	}
	
	private String getIndividualPlayerData(int player_id) throws Exception{
		String individualPlayerData="";
		individualPlayerData+=Integer.toString(getAssists(player_id))+",";
		individualPlayerData+=Integer.toString(getCampsStacked(player_id))+",";
		individualPlayerData+=Integer.toString(getDeaths(player_id))+",";
		individualPlayerData+=Integer.toString(getDenyCount(player_id))+",";
		individualPlayerData+=Float.toString(getHealing(player_id))+",";
		individualPlayerData+=Integer.toString(getKills(player_id))+",";
		individualPlayerData+=Integer.toString(getLastHitCount(player_id))+",";
		individualPlayerData+=Integer.toString(getLevel(player_id))+",";
		individualPlayerData+=Integer.toString(getNetWorth(player_id))+",";
		individualPlayerData+=Integer.toString(getObserverWardsPlaced(player_id))+",";
		individualPlayerData+=Integer.toString(getRoshanKills(player_id))+",";
		individualPlayerData+=Integer.toString(getRunePickups(player_id))+",";
		individualPlayerData+=Integer.toString(getSentryWardsPlaced(player_id))+",";
		individualPlayerData+=Float.toString(getStunDuration(player_id))+",";
		individualPlayerData+=Integer.toString(getTotalGoldEarned(player_id))+",";
		individualPlayerData+=Integer.toString(getTotalXPEarned(player_id))+",";
		individualPlayerData+=Integer.toString(getTowerKills(player_id));
		return individualPlayerData;
	}
}
