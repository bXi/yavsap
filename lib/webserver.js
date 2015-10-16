module.exports = {
	webserver: webserver,
}


function webserver() {
	http.createServer(function(req, res) {
		GLOBAL.res = res;
		GLOBAL.POST = {};
		var uri = url.parse(req.url).pathname,
			filename = path.join(install_path+'/www', uri);

		var temp_url = req.url.substring(1);
		var url_segs = temp_url.split('/');

		switch(url_segs[0]) {
			case 'js':
				switch(url_segs[1]) {
					case 'config.json':
						pages.configuration(res); break;
					default:
						servePage(filename, req, res);
						break;
				}
				break;
			case 'node':
				switch(url_segs[1]) {
					case 'add':
						if (req.method == 'POST') {
							req.on('data', function(data) {
								data = data.toString();
								data = data.split('&');
								for (x = 0; x < data.length; x++) {
									var _data = data[x].split("=");
									POST[_data[0]] = _data[1];	
								}
								console.log(POST.ip);
								if (node.add(POST.ip, POST.port, POST)) {
									writeHeader(200);
								}
							});


						
							
						} else {
							writeHeader(412); //412 Precondition Failed
						}

						break;
					default:
						break;
				}
				break;
			case 'config':
				switch(url_segs[1]) {
					case 'save':
						if (config_file.save()) {
							writeHeader(200);
						}
						break;
					default:
						break;
				}
				break;
			default: 
				servePage(filename, req, res);
				break;
		}
		
	}).listen(parseInt(config.port, 10)); //*/
	console.log("Yavsap running at http://" + config.ip + ":" + config.port);
}

function servePage(filename, req, res) {
	var contentTypesByExtension = {
		".html": "text/html",
		".css": "text/css",
		".js": "text/javascript"
	};

	fs.exists(filename, function(exists) {
		console.log('existing file: ' + req.url);
		if (!exists) {
			writeHeader(404);
			return;
		}
		if (fs.statSync(filename).isDirectory()) filename += "/index.html";

		fs.readFile(filename, "binary", function(err, file) {
			if (err) {
				writeHeader(500);
				return;
			}

			var headers = {};
			var contentType = contentTypesByExtension[path.extname(filename)];
			if (contentType) headers["Content-Type"] = contentType;
			res.writeHead(200, headers);
			res.write(file, "binary");
			res.end();
		});
	});
}


function writeHeader(code) {
	res.writeHead(code, {
		"Content-Type": "text/plain"
	});
	res.write(code + ''); //has to be a string otherwise http module craps out
	res.end();
}