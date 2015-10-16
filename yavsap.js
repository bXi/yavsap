#!/usr/bin/env node

GLOBAL.install_path = __dirname;

GLOBAL.http = require("http");
GLOBAL.url 	= require("url");
GLOBAL.path = require("path");
GLOBAL.fs 	= require("fs");

GLOBAL.pages       = require(GLOBAL.install_path + "/lib/pages.js");
GLOBAL.node		   = require(GLOBAL.install_path + "/lib/node.js");
GLOBAL.config_file = require(GLOBAL.install_path + "/lib/configuration.js");
GLOBAL.webserver   = require(GLOBAL.install_path + "/lib/webserver.js");

GLOBAL.config = config_file.load();

if (config.webserver_enabled == 1) {
	console.log('Starting webpanel.');
	GLOBAL.webserver.webserver();
} else {
	console.log('Not starting webpanel.');
}


