import subprocess

p1 = subprocess.Popen(['python','update_livegames.py'])
p2 = subprocess.Popen(['python','manage.py','runserver'])

p1.communicate()
p2.communicate()
