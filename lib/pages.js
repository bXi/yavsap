module.exports = {
	configuration: configuration,

}


function configuration(res) {
	var headers = {};
	headers["Content-Type"] = 'text/json';
	response = config_file.get_json();
	res.writeHead(200, headers);
	res.write(response, "binary");
	res.end();
}