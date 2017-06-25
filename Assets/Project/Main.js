// TODO:
//	+ Allow reporter blocks to go in inputs. <- Done.
//  + Header blocks. <- Done.
//	+ More blocks/categories. <- Done.
//  * Fix reporter blocks with arguments. <- Done.
//	+ Be able to make sprites.
//  + The rest of the blocks.
//	+ Project compilation.  <- I think I know how I'll do this.
//	+ Be able to import costumes.
//	+ Be able to import sounds.
//	+ Script scrollbar.
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
defaultImg.src = defaultImgSrc

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
		var numbers = ["0","1","2","3","4","5","6","7","8","9","."]
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
			if (Blocks[id]["type"] == "Block" | Blocks[id]["type"] == "Header") {
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
				if (i != (Blocks[id]["text"].length - 1) | Blocks[id]["text"].length == 1) {
					CanvasController.line(X + 4, y + 2.5, X + width, y + 2.5)
				}
				else {
					CanvasController.line(X + 4, y + 2.5, X + width, y + 2.5)
				}
				if (i != (Blocks[id]["text"].length - 1)) {
					CanvasController.setLineCap("square")
					CanvasController.line((X + width) - 2, y + 2.5, X + width + 7, y + 2.5)
					CanvasController.setLineCap("round")
				}
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
			if (Blocks[id]["type"] == "Block" | Blocks[id]["type"] == "Header") {
				CanvasController.fillRect(X,y,width + 10,5)
			}
			else {
				if (type == "Input") {
					CanvasController.setOutlineColour(colours[Blocks[id]["cat"]])
					CanvasController.setLineCap("round")
					CanvasController.setStrokeWidth(25)
					if (i != (Blocks[id]["text"].length - 1) | Blocks[id]["text"].length == 1) {
						CanvasController.line(X + 5, y + 2.5, X + width + 5, y + 2.5)
					}
					else {
						CanvasController.line(X + 5, y + 2.5, X + width + 3.5, y + 2.5)
					}
					if (i != (Blocks[id]["text"].length - 1)) {
						CanvasController.setLineCap("square")
						CanvasController.line((X + width) + 2, y + 2.5, X + width + 5, y + 2.5)
						CanvasController.setLineCap("round")
					}
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
			X = X + 6 + width
			arg++
		}
		item++
	}

	if (Blocks[id]["type"] == "Header") {
		CanvasController.setFillColour(colours[Blocks[id]["cat"]])
		CanvasController.fillRect(x + 2, y - 3, ((X  - x) / 1.2), 4)
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
			selected--
			if (selected < 0) {
				selected = Object.keys(Categories).length - 1
			}
			Category = Object.keys(Categories)[selected]
			clickCooldown = true

		}
	}
	if (triangle(149,5,-1)) {
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
	CanvasController.setTextCentre("center")
	CanvasController.setTextYCentre("middle")
	CanvasController.text(Category,125,5,7)
	CanvasController.setTextCentre("start")
	for (i in Categories[Category]) {
		var c = Categories[Category][i]
		if (Blocks[c]["type"] == "Header") {
			y = y + 3
		}
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
				if (SelectedBlock != i) {
					if (spriteScripts[i]["snappedWith"] == -1 & spriteScripts[i]["snappedTo"] != SelectedBlock) {
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