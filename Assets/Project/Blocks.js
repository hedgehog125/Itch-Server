Blocks = {
	"Move": {
		"cat": "Motion",
		"type": "Block",
		 "text": [
		 	["text","Move"],
		 	["arg","number","Steps","10"],
		 	["text","steps"]
		 ]
	},
	"Turn": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text","Turn"],
			["arg","number","Deg","15"],
			["text","degrees"]
		]
	},
	"Point": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text","Point"],
			["arg","number","Deg","0"],
			["text","degrees"]
		]
	},
	"PointTo": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text","Point towards"],
			["arg","text","Sprite","sprite1"]
		]
	},
	"PointToXY": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text", "Point to XY"],
			["arg","number","X","0"],
			["arg","number","Y","0"]
		]
	},
	"Goto": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text", "Go to XY"],
			["arg","number","X","0"],
			["arg","number","Y","0"]
		]
	},
	"GotoSprite": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text", "Go to"],
			["arg","text","Sprite","sprite1"]
		]
	},
	"GlideToXY": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text", "Glide"],
			["arg","number","Secs","1"],
			["text", "secs to XY"],
			["arg","number","X","0"],
			["arg","number","Y","0"]
		]
	},
	"GetX": {
		"cat": "Motion",
		"type": "Reporter",
		"text": [
			["text", "X"]
		]
	},
	"GetY": {
		"cat": "Motion",
		"type": "Reporter",
		"text": [
			["text", "Y"]
		]
	},
	"GetDir": {
		"cat": "Motion",
		"type": "Reporter",
		"text": [
			["text", "Dir"]
		]
	},
	
	
	"SayFor": {
		"cat": "Looks",
		"type": "Block",
		"text": [
			["text","Say"],
			["arg","text","Text to say","Hello!"],
			["text","for"],
			["arg","number","Secs","2"],
			["text","secs"]
		]
	},
	"Say": {
		"cat": "Looks",
		"type": "Block",
		"text": [
			["text","Say"],
			["arg","text","Text to say","Hello!"]
		]
	},
	"ThinkFor": {
		"cat": "Looks",
		"type": "Block",
		"text": [
			["text","Think"],
			["arg","text","Text to think","Hmm..."],
			["text","for"],
			["arg","number","Secs","2"],
			["text","secs"]
		]
	},
	"Think": {
		"cat": "Looks",
		"type": "Block",
		"text": [
			["text","Think"],
			["arg","text","Text to think","Hmm..."]
		]
	},
	"Show": {
		"cat": "Looks",
		"type": "Block",
		"text": [
			["text","Show"]
		]
	},
	"Hide": {
		"cat": "Looks",
		"type": "Block",
		"text": [
			["text","Hide"]
		]
	},
	"SetCos": {
		"cat": "Looks",
		"type": "Block",
		"text": [
			["text","Set costume to"],
			["arg","number","CosId","1"]
		]
	},
	"SetSize": {
		"cat": "Looks",
		"type": "Block",
		"text": [
			["text","Set size to"],
			["arg","number","Size","100"],
			["text","%"]
		]
	},
	"Cos": {
		"cat": "Looks",
		"type": "Reporter",
		"text": [
			["text", "Costume"]
		]
	},
	"Size": {
		"cat": "Looks",
		"type": "Reporter",
		"text": [
			["text", "Size"]
		]
	},
	
	
	"PlaySound": {
		"cat": "Sound",
		"type": "Block",
		"text": [
			["text", "Play Sound"],
			["arg","text","SoundName","Meow"]
		]
	},
	"PlaySoundAndWait": {
		"cat": "Sound",
		"type": "Block",
		"text": [
			["text", "Play Sound"],
			["arg","text","SoundName","Meow"],
			["text","and wait"]
		]
	},
	"SetVol": {
		"cat": "Sound",
		"type": "Block",
		"text": [
			["text", "Set volume"],
			["arg","number","Volume","100"],
			["text", "%"]
		]
	},
	"ChangeVol": {
		"cat": "Sound",
		"type": "Block",
		"text": [
			["text", "Change volume by"],
			["arg","number","ChangePercent","-10"],
			["text", "%"]
		]
	},
	"GetVol": {
		"cat": "Sound",
		"type": "Reporter",
		"text": [
			["text", "Volume"]
		]
	},
	
	
	"ClearPen": {
		"cat": "Pen",
		"type": "Block",
		"text": [
			["text", "Clear"]
		]
	},
	"StartPolyLine": {
		"cat": "Pen",
		"type": "Block",
		"text": [
			["text", "Start polyline"]
		]
	},
	"DrawPolyLine": {
		"cat": "Pen",
		"type": "Block",
		"text": [
			["text", "Draw polyline"]
		]
	},
	"FillPolyLine": {
		"cat": "Pen",
		"type": "Block",
		"text": [
			["text", "Fill polyline"]
		]
	},
	"AddPolyLinePoint": {
		"cat": "Pen",
		"type": "Block",
		"text": [
			["text", "Add point to polyline XY"],
			["arg","number","X","0"],
			["arg","number","Y","0"]
		]
	},
	"SetColour": {
		"cat": "Pen",
		"type": "Block",
		"text": [
			["text", "Set colour"],
			["arg","text","Colour","Black"]
		]
	},
	"SetWidth": {
		"cat": "Pen",
		"type": "Block",
		"text": [
			["text", "Set width"],
			["arg","number","Width","5"]
		]
	},
	"GetPenColour": {
		"cat": "Pen",
		"type": "Reporter",
		"text": [
			["text", "Colour"]
		]
	},
	"GetPenWidth": {
		"cat": "Pen",
		"type": "Reporter",
		"text": [
			["text", "Width"]
		]
	},
	
	
	"SetVar": {
		"cat": "Data",
		"type": "Block",
		"text": [
			["text", "Set var"],
			["arg","text","Variable","var"],
			["text", "to"],
			["arg","text","Value","Hello world!"]
		]
	},
	"SetVarType": {
		"cat": "Data",
		"type": "Block",
		"text": [
			["text", "Set type of"],
			["arg","text","Variable","list"],
			["text", "to"],
			["arg","text","Type","Array"]
		]
	},
	"AddItem": {
		"cat": "Data",
		"type": "Block",
		"text": [
			["text", "Add"],
			["arg","text","String","thing"],
			["text", "to array"],
			["arg","text","Array","array"]
		]
	},
	"GetItemOfVar": {
		"cat": "Data",
		"type": "Reporter",
		"text": [
			["text", "Get value"],
			["arg","text","Value","0"],
			["text", "of"],
			["arg","text","Variable","var"]
		]
	},
	"GetVar": {
		"cat": "Data",
		"type": "Reporter",
		"text": [
			["text", "Value of"],
			["arg","text","Variable","var"]
		]
	},
	"GetVarType": {
		"cat": "Data",
		"type": "Reporter",
		"text": [
			["text", "Get type of"],
			["arg","text","Variable","var"]
		]
	},
	"VarExists": {
		"cat": "Data",
		"type": "Reporter",
		"text": [
			["text", "Var exists"],
			["arg","text","Variable","var"]
		]
	},
	
	
	"WhenGF": {
		"cat": "Events",
		"type": "Header",
		"text": [
			["text", "When GF clicked"]
		]
	},
	"When": {
		"cat": "Events",
		"type": "Header",
		"text": [
			["text", "When"],
			["arg","text","Condition","false"]
		]
	}
}

colours = {
	"Motion": "#0070FF",
	"Looks": "#6670CC",
	"Sound": "#FF70FF",
	"Pen": "#00C033",
	"Data": "#FF7000",
	"Events": "#FFB000"
}
