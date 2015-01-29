/*
 * Author: Wolf Scholle (Obstc0rp)
 * 
 */
 
//####################################### chrome commands ########################################//

var openLastDownload = 'open-last-downlaod';
var openDownloadDir = 'open-download-dir';

/**
 * Add a listener to chrome commands.
 */
chrome.commands.onCommand.addListener(function(command) {

	//open last download
	if(command == openLastDownload){
		chrome.downloads.search({}, function(results){	//search for all DownloadItems
			
			if(results[results.length-1].id)
				chrome.downloads.open(results[results.length-1].id);	//open the last DownloadItem
		});
	} else if(command == openDownloadDir) {		//open default download directory
		chrome.downloads.showDefaultFolder();
	}
});


//####################################### download manager #######################################//

//initial setting
var storageItem = 'managerObject';
var managerObject = JSON.parse(localStorage.getItem(storageItem));
if(!managerObject){
    managerObject = {
        activated: true,
        allPages: true,
        domains: []
    }

    localStorage.setItem(storageItem, JSON.stringify(managerObject));
}

//initial setting end

chrome.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest){
    managerObject = JSON.parse(localStorage.getItem(storageItem));

    if(managerObject.activated == true){

        var domain = getDomainFromUrl(downloadItem.url); 

        domain = checkForIPAndSubdomain(domain);

        var suggestion = {};

        if(managerObject.allPages == true){

            domain = domain.replace(/([<>*+?^=!:${}()|\[\]\/\\])/g, '');

            suggestion.filename = './' + domain + '/' + downloadItem.filename;
        }else{

            var index = managerObject.domains.indexOf(domain);

            if(index >= 0){

                domain = domain.replace(/([<>*+?^=!:${}()|\[\]\/\\])/g, '');

                suggestion.filename = './' + domain + '/' + downloadItem.filename;
            }else{

                suggestion.filename = downloadItem.filename;
            }
        }

        suggest(suggestion);
    }

    return true;
});

function getDomainFromUrl(url){

    var urlArr = url.split('/');    //split by '/'
    var domain = urlArr[2]; //domain is 3. position

    return domain;
}

function checkForIPAndSubdomain(domain){

    var domainParts = domain.split('.');

    if(domainParts.length < 4 && domainParts.length > 1){ //if it's not an IP address and has got subdomain...
        domain = domainParts[domainParts.length-2] + '.' + domainParts[domainParts.length-1];  //take last 2 positions for domain without subdomain
    }

    domainParts = domain.split(':');

    if(domainParts.length > 1){ //if there is a port number
        domain = domainParts[0];    //only domain part without port number
    }

    return domain;
}