# Released under cc licence: https://creativecommons.org/
# Made by @hedgehog125 on github.com and scratch.mit.edu
# On Github: https://github.com/hedgehog125/AutoUpdate_v2/tree/master
import urllib.request, os, shutil, ast, math
from time import sleep
database = "unknown"
changeAmount = 0
done = False


def parse(string):
    return ast.literal_eval(string)

def getWebInfo(Address, decode=True):
    url = Address
    response = urllib.request.urlopen(url)
    data = response.read()      # a `bytes` object
    if not decode:
        return data
    text = data.decode('utf-8') # a `str`; this step can't be used if data is binary
    return text

def checkPath(path):
    if path[0] == "/":
        raise ValueError("Security risk: File path starts with a slash, may be trying to modify your files.")
    else:
        if ".." in path:
            raise ValueError('Security risk: File path contains "..", may be trying to modify your files.')
    # If it makes it this far it's all good. ;)

def openFile(File,Write = False,Text = ""):
    if Write:
        f = open(File,'w')
        checkPath(File)
        f.write(Text)
    else:
        f = open(File)
        text = f.readlines()
        f.close()
        return text
    f.close()
    
# Mostly from https://stackoverflow.com/questions/15323574/how-to-connect-a-progress-bar-to-a-function

import tkinter as tk
from tkinter import ttk
import threading
import queue
import time
import urllib, webbrowser, os

status = "Checking for updates..."
newVersions = []
changeProgress = 0

def changeLog():
    webbrowser.open('file://' + os.path.realpath("Changelogs/Latest.html"))

class App(tk.Tk):
    ''' Creates the window and starts the thread(s).'''

    def __init__(self):
        tk.Tk.__init__(self)

        self.title("Checking for updates...")
        self.attributes("-topmost", True)
        self.queue = queue.Queue()
        self.listbox = tk.Listbox(self, width=20, height=5)
        self.progressbar = ttk.Progressbar(self, orient='horizontal',
                                           length=300, mode='determinate')
        self.button = tk.Button(self, text="View Changelog", command=changeLog)
        self.spawnthread()
        self.progressbar.pack(padx=10, pady=10)
        self.button.pack(padx=10, pady=10)


    def spawnthread(self):
        self.button.config(state="disabled")
        self.thread = ThreadedClient(self.queue)
        self.thread.start()
        self.periodiccall()

    def periodiccall(self):
        self.checkqueue()
        self.button.config(state="active")
        self.title(status)
        if self.thread.is_alive():
            self.after(100, self.periodiccall)         
        else:
            if len(newVersions) == 0:
                self.button.config(state="disabled")
            self.after(5000, self.destroy)

    def checkqueue(self):
        global changeProgress
        while self.queue.qsize():
            try:
                msg = self.queue.get(0)
                self.listbox.insert('end', msg)
                progressToChange = changeProgress
                if progressToChange >= 100:
                    self.progressbar.step(99.9999)
                else:
                    self.progressbar.step(progressToChange)
                changeProgress = changeProgress - progressToChange
            except Queue.Empty:
                pass


class ThreadedClient(threading.Thread):
    ''' Calls install function.'''

    def __init__(self, queue):
        threading.Thread.__init__(self)
        self.queue = queue
   

    def run(self):
        while database == "unknown":
            time.sleep(0.1)
            
        self.install()

    def install(self): # Now my code...
        global status
        global newVersions
        global amount
        global changeProgress
        global done
        
        avalibleVersions = parse(getWebInfo(database + "Versions.txt"))
        installedVersions = parse(" \n".join(openFile("Installed.txt")))
        newVersions = list(avalibleVersions)
        for i in range(len(installedVersions)):
            del newVersions[0]

        if len(newVersions) == 0: # No updates.
            changeProgress = 100
            done = True
            self.queue.put("")
            status = "No updates found."
        else:
            if len(newVersions) == 1:
                status = str(len(newVersions)) + " update found!"
            else:
                status = str(len(newVersions)) + " updates found!"

            time.sleep(1)
            status = "Fetching filelist..."
            fileList = parse(getWebInfo(database + "Files.txt"))
            changeLogs = parse(getWebInfo(database + "ChangeLogs.txt"))
            
            links = ""
            keys = list(changeLogs.keys())
            
            default = '''
<center><b><u><font size='10'>
AutoUpdate v2: Latest updates: ChangeLogs
</font></b></u></center><br>
'''
            back = "<center><a href='../Latest.html'>Back</a></center><br>"
            
            for i in range(len(changeLogs)):
                c = keys[i]
                if not c in installedVersions:
                    openFile("Changelogs/Changelogs/" + c + ".html", True, default + back + " \n".join(changeLogs[c]))
                    links = links + "<a href='Changelogs/" + c + ".html'>" + c + "</a>" + "<br> \n"

            openFile("Changelogs/Latest.html", True, default + links)
    
                    
            
            time.sleep(1)
            
            
            status = "Downloading files... 0%"
            
            progress = 0
            add = 0
            for i in fileList:
                writtenFile = False
                if i[0].lower() == "file":
                    checkPath("Assets/" + i[1])
                    g = urllib.request.urlopen(database + "Assets/" + i[1])
                    read = False
                    try:
                        currentContents = open("Assets/" + i[1], 'b').read()
                        read = True
                    except:
                        read = False
                    write = False
                    if not read:
                        write = True
                    else:
                        if currentContents != g.read():
                            write = True
                    
                    if write:
                        writtenFile = True
                        with open("Assets/" + i[1], 'b+w') as f:
                            f.write(g.read())
                    else:
                        add = add + (100 / len(fileList))
                else:
                    checkPath("Assets/" + i[1])
                    writtenFile = True
                    try:
                        os.makedirs("Assets/" + i[1])
                    except:
                        time.sleep(0)

                if writtenFile or i == len(fileList):
                    time.sleep(0.15)
                    changeProgress = 100 / len(fileList) + add
                    add = 0

                progress = progress + (100 / len(fileList))
                
                status = "Downloading files... " + str(math.floor(progress)) + "%"
                self.queue.put("")

            time.sleep(0.25)
            changeProgress = 100
            self.queue.put("")
            status = "Downloading files... 100%"
            time.sleep(1)
            status = "Updating save file..."
            openFile("Installed.txt", True, str(avalibleVersions))
            time.sleep(1)
            status = "All done."
            time.sleep(1)
            status = "Successfully updated your program."
            done = True
                       

def init():
    app = App()
    app.mainloop()
    while not done:
        time.sleep(0.1)




