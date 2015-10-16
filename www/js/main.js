$(document).ready(function() {
	get_config();
	//alert(config.ip);
	refresh_menu();

});

window.config = {};

function get_config() {
	$.getJSON('/js/config.json').done(function(data){
		config = data;
	});
}

function refresh_menu() {
	$('ul#nav a').on('click', function (e) {
		e.preventDefault();
		var page = $(this).attr('href');
		$('#page').load(page);
	});
}

function vserver_submit() {
	/*$("form#addhost").validate({
		rules: {
			ip: "required",
			port: "required",
			password: "required",
		}
	}); //*/

	$.post('/node/add/', 
		$('form#addhost').serialize()
		);
	//return false;
}

$(document).on('submit', 'form#addhost', function(e) {
	
	
	vserver_submit();
	e.preventDefault();
	return false;
});