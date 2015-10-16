module.exports = {
	add: add,
}



var config_file = require("./configuration.js");

function add(ip, port) {
	if (isInt(port) && port > 0 && port <= 65535) {
		config_file.add_vserver_host(ip, port);
		console.log('added ip: '+ ip + ':' + port);
		return true;
	} else {
		return false;
	}
}

function isInt(value) {
    var er = /^-?[0-9]+$/;
    return er.test(value);
}