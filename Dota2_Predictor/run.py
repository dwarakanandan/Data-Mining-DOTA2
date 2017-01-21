import subprocess

p1 = subprocess.Popen(['python','update_livegames.py'])
p2 = subprocess.Popen(['python','manage.py','runserver','0.0.0.0:8000'])

p1.communicate()
p2.communicate()
