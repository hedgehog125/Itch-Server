document.write('<p id="FileUpload"></p>')
MouseX = 0
MouseY = 0
click = 0
keysPressed = {}
Width = 300
Height = 150
lastKey = ""
sounds = []
usedSounds = {}


if (! ogg) {
	console.warn("Your browser has no support for ogg files, falling back to mp3s...")
}


function asciiToUTF(ascii) {
	return String.fromCharCode(ascii).toLowerCase()
}

function range(start, stop, step) {
	// From https://stackoverflow.com/questions/8273047/javascript-function-similar-to-python-range
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start
        start = 0
    }

    if (typeof step == 'undefined') {
        step = 1
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return []
    }

    var result = []
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i)
    }

    return result
}


function mouse(e) {
	MouseX = (event.offsetX/canvas.width)*Width
	MouseY = (event.offsetY/canvas.height)*Height
}

function playSound(src) {
	var i = 0
	var newSounds = []
	for (i in sounds) {
		if (! sounds[i].ended) {
			newSounds[newSounds.length] = sounds[i]
		}
	}
	if (usedSounds[src] === undefined) {
		sounds = newSounds
		sounds[sounds.length] = new Audio()
		if (ogg) {
			sounds[sounds.length-1].src = "Sounds/" + src + ".ogg"
		}
		else {
			sounds[sounds.length-1].src = "Sounds/" + src + ".mp3"
		}
		usedSounds[src] = sounds[sounds.length-1]
	}
	else { // Use cache.
		sounds[sounds.length] = usedSounds[src]
		sounds[sounds.length-1].currentTime = 0
	}
	sounds[sounds.length-1].play()
}

function mouseDown(e) {
    if (e.which == 1) {
        click = 1
    } 
    else { 
    	if (e.which == 3)  {
        	click = 2
    	} 
    	else {
        	click = 3
    	}
    }
}

function scaleX(x) {
	return (x/Width)*canvas.width
}

function scaleY(y) {
	return (y/Height)*canvas.height
}

function mouseUp(e) {
	click = 0
}

function keyUp(key) {
	keysPressed[key.keyCode] = false
	lastKey = ""
}

function keyDown(key) {
	keysPressed[key.keyCode] = true
	lastKey = key.keyCode
}

function post(url, data, code) {
	// From https://stackoverflow.com/questions/9713058/send-post-data-using-xmlhttprequest and https://stackoverflow.com/questions/18962799/javascript-http-post-with-json-data
    http = new XMLHttpRequest()
	var params = JSON.stringify(data)
	http.open("POST", url, true)

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/json")
	
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			code()
		}
	}
	http.send(params)
}

function get(url, func) {
	// From https://stackoverflow.com/questions/9713058/send-post-data-using-xmlhttprequest and https://stackoverflow.com/questions/18962799/javascript-http-post-with-json-data
    http = new XMLHttpRequest()
	http.open("GET", url, true)
	code = func
	http.onreadystatechange = function() { 
		if (http.readyState == 4) {
			code()
		}
	}
	http.send()
}

try {
	a = UsingCanvas
}
catch(err) {
	UsingCanvas = true
}
a = undefined

if (UsingCanvas) {
	ctx.lineCap = "round"
	ctx.imageSmoothingEnabled = "high"
	canvas.oncontextmenu = function() {
     return false
	} 
	
	CanvasController = {}
	CanvasController.drawImage = function(img,x,y,width,height) {
		ctx.drawImage(img,(x/Width)*canvas.width,(y/Height)*canvas.height,(width/Width)*canvas.width,(height/Height)*canvas.height)
	}
	
	CanvasController.fillRect = function(x,y,width,height) {
		ctx.fillRect((x/Width)*canvas.width,(y/Height)*canvas.height,(width/Width)*canvas.width,(height/Height)*canvas.height)
	}
	
	CanvasController.rect = function(x,y,width,height) {
		ctx.rect((x/Width)*canvas.width,(y/Height)*canvas.height,(width/Width)*canvas.width,(height/Height)*canvas.height)
		ctx.stroke()
	}
	
	CanvasController.line = function(x,y,x1,y1) {
		ctx.beginPath()
		ctx.moveTo((x/Width)*canvas.width,(y/Height)*canvas.height)
		ctx.lineTo((x1/Width)*canvas.width,(y1/Height)*canvas.height)
		ctx.stroke()
	}
	
	
	CanvasController.setStrokeWidth = function(width) {
		ctx.lineWidth = width
	}
	
	CanvasController.setFillColour = function(colour) {
		ctx.fillStyle = colour
	}
	
	CanvasController.setOutlineColour = function(colour) {
		ctx.strokeStyle = colour
	}
	
	CanvasController.setLineCap = function(cap) {
		ctx.lineCap = cap
	}
	
	CanvasController.beginPath = function() {
		ctx.beginPath()
	}
	
	CanvasController.moveTo = function(x,y) {
		ctx.moveTo(scaleX(x),scaleY(y))
	}
	
	CanvasController.lineTo = function(x,y) { 
		ctx.lineTo(scaleX(x),scaleY(y))
	}
	
	CanvasController.fill = function() { 
		ctx.fill()
	}
	
	CanvasController.measureTextWidth = function(text,size) {
		Size = (size/((Width + Height)/2)) * ((canvas.width + canvas.height)/2)
		ctx.font = Size + "px Gloria"
		return ctx.measureText(text).width/canvas.width*Width
	}
	
	CanvasController.setTextCentre = function(align) {
		ctx.textAlign = align
	}
	
	CanvasController.setTextYCentre = function(align) {
		ctx.textBaseline = align
	}
	
	CanvasController.text = function(text,x,y,size) {
		Size = (size/((Width + Height)/2)) * ((canvas.width + canvas.height)/2)
		ctx.font = Size + "px Gloria"
		ctx.fillStyle = "black"
		ctx.fillText(text,(x/Width)*canvas.width,(y/Height)*canvas.height)
	} 
	
}

function save(data,filename) {
	// based off https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
    var textToSave = data
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"})
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob)
    var fileNameToSaveAs = filename
 
    var downloadLink = document.createElement("a")
    downloadLink.download = fileNameToSaveAs
    downloadLink.innerHTML = "Download File"
    downloadLink.href = textToSaveAsURL
    downloadLink.onclick = destroyClickedElement
    downloadLink.style.display = "none"
    document.body.appendChild(downloadLink)
 
    downloadLink.click()
}
 
function destroyClickedElement(event) {
    document.body.removeChild(event.target)
}

function fileUpload(code,multiple) {
    // Based off https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas.
    if (multiple) {
    	document.getElementById("FileUpload").innerHTML = '<input multiple type="file" id="imageLoader" name="imageLoader" style="visibility:hidden" />'
    }
    else {
    	document.getElementById("FileUpload").innerHTML = '<input type="file" id="imageLoader" name="imageLoader" style="visibility:hidden" />'
    }
    uploadCode = code
    file = 0

    imageLoader = document.getElementById('imageLoader')

    handleImage = function(e) {
        uploadReader = new FileReader()
        uploadReader.onload = function(event) {
        	src = event.target.result
        	uploadCode()
            imageLoader = undefined
            document.getElementById("FileUpload").innerHTML = ""
            handleImage = undefined
            file++
            if (e.target.files[file] != undefined) {
            	uploadReader.readAsDataURL(e.target.files[file])
            }
        }
        uploadReader.readAsDataURL(e.target.files[0])
    }

    imageLoader.addEventListener('change', handleImage, false)
    document.getElementById("imageLoader").click()
}

function cancelUpload() {
    uploadCode = ""
    imageLoader = undefined
    document.getElementById("FileUpload").innerHTML = ""
    uploadImg = undefined
}



document.addEventListener("keyup", keyUp, false)
document.addEventListener("keydown", keyDown, false)
if (UsingCanvas) {
	canvas.addEventListener("mousemove", mouse, false)
}
document.addEventListener("mousedown", mouseDown, false)
document.addEventListener("mouseup", mouseUp, false)
