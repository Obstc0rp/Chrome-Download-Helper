
if(!storageItem)
	var storageItem = 'managerObject';

if(!managerObject)
	var managerObject = JSON.parse(localStorage.getItem(storageItem));

$(document).ready(function(){

	refreshOptions();
	addEventsOptions();
	
	$('#selectDescription').tooltip();
});

function refreshOptions(){
	if(managerObject.allPages){

		$('#collapseOne').removeClass('in');
	} else {

		$('#collapseOne').addClass('in');
	}

	$('#domains').empty();
	managerObject.domains.forEach(function(elem){
		$('#domains').append('<option>' + elem + '</option>');
	});
}

function addEventsOptions(){
	$('#selectDomains').click(function(){

		managerObject.allPages = managerObject.allPages == true ? false : true;
		localStorage.setItem(storageItem, JSON.stringify(managerObject));
	});

	$('#newDomain').keypress(function(e){
		if(e.which == 13){	//13 for enter
			
			$('#addDomain').click();
		}
	})

	$('#addDomain').click(function(){

		var newDomain = $('#newDomain').val();

		managerObject.domains.push(newDomain);	//push new domain into array

		localStorage.setItem(storageItem, JSON.stringify(managerObject));

		$('#newDomain').val('');
		refreshOptions();
	});

	$('#domains').keypress(function(e){
		//TODO: escape
	});

	$('#removeDomain').click(function(){
		var domainSelect = document.getElementById('domains');

		domainSelect.remove(domainSelect.selectedIndex);

		managerObject.domains = [];	//clear domain list
		
		for(var i = 0; i < domainSelect.length; i++){
			managerObject.domains.push(domainSelect[i].value);
		}
		console.log(managerObject);

		localStorage.setItem(storageItem, JSON.stringify(managerObject));

		refreshOptions();
	});
}