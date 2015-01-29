
var storageItem = 'managerObject';
var managerObject = JSON.parse(localStorage.getItem(storageItem));

$(document).ready(function(){

	refresh();	
	addEvents();

	$('#selectDomains').tooltip();
});

function refresh () {
	if(managerObject.activated){
		$('#pluginActivate').removeClass('btn-danger'); //attr('class', 'btn btn-success');
		$('#pluginActivate').addClass('btn-success');
		$('#spanActivate').removeClass('glyphicon-remove');
		$('#spanActivate').addClass('glyphicon-ok');
	} else {
		$('#pluginActivate').removeClass('btn-success'); //attr('class', 'btn btn-success');
		$('#pluginActivate').addClass('btn-danger');
		$('#spanActivate').removeClass('glyphicon-ok');
		$('#spanActivate').addClass('glyphicon-remove');
	}
}

function addEvents () {
	
	//enable / disable plugin
	$('#pluginActivate').click(function(){
		//TODO: check
		managerObject.activated = managerObject.activated == true ? false : true;
		localStorage.setItem(storageItem, JSON.stringify(managerObject));

		console.log(managerObject);
		refresh();
	});
}