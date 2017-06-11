Blocks = {
	"Move": {
		"cat": "Motion",
		"type": "Block",
		 "text": [
		 	["text","Move"],
		 	["arg","number","steps","10"],
		 	["text","steps"]
		 ]
	},
	"Turn": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text","Turn"],
			["arg","number","deg","15"],
			["text","degrees"]
		]
	},
	"Point": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text","Point"],
			["arg","number","deg","0"],
			["text","degrees"]
		]
	},
	"PointTo": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text","Point towards"],
			["arg","text","sprite","sprite1"]
		]
	},
	"PointToXY": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text", "Point to XY"],
			["arg","text","sprite","sprite1"]
		]
	},
	"Goto": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text", "Go to XY"],
			["arg","number","x","0"],
			["arg","number","y","0"]
		]
	},
	"GotoSprite": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text", "Go to"],
			["arg","text","sprite","sprite1"]
		]
	},
	"GlideToXY": {
		"cat": "Motion",
		"type": "Block",
		"text": [
			["text", "Glide"],
			["arg","number","secs","1"],
			["text", "secs to XY"],
			["arg","number","x","0"],
			["arg","number","y","0"]
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
			["arg","text","text to say","Hello!"],
			["text","for"],
			["arg","number","secs","2"],
			["text","secs"]
		]
	},
	"Say": {
		"cat": "Looks",
		"type": "Block",
		"text": [
			["text","Say"],
			["arg","text","text to say","Hello!"]
		]
	},
	"ThinkFor": {
		"cat": "Looks",
		"type": "Block",
		"text": [
			["text","Think"],
			["arg","text","text to think","Hmm..."],
			["text","for"],
			["arg","number","secs","2"],
			["text","secs"]
		]
	},
	"Think": {
		"cat": "Looks",
		"type": "Block",
		"text": [
			["text","Think"],
			["arg","text","text to think","Hmm..."]
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
			["arg","number","cosId","1"]
		]
	},
	"SetSize": {
		"cat": "Looks",
		"type": "Block",
		"text": [
			["text","Set size to"],
			["arg","number","size","100"],
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
	
	
}
