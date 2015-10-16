module.exports = {
	manager: manager,
}

function manager() {
	http.createServer(function(req, res) {
		GLOBAL.resource = res;

		var uri = url.parse(req.url).pathname,
			filename = path.join(GLOBAL.install_path+'/www', uri);

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
			default: 
				break;
		}
		
	}).listen(parseInt(GLOBAL.config.node_port, 10)); //*/
	console.log("Yavsap running at http://" + GLOBAL.config.node_ip + ":" + GLOBAL.config.node_port);
}


function writeHeader(code) {
	res = GLOBAL.resource;
	res.writeHead(code, {
		"Content-Type": "text/plain"
	});
	res.write(code + ''); //has to be a string otherwise http module craps out
	res.end();
}