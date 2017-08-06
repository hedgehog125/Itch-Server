import AutoUpdate, os
AutoUpdate.database = "https://raw.githubusercontent.com/hedgehog125/Itch-Server_Database/master/"
AutoUpdate.init()
exec(open("Assets/Server.py").read())