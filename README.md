# Itch-Server
The server for Itch, allows easy saving/loading and sharing projects with your LAN.

# If you've ever installed one of my web servers on your computer skip straight to "Running".

# Installing
The Itch Server requires some software...
  * Python 3+
  * Pip for python 3 (to install bottle)
  * Brew (only for mac users)
  * Bottle
  
Download python from www.python.org make sure you download python 3+
# Mac users:
Run the following commands in the terminal...
  * /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  * brew install python3
  * pip3 install bottle
  
# Windows users:
Do the following...
  * Go to https://www.windowscentral.com/how-install-bash-shell-command-line-windows-10 to find out how to get the command line.
  * Follow the instructions for Linux.

# Linux based users:
Run the following commands in the terminal...
  * sudo apt-get install python3-pip
  * pip3 install bottle
  
Note: You will need to enter a super user's password to install pip.
To see if you have pip3, type pip3 into the terminal. It will tell you if you don't.
To see if you have bottle, type python -c "import bottle" into the terminal. It will give you an error if you don't have it.


# Running
Run "BottleWebServer.py" using python 3+

# Accessing
When you run the server it should say "Listening on http://<[your ip]>:8000" simply copy the url that the server prints into your browser.
You can also access the website from other computers, providing you're on the same network.

Enjoy! :D
