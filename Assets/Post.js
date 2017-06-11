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

function get(url,func) {
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