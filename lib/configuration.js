module.exports = {
	get_json: get_json,
	vserverhosts: vserverhosts,
	add_vserver_host: add_vserver_host,
	save: save,
	load: load,
}

var fs = require('fs');

var vserverhosts = [];

function add_vserver_host(ip, port) {
	vserverhosts.push({
		'ip': ip,
		'port': port
	});

	config_object.vserverhosts = vserverhosts;
}

function get_json() {
	console.log(config);
	return JSON.stringify(config) + '';
}

function save() {
	var config_string = JSON.stringify(config, null, 2);
	config_file = install_path + '/config.json';
	fs.open(config_file, 'w', function(err, fd){
		if (err !== null) console.log(err);
		fs.write(fd, config_string);
		fs.close(fd);
		return true;
	}); //TODO rechten
	return true;
}

function load() {
	var loadedconf = require(install_path + '/config.json');
	return loadedconf;
}