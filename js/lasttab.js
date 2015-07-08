/**
 * @author: Hasin Hayder [hasin_at_leevio_dot_com | http://hasin.me]
 * @license: MIT
 */
var currentTab=0, oldTab=1, tabRemoved=false;
chrome.tabs.onActivated.addListener(function(activeInfo) {
	if(!tabRemoved){
	//plain switch
		if(oldTab!=activeInfo.tabId){
			oldTab = currentTab;
			currentTab = activeInfo.tabId;
		}
	}else{
	//this tab got focus because previous tab was closed. So just update the currentTab
		currentTab = activeInfo.tabId;
		tabRemoved=false;
	}

});

//listen for the Alt + Z keypress event
chrome.commands.onCommand.addListener(function (command) {
	//alert(command);
	if (command == "switch") {
    	chrome.tabs.update(oldTab,{selected:true});
    } 
});

//listen when a tab is closed
chrome.tabs.onRemoved.addListener(function(){
	tabRemoved=true;
})
