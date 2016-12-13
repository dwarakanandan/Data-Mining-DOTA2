package dwaraka.ddns.net;

import java.io.File;
import java.util.ArrayList;

public class Main {
	
	public static void main(String[] args) throws Exception {
		File folder = new File("replays_dem");
		File[] listOfFiles = folder.listFiles();
		ArrayList<String> list0=new ArrayList<String>();
		ArrayList<String> list1=new ArrayList<String>();
		ArrayList<String> list2=new ArrayList<String>();
		ArrayList<String> list3=new ArrayList<String>();
		int count = 0;
		for(File f:listOfFiles){
			switch(count){
				case 0:
					list0.add(f.getName());
					break;
				case 1:
					list1.add(f.getName());
					break;
				case 2:
					list2.add(f.getName());
					break;
				case 3:
					list3.add(f.getName());
					break;
			}
			count = (count+1)%4;
		}
		PlayerDatabase playerDatabase = new PlayerDatabase("dota2.db");
		WorkerThread worker0 = new WorkerThread("0",list0,playerDatabase);
		WorkerThread worker1 = new WorkerThread("1",list1,playerDatabase);
		WorkerThread worker2 = new WorkerThread("2",list2,playerDatabase);
		WorkerThread worker3 = new WorkerThread("3",list3,playerDatabase);
		try{
			worker0.t.join();
			worker1.t.join();
			worker2.t.join();
			worker3.t.join();
		}catch(InterruptedException e){
			System.out.println("Main interrupted");
		}
		playerDatabase.closeConnection();
	}
}
