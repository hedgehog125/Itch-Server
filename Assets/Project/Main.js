// TODO:
//	+ Allow reporter blocks to go in inputs. <- Done.
//	+ More blocks/categories.
//	+ Be able to make sprites.
//	+ Project compilation.  <- Not sure how I will do this yet.
//	+ Be able to import costumes.
//	+ Be able to import sounds.
//	+ Text box.
//	+ Console.
//	+ Text version.




// Use CanvasController not ctx!

// Sort blocks by category

var i = 0
var Categories = {}
for (i in range(Object.keys(Blocks).length)) {
	var c = Object.keys(Blocks)[i]
	if (Categories[Blocks[Object.keys(Blocks)[i]]["cat"]] == undefined) {
		Categories[Blocks[Object.keys(Blocks)[i]]["cat"]] = []
	}
	Categories[Blocks[Object.keys(Blocks)[i]]["cat"]][Categories[Blocks[Object.keys(Blocks)[i]]["cat"]].length] = Object.keys(Blocks)[i]
}

var Loading = true
try {
	a = loading
}
catch(err) {
	Loading = false
}

var online = true
try {
	a = onlineMode
}
catch(err) {
	online = false
}




var defaultImg = new Image()
defaultImgSrc = "data:image/png;base64,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"
defaultImg.src = defaultImgSrc
colours = {
	"Motion": "#0010FF",
	"Looks": "#6600CC"
}

SelectedSprite = "Stage"
SelectedArg = -1
SelectedBlock = -1
Category = "Motion"


clickCooldown = false
keyCooldown = false
lastSave = ""
imgs = {}
imgs[defaultImgSrc] = defaultImg

defaultProject = {
	"Stage": {
		"Imgs": {
			"Selected": 0,
			"IMGs": [
				{
					"Name":"Background1",
					"IMG":defaultImgSrc
				}
			]
		},
		"Sounds": [],
		"Scripts": [],
	},
	"Sprites": []
}

Project = defaultProject




function save() {
	post("/serverside/saveproject",{
	"Name": User,
	"Pass": getCookie("Pass"),
	"ProjectId": id,
	"ProjectData": Project,
	},function() {
		if (http.responseText != "") {
			var res = JSON.parse(http.responseText)
			if (res[0] != "Ok") {
				alert(res[0])
			}
			else {
				console.log("Project saved successfully!")
				lastSave = JSON.stringify(Project)
			}
		}
	})
}



window.onbeforeunload = function(e) {
	if (lastSave != JSON.stringify(Project)) {
			// From https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
			var dialogText = "You have unsaved changes."
			e.returnValue = dialogText
			return dialogText
	}
}


function checkSave() {
	if (online) {
		if (! Loading) {
			if (lastSave != JSON.stringify(Project)) {
				save()
			}
		}
	}
}




function main() {
	if (click == 0) {
		clickCooldown = false
	}
	if (lastKey == "") {
		keyCooldown = false
	}
	background()
	stageIcon()
	spriteIcons()
	blockChooser()
	scripts()
}

function checkInput(type,arg) {
	if (type == "number") {
		var i = 0
		var numbers = ["0","1","2","3","4","5","6","7","8","9"]
		for (i in arg) {
			if (numbers.indexOf(arg[i]) == -1) {
				return false
			}
		}
	}
	return true
}

function triangle(x,y,dir) {
	CanvasController.beginPath()
	CanvasController.moveTo(x, y)
    CanvasController.lineTo(x + (3*dir), y - 3)
    CanvasController.lineTo(x + (3*dir), y + 3)
    CanvasController.fill()
    if (dir > 0) {
   		if (MouseX >= x & MouseX <= x + (3 * Math.abs(dir))) {
    		if (MouseY >= y - 3 & MouseY <= y + 3) {
    			return true
    		}
    	}
    }
    else {
    	if (MouseX >= x - (3 * Math.abs(dir)) & MouseX <= x) {
    		if (MouseY >= y - 3 & MouseY <= y + 3) {
    			return true
    		}
    	}
    }
    return false
}

function block(id,x,y,args, outline) {
	CanvasController.setTextCentre("start")
	CanvasController.setTextYCentre("middle")
	var i = 0
	var X = x
	var arg = 0
	var item = 0
	var Return = []
	for (i in Blocks[id]["text"]) {
		CanvasController.setFillColour(colours[Blocks[id]["cat"]])
		CanvasController.setOutlineColour(colours[Blocks[id]["cat"]])
		if (Blocks[id]["text"][i][0] == "text") {
			var text = Blocks[id]["text"][i][1]
			var width = CanvasController.measureTextWidth(text,5)
			if (Blocks[id]["type"] == "Block") {
				if (outline) {
					CanvasController.setFillColour("white")
					if (i == 0) {
						CanvasController.fillRect(X, y, width + 4, 5)	
					}
					if (i == (Blocks[id]["text"].length - 1)) {
						CanvasController.fillRect(X + 1, y, width + 4, 5)
					}
					else {
						CanvasController.fillRect(X + 1, y, width + 5, 5)
					}
				}
				CanvasController.setFillColour(colours[Blocks[id]["cat"]])
				CanvasController.fillRect(X, y, width + 4, 5)
			}
			else {
				if (outline) {
					CanvasController.setFillColour("white")
					if (i == 0) {
						CanvasController.fillRect(X, y, width + 4, 5)	
					}
					if (i == (Blocks[id]["text"].length - 1)) {
						CanvasController.fillRect(X + 1, y, width + 4, 5)
					}
					else {
						CanvasController.fillRect(X + 1, y, width + 4, 5)
					}
				}
				CanvasController.setFillColour(colours[Blocks[id]["cat"]])
				CanvasController.setOutlineColour(colours[Blocks[id]["cat"]])
				CanvasController.setLineCap("round")
				CanvasController.setStrokeWidth(25)
				CanvasController.line(X + 4, y + 2.5, X + width, y + 2.5)
			}
			CanvasController.setFillColour("black")
			CanvasController.text(text, X + 2.5, y + 2.5, 5)
			X = X + width + 4
		}
		else {
			CanvasController.setOutlineColour("white")
			CanvasController.setStrokeWidth(15)
			var text = args[arg]
			if (Blocks[id]["text"][item][1] == "number") {
				CanvasController.setLineCap("round")
			}
			else {
				if (Blocks[id]["text"][item][1] == "text") {
					CanvasController.setLineCap("square")
				}
			}
			if (args[arg] === undefined) {
				var text = Blocks[id]["text"][item][3]
				var type = "Input"
			}
			else {
				var text = args[arg]["Input"]
				var type = args[arg]["Type"]
			}
			if (type == "Input") {
				var width = CanvasController.measureTextWidth(text,4)
			}
			if (Blocks[id]["type"] == "Block") {
				CanvasController.fillRect(X,y,width + 10,5)
			}
			else {
				if (type == "Input") {
					CanvasController.setOutlineColour(colours[Blocks[id]["cat"]])
					CanvasController.setLineCap("round")
					CanvasController.setStrokeWidth(25)
					CanvasController.line(X + 5, y + 2.5, X + width + 5, y + 2.5)
				}
			}
			CanvasController.setOutlineColour("white")
			if (type == "Input") {
				CanvasController.line(X + 2.5, y + 2.5, X + width + 2.5, y + 2.5)
			}
			else {
				var width = block(text["id"], X, y, text["args"], true)[1]
				X = X - 7
			}
			if (MouseX >= X + 2.5 & MouseX <= X + width + 2.5) {
				if (MouseY >= y - 12.5 & MouseY <= y + 12.5) {
					Return[Return.length] = [arg,item]
				}
			}
			CanvasController.setFillColour("black")
			if (type == "Input") {
				CanvasController.text(text, X + 2.5, y + 2.5, 4)
			}
			X = X + 7 + width
			arg++
		}
		item++
	}

	if (MouseX >= x & MouseX <= X) {
		if (MouseY >= y & MouseY <= y + 5) {
			Return[Return.length] = "touching"
		}
	}
	CanvasController.setLineCap("round")
	return [Return, X-x]
}


function blockChooser() {
	var i = 0
	var y = 15
	CanvasController.line(100,10,150,10)
	if (triangle(101,5,1)) {
		if (click == 1 & (! clickCooldown)) {
			var selected = Object.keys(Categories).indexOf(Category)
			selected++
			if (selected > Object.keys(Categories).length - 1) {
				selected = 0
			}
			Category = Object.keys(Categories)[selected]
			clickCooldown = true

		}
	}
	if (triangle(149,5,-1)) {
		if (click == 1 & (! clickCooldown)) {
			var selected = Object.keys(Categories).indexOf(Category)
			selected--
			if (selected < 0) {
				selected = Object.keys(Categories).length - 1
			}
			Category = Object.keys(Categories)[selected]
			clickCooldown = true
		}
	}
	CanvasController.setTextCentre("center")
	CanvasController.setTextYCentre("middle")
	CanvasController.text(Category,125,5,7)
	CanvasController.setTextCentre("start")
	for (i in Categories[Category]) {
		var c = Categories[Category][i]
		var returned = block(c,101,y,[])
		if (returned[0][returned[0].length-1] == "touching" & click == 1 & ! clickCooldown) {
			if (SelectedSprite == "Stage") {
				var spriteScripts = Project["Stage"]["Scripts"]
			}
			var args = []
			var a = 0
			for (a in Blocks[c]["text"]) {
				if (Blocks[c]["text"][a][0] == "arg") {
					args[args.length] = {"Type":"Input","Input":Blocks[c]["text"][a][3]}
				}
			}
			spriteScripts[spriteScripts.length] = {
				"x": 155,
				"y": 10,
				"id": c,
				"args": args,
				"width": 0,
				"snappedTo": -1,
				"snappedWith": -1
			}
			if (SelectedSprite == "Stage") {
				Project["Stage"]["Scripts"] = spriteScripts
			}
			clickCooldown = true
		}
		y = y + 8
	}
	CanvasController.setFillColour("rgb(150,150,150)")
	CanvasController.fillRect(150.3,0,Width,Height)
	CanvasController.setStrokeWidth(2)
	CanvasController.setOutlineColour("black")
	CanvasController.line(150,0,150,150)
}

function tidy(list) {
	var i = 0
	var newList = []
	for (i in list) {
		if (list[i] !== undefined) {
			newList[newList.length] = list[i]
		}
	}
	return newList
}

function scripts() {
	if (SelectedSprite == "Stage") {
		var spriteScripts = Project["Stage"]["Scripts"]
	}
	var i = 0
	for (i in spriteScripts) {
		var c = spriteScripts[i]
		if (c !== undefined) {
			if (SelectedBlock == i) {
				if (SelectedArg == -1) {
					c["x"] = MouseX - (c["width"] / 2)
					c["y"] = MouseY - 2.5
				}
				else {
					if (lastKey != "" & ! keyCooldown) {
						var input = c["args"][SelectedArg]["Input"]
						if (lastKey == 13) {
							SelectedBlock = -1
							SelectedArg = -1
							keyCooldown = true
						}
					}
				}
			}
			if (SelectedBlock == -1 & c["x"] < 140) {
				spriteScripts[i] = undefined
			}
		}
		else {
			spriteScripts = tidy(spriteScripts)
		}
		if (spriteScripts[SelectedBlock] !== undefined) {
			if (c["snappedWith"] != -1) {
				if (spriteScripts[c["snappedWith"]]["snappedTo"] != c["snappedWith"]) {
					c["snappedWith"] = -1
				}
			}
			if (c["snappedTo"] != -1 & spriteScripts[c["snappedTo"]] !== undefined) {
				c["x"] = spriteScripts[c["snappedTo"]]["x"]
				c["y"] = spriteScripts[c["snappedTo"]]["y"] + 4.5
			}
		}
		if (c !== undefined) {
			returned = block(c["id"],c["x"],c["y"],c["args"])
			c["width"] = returned[1]
			if (returned[0].indexOf("touching") > -1) {
				if (returned[0].length > 1) {
					if (click == 1 & ! clickCooldown) {
						if (SelectedBlock == -1) {
							if (spriteScripts[i]["args"][returned[0][0][0]]["Type"] == "Input") {
								SelectedArg = JSON.parse(returned[0][0][0])
								SelectedBlock = JSON.parse(i)
								var before = c["args"][SelectedArg]["Input"]
								var typeofArg = Blocks[c["id"]]["text"][returned[0][0][1]][1]
								c["args"][SelectedArg]["Input"] = prompt("Enter " + typeofArg + "...", c["args"][SelectedArg]["Input"])
								if (c["args"][SelectedArg]["Input"] == null | c["args"][SelectedArg]["Input"] == "" | ! (checkInput(typeofArg, c["args"][SelectedArg]["Input"]))) {
									c["args"][SelectedArg]["Input"] = before
								}
								click = 0
								clickCooldown = true
								SelectedArg = -1
								SelectedBlock = -1
							}
							else {
								var input = spriteScripts[i]["args"][returned[0][0][0]]["Input"]
								spriteScripts[spriteScripts.length] = {
									"x": 0,
									"y": 0,
									"id": input["id"],
									"args": input["args"],
									"width": 0,
									"snappedTo": -1,
									"snappedWith": -1
								}
								clickCooldown = true
								SelectedArg = returned[0][0][0]
								SelectedBlock = spriteScripts.length - 1
								var a = 0
								var numOfArgs = -1
								var defaultArg = 0
								for (a in Blocks[spriteScripts[i]["id"]]["text"]) {
									var b = Blocks[spriteScripts[i]["id"]]["text"][a]
									if (b[0] == "arg") {
										numOfArgs++
										if (numOfArgs == SelectedArg) {
											defaultArg = Blocks[spriteScripts[i]["id"]]["text"][a][3]
										}
									}
								}
								spriteScripts[i]["args"][returned[0][0][0]]["Input"] = defaultArg
								spriteScripts[i]["args"][returned[0][0][0]]["Type"] = "Input"
								SelectedArg = -1
							}
						}
						else {
							if (i != SelectedBlock) {
								SelectedArg = JSON.parse(returned[0][0][0])
								c["args"][SelectedArg]["Type"] = "Block"
								c["args"][SelectedArg]["Input"] = {
									"args": spriteScripts[SelectedBlock]["args"],
									"id": spriteScripts[SelectedBlock]["id"]
								}
								clickCooldown = true
								spriteScripts[SelectedBlock] = undefined
								spriteScripts = tidy(spriteScripts)
								SelectedArg = -1
								SelectedBlock = -1
								playSound("Snap")
							}
						}
					}
				}
				else {
					if (click == 1 & (! clickCooldown) & SelectedBlock == -1) {
						SelectedBlock = JSON.parse(i)
						SelectedArg = -1
						if (c["snappedTo"] != -1) {
							spriteScripts[c["snappedTo"]]["snappedWith"] = -1
							c["snappedTo"] = -1
						}
						clickCooldown = true
					}
				}
			 }
		}
		
	}
	if (click == 1 & ! clickCooldown & SelectedBlock != -1 & SelectedArg == -1) {
		if (MouseX > 150) {
			spriteScripts[SelectedBlock]["x"] = MouseX - (spriteScripts[SelectedBlock]["width"] / 2)
			spriteScripts[SelectedBlock]["y"] = MouseY - 2.5
			spriteScripts[SelectedBlock]["snappedTo"] = -1
			var i = 0
			while (i < Object.keys(spriteScripts).length) {
				if (SelectedBlock != i & spriteScripts[i]["snappedWith"] == -1 & spriteScripts[i]["snappedTo"] != SelectedBlock) {
					if (spriteScripts[SelectedBlock]["x"] >= spriteScripts[i]["x"] - 2.5 & spriteScripts[SelectedBlock]["x"] <= spriteScripts[i]["x"] + spriteScripts[i]["width"] + 2.5) {
						if (spriteScripts[SelectedBlock]["y"] >= spriteScripts[i]["y"] + 0.5 & spriteScripts[SelectedBlock]["y"] <= spriteScripts[i]["y"] + 8) {
							spriteScripts[SelectedBlock]["snappedTo"] = i
							spriteScripts[i]["snappedWith"] = SelectedBlock
							playSound("Snap")
							spriteScripts[SelectedBlock]["x"] = spriteScripts[i]["x"]
							spriteScripts[SelectedBlock]["y"] = spriteScripts[i]["y"] + 4.5
						}
					}
				}
				i++
			}
			SelectedBlock = -1
			SelectedArg = -1
			clickCooldown = true
		}
		else {
			spriteScripts[SelectedBlock] = undefined
			var i = 0
			var newScripts = []
			for (i in spriteScripts) {
				if (spriteScripts[i] !== undefined) {
					newScripts[newScripts.length] = spriteScripts[i]
				}
			}
			spriteScripts = newScripts
			SelectedBlock = -1
			SelectedArg = -1
			clickCooldown = true
		}
	}
	if (SelectedSprite == "Stage") {
		Project["Stage"]["Scripts"]  = spriteScripts
	}
}

function shorten(string,maxChars) {
	if (string.length > maxChars) {
		var newString = ""
		var i = 0
		for (i in range(maxChars-3)) {
			newString[newString.length] = string[i]
		}
		var i = 0
		for (i in range(3)) {
			newString[newString.length] = "."
		}
		return newString
	}
	return string
}

function stageIcon() {
	CanvasController.setTextCentre("start")
	CanvasController.setTextYCentre("middle")
	CanvasController.text("Stage",2.5,88,3)
	var stageImgs = Project["Stage"]["Imgs"]
	CanvasController.drawImage(imgs[stageImgs["IMGs"][stageImgs["Selected"]]["IMG"]],1,78,10,8)
	if (SelectedSprite == "Stage") {
		CanvasController.rect(1,78,10,13)
		CanvasController.rect(1,78,10,8)
	}
}

function spriteIcons() {
	
}

function background() {
	CanvasController.setStrokeWidth(2)
	CanvasController.setOutlineColour("black")
	CanvasController.setFillColour("rgb(255,255,255)")
	CanvasController.fillRect(0,0,Width,Height)
	
	
	CanvasController.setFillColour("rgb(150,150,150)")
	CanvasController.fillRect(0,0,Width,Height)
	CanvasController.line(100,0,100,Height)
	CanvasController.line(0,75,100,75)
	var stageImgs = Project["Stage"]["Imgs"]
	CanvasController.drawImage(imgs[stageImgs["IMGs"][stageImgs["Selected"]]["IMG"]],0,0,100,75)
}

wait = setInterval(function() {
	if (Loading == false) {
		setInterval(checkSave, 5000)
		setInterval(main, 30)
		clearInterval(wait)
	}
}) 