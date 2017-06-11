from bottle import route, run, template, Bottle, request, os
import socket, urllib, ast, hashlib, binascii, sys, bottle, json
from time import sleep 

bottle.BaseRequest.MEMFILE_MAX = 10000 * 1024


def p(text, ID):
    return "<p id='" + ID + "'>" + text + "</p>"


def Open_File(File,Write=False,Text="",Bytes=False):
    f = ""
    if Write:
        if Bytes:
            f = open(File,'w+b')
            f.write(bytes(Text, 'UTF-8'))
        else:
            f = open(File,'w')
            f.write(Text)
    else:
        if Bytes:
            try:
                f = open(File, "r+b")
            except:
                text = ["404: File not found."]
                return text 
        else:
            try:
                f = open(File)
            except:
                text = ["404: File not found."]
                return text 
        try:
            text = f.readlines()
            f.close()
        except:
            text = ["Error while reading file."]
            
        return text 
    

back = "<a href='/'><button>Back</button></a>"
bg = "<script>document.bgColor = 'orange'</script>"
default = "<font size='5'><center><a href='/'>Home</a><br><br></center></font>" + bg
Users = ast.literal_eval(" \n".join(Open_File("Users.txt")))


def JSON(j):
    return json.dumps(j)

def encrypt(string):
    dk = hashlib.pbkdf2_hmac('sha256', bytearray(string, "utf-8"), b'salt', 100000)
    return str(binascii.hexlify(dk))

def centre(text):
    return "<center>" + text + "</center>"


@route('/')
def home():
    return default + "\n".join(Open_File("Home.html"))

@route('/serverside/newuser', method="POST")
def newUser():
    data = request.json
    try:
        username = data["Name"]
        password = data["Password"]
        confirmPass = data["ConfirmPassword"]
    except:
        return "Error: Missing args."
    
    if confirmPass == password:
        if not username in Users:
            Users[username] = encrypt(password)
            Open_File("Users.txt",True,str(Users))
            os.makedirs("Assets/Users/" + username)
            Open_File("Assets/Users/" + username + "/Projects.txt",True,str([]))
            Open_File("Assets/Users/" + username + "/Logo.txt",True,"/home/ItchIcon.png")
            return "Ok"
        else:
            return "Error: User already exists."
    else:
        return "Error: Password and confirm password do not match."
    

@route('/serverside/login', method="POST")
def login():
    data = request.json
    if "Name" in data and "Password" in data:
        encrypted = encrypt(data["Password"])
        if data["Name"] in Users:
            if encrypted == Users[data["Name"]]:
                return " \n".join(["Ok",encrypted])
            else:
                return "Error: Password is incorrect."
        else:
            return "Error: Username is unknown."
    else:
        return "Error: Missing args."


@route('/serverside/users/listofprojects', method="POST")
def listOfProjects():
    data = request.json
    if "Name" in data:
        if data["Name"] in ast.literal_eval(str(Users)):
            return JSON(ast.literal_eval(" \n".join(Open_File("Assets/Users/" + data["Name"] + "/Projects.txt"))))
        else:
            return "Error: Unknown user."
    else:
        return "Error: Missing args."


@route('/serverside/newproject', method="POST")
def newProject():
    data = request.json
    if "Name" in data and "Pass" in data and "ProjectName" in data:
        if data["Name"] in Users:
            if data["Pass"] == Users[data["Name"]]:
                if not data["ProjectName"] in ast.literal_eval(" \n".join(Open_File("Assets/Users/" + data["Name"] + "/Projects.txt"))):
                    projectCount = int(Open_File("ProjectCount.txt")[0])
                    Open_File("ProjectCount.txt",True,str(projectCount + 1))
                    Open_File("Assets/Projects/" + str(projectCount + 1) + ".json",True,str([{},{"Owner":data["Name"],"ProjectName":data["ProjectName"]}]))
                    myProjects = ast.literal_eval(" \n".join(Open_File("Assets/Users/" + data["Name"] + "/Projects.txt")))
                    myProjects.append({
                        "id": projectCount + 1,
                        "name": data["ProjectName"],
                        "shared": "not shared"
                    })
                    Open_File("Assets/Users/" + data["Name"] + "/Projects.txt",True,str(myProjects))
                    return str(JSON(["Ok",projectCount + 1]))
                else:
                    return str(JSON(["Choose another name, you've already got a project called that."]))
            else:
                return str(JSON(["Error: Your password is incorrect, try logging out and back in again."]))
        else:
            return str(JSON(["Error: Unknown user, try logging out and back in again."]))
    else:
        return str(JSON(["Error: Missing args."]))
    

@route('/serverside/saveproject', method="POST")
def saveProject():
    data = request.json
    if "Name" in data and "Pass" in data and "ProjectId" in data and "ProjectData" in data:
        if data["Name"] in Users:
            projectInfo = ast.literal_eval(" \n".join(Open_File("Assets/Projects/" + data["ProjectId"] + ".json")))[1]
            if data["Name"] == projectInfo["Owner"]:
                if data["Pass"] == Users[projectInfo["Owner"]]:
                    Open_File("Assets/Projects/" + data["ProjectId"] + ".json", True, str([data["ProjectData"],{"Owner":projectInfo["Owner"]}]))
                    return str(JSON(["Ok"]))
                else:
                    return str(JSON(["Error: Your password is incorrect, try logging out and back in again."]))
            else:
                return str(JSON(["Error: You aren't logged in as the owner. " + "(" + projectInfo["Owner"] + ")"]))
        else:
            return str(JSON(["Error: Unknown user, try logging out and back in again."]))
    else:
        return str(JSON(["Error: Missing args."]))
            


@route('/home/<path:path>')
def defaultFind(path):
    global Path
    Path = path
    lookPath = urllib.parse.unquote(path)
    if len(lookPath.split("/")[-1].split(".")) == 1:
        open("Assets/" + lookPath + ".html")
        return default + " \n".join(Open_File("Assets/" + lookPath + ".html"))
    else:
        if lookPath.split("/")[-1].split(".")[1] == "json":
            file = " \n".join(Open_File("Assets/" + lookPath))
            if file != "404: File not found.":
                return JSON(ast.literal_eval(file))
            else:
                return file
        else:
            return Open_File("Assets/" + lookPath,False,"",True)
    

            


ip = socket.gethostbyname(socket.gethostname())
run(host=ip, port=8000, debug=False)


        
