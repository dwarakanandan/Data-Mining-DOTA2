import sqlite3
import os

print "Synchronizing replays..."
replays_list = os.listdir("replays")
replays = []
for i in replays_list:
	replays.append(i.split(".")[0].split("_")[0]+".json")

match_details_list = os.listdir("match_details")
for i in match_details_list:
	if i not in replays:
		os.remove("match_details/"+i)

replays = []
for i in replays_list:
	replays.append(i.split(".")[0]+".dem")

replays_dem_list = os.listdir("replays_dem")
for i in replays_dem_list:
	if i not in replays:
		os.remove("replays_dem/"+i)


print "Synchronizing database..."
try:
    connection = sqlite3.connect("dota2.db")
    connection.execute("ATTACH 'dota2_0.db' AS one;")
    connection.execute("INSERT INTO match_data SELECT * FROM one.match_data;")
    connection.execute("INSERT INTO player_data SELECT * FROM one.player_data;")
    connection.execute("ATTACH 'dota2_1.db' AS two;")
    connection.execute("INSERT INTO match_data SELECT * FROM two.match_data;")
    connection.execute("INSERT INTO player_data SELECT * FROM two.player_data;")
    connection.execute("ATTACH 'dota2_2.db' AS three;")
    connection.execute("INSERT INTO match_data SELECT * FROM three.match_data;")
    connection.execute("INSERT INTO player_data SELECT * FROM three.player_data;")
    connection.execute("ATTACH 'dota2_3.db' AS four;")
    connection.execute("INSERT INTO match_data SELECT * FROM four.match_data;")
    connection.execute("INSERT INTO player_data SELECT * FROM four.player_data;")
    connection.commit()
    connection.execute("delete from match_data where match_id in (select match_id from player_data group by match_id having count(*)<30);")
    connection.execute("delete from player_data where match_id in (select match_id from player_data group by match_id having count(*)<30);")
    connection.commit()
except Exception as e:
    print "SQLite Exception..."
