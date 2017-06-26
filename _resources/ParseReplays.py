import os
import subprocess

if os.path.exists("dota2_0.db"):
    os.remove("dota2_0.db")
    os.remove("dota2_1.db")
    os.remove("dota2_2.db")
    os.remove("dota2_3.db")

print "Starting dota2 parser..."
subprocess.call(['java', '-jar', 'Dota2-Parser.one-jar.jar'])
