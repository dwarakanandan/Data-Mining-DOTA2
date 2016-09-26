## Synopsis

A Data Mining Project on Dota-2 replay.In this project we attempt to create a model using 
machine learning that can predict the winning team of a Dota 2 game given partial data
collected as the game progresses.

## Setup

* Data Acquisition :
	* REQUIREMENTS - Python 2.7 , Node-JS
	* This step involes fetching the replay files from Steam servers. Code base written in Python and Node-JS. A 	  plugin called Node-Dota2 is used to emulate the Dota 2 Client [https://github.com/Arcana/node-dota2].
	* In main_handler.py set the NUM_REPLAYS_TO_DOWNLOAD.
	* Run main_handler.py to download a set of match data (*.json) files for various matches using the Steam Web-API 	  	  and Dota 2 Client.
	* Next run the download_handler.py, this will download the replay files (*.dem.bz2) in compressed format from 	  Steam servers to a resources folder.
	* Run the extract.py to validate the replays and extract these bz2 files to actual game demo files (*.dem) all located in a resources folder.
 
* Data Extraction :
	* REQUIREMENTS - Java , Maven
	* This step involves extracting data from the demo files and building a Sqlite database to store all relevant
	  attributes of the game. Code base written in Java. A plugin called Clarity 2 was used to extract raw data from the replay files 	  	  [https://github.com/skadistats/clarity].
	* Compile the Maven project in data_extraction using $mvn package.
	* Move the generated jar file in the Target directory to the resources folder.
	* Run the jar file, this analyzes each replay file and extracts a relevant set of attributes.These are stored in a Sqlite3 database file named
	  dota2.db.
	* This database file is used as the prime data source for subsequent steps in our project.
## Motivation

This project is being developed as part of the curriculum for 8th semester under Visvesvaraya Technological University.