package dwaraka.ddns.net;

import java.sql.*;
import java.io.File;
import java.util.ArrayList;

class PlayerDatabase{

	Connection c;
	String databaseName;

	PlayerDatabase(String databaseName){
		this.databaseName = databaseName;
		try {
			File file = new File(databaseName);
			Class.forName("org.sqlite.JDBC");
			System.out.println("Checking for database file "+databaseName+"...");
			if(file.exists())
				c = DriverManager.getConnection("jdbc:sqlite:"+databaseName);
			else{
				c = DriverManager.getConnection("jdbc:sqlite:"+databaseName);
				createDatabase();
			}
			c.setAutoCommit(false);
			Statement stmt = c.createStatement();
			stmt.executeUpdate("delete from match_data where match_id in (select match_id from player_data group by match_id having count(*)<30);");
			stmt.executeUpdate("delete from player_data where match_id in (select match_id from player_data group by match_id having count(*)<30);");
			stmt.close();
			c.commit();
		} catch ( Exception e ) {
			System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			System.exit(0);
		}
		System.out.println("Opened database "+databaseName+" successfully");
	}

	public void closeConnection(){
		try {
			c.close();
		} catch ( Exception e ) {
			System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			System.exit(0);
		}
		System.out.println("Database "+databaseName+" close successfully");
	}

	public void createDatabase(){
		Statement stmt = null;
		try {
			stmt = c.createStatement();
			String sqlMatchData = "CREATE TABLE MATCH_DATA"+
										"(MATCH_ID INT PRIMARY KEY," +
										" GAME_MODE INT," +
										" DURATION INT," +
										" MATCH_OUTCOME TEXT," +
										" PLAYER_0_HERO_ID INT," +
										" PLAYER_1_HERO_ID INT," +
										" PLAYER_2_HERO_ID INT," +
										" PLAYER_3_HERO_ID INT," +
										" PLAYER_4_HERO_ID INT," +
										" PLAYER_5_HERO_ID INT," +
										" PLAYER_6_HERO_ID INT," +
										" PLAYER_7_HERO_ID INT," +
										" PLAYER_8_HERO_ID INT," +
										" PLAYER_9_HERO_ID INT)";
			stmt.executeUpdate(sqlMatchData);
			System.out.println("Table MATCH_DATA created successfully");
			String sqlPlayerData = "CREATE TABLE PLAYER_DATA " +
									 "(MATCH_ID INT," +
									 " TIME_ELAPSED INT," +
									 getCreateStatement() +
									 " PRIMARY KEY (MATCH_ID,TIME_ELAPSED)," +
									 " FOREIGN KEY (MATCH_ID) REFERENCES MATCH_DATA(MATCH_ID) ON DELETE CASCADE)";
			stmt.executeUpdate(sqlPlayerData);
			System.out.println("Table PLAYER_DATA created successfully");
			stmt.close();
		} catch ( Exception e ) {
			System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			System.exit(0);
		}
	}

	public void insertPlayerData(String match_id,int time,String rawStatement){
		Statement stmt = null;
		try{

			stmt = c.createStatement();
			String sql = "INSERT INTO PLAYER_DATA VALUES("
									+ match_id +","+Integer.toString(time)+","
									+ rawStatement + ");";
			stmt.executeUpdate(sql);
			stmt.close();
			//c.commit();
		}catch ( Exception e ) {
			System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			System.exit(0);
		}
	}

	public void insertMatchData(String rawStatement){
		Statement stmt = null;
		try{
			c.setAutoCommit(false);
			stmt = c.createStatement();
			String sql = "INSERT INTO MATCH_DATA VALUES("
									+ rawStatement + ");";
			stmt.executeUpdate(sql);
			stmt.close();
			//c.commit();
		}catch ( Exception e ) {
			System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			System.exit(0);
		}
	}

  public void performCommit(){
    try{
      c.commit();
    }catch ( Exception e ) {
			System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			System.exit(0);
		}
  }

	/*
	public boolean exists(String match_id){
		boolean rval = true;
		Statement stmt = null;
		try {
			stmt = c.createStatement();
			ResultSet rs = stmt.executeQuery( "SELECT COUNT(*) AS NUM_ROWS FROM MATCH_DATA WHERE MATCH_ID = "+match_id+";" );
			if(rs.getInt("NUM_ROWS")==0)
				rval = false;
			rs.close();
			stmt.close();
		} catch ( Exception e ) {
			System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			System.exit(0);
		}
		return rval;
	}
	*/

	public ArrayList<Long> getMatchIds(){
		ArrayList<Long> matchIds = new ArrayList<Long>();
		try{
			Statement stmt = c.createStatement();
			ResultSet rs = stmt.executeQuery( "SELECT * FROM MATCH_DATA");
			while(rs.next())
				matchIds.add(rs.getLong("MATCH_ID"));
			stmt.close();
		}catch ( Exception e ) {
			System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			System.exit(0);
		}
		return matchIds;
	}

	private String getCreateStatement(){
		String createStatement = "";
		for(int i=0;i<10;i++){
			String partialCreateStatement =
									 " PLAYER_"+Integer.toString(i)+"_ASSISTS INT," +
									 " PLAYER_"+Integer.toString(i)+"_CAMPS_STACKED INT," +
									 " PLAYER_"+Integer.toString(i)+"_DEATHS INT," +
									 " PLAYER_"+Integer.toString(i)+"_DENY_COUNT INT," +
									 " PLAYER_"+Integer.toString(i)+"_HEALING REAL," +
									 " PLAYER_"+Integer.toString(i)+"_KILLS INT," +
									 " PLAYER_"+Integer.toString(i)+"_LAST_HIT_COUNT INT," +
									 " PLAYER_"+Integer.toString(i)+"_LEVEL INT," +
									 " PLAYER_"+Integer.toString(i)+"_NET_WORTH INT," +
									 " PLAYER_"+Integer.toString(i)+"_OBSERVER_WARDS_PLACED INT," +
									 " PLAYER_"+Integer.toString(i)+"_ROSHAN_KILLS INT," +
									 " PLAYER_"+Integer.toString(i)+"_RUNE_PICKUPS INT," +
									 " PLAYER_"+Integer.toString(i)+"_SENTRY_WARDS_PLACED INT," +
									 " PLAYER_"+Integer.toString(i)+"_STUN_DURATION REAL," +
									 " PLAYER_"+Integer.toString(i)+"_TOTAL_GOLD_EARNED INT," +
									 " PLAYER_"+Integer.toString(i)+"_TOTAL_XP_EARNED INT," +
									 " PLAYER_"+Integer.toString(i)+"_TOWER_KILLS INT," ;
			createStatement+=partialCreateStatement;
		}
		return createStatement;
	}
}
