/**
 * @author: Hasin Hayder [hasin_at_leevio_dot_com | http://hasin.me]
 * @license: MIT
 */
var currentTab=0, oldTab=1, tabRemoved=false, oldWindow = 0, currentWindow = 0, singleTab = true;

chrome.tabs.onActivated.addListener(function(activeInfo) {
	if(!tabRemoved){
	//plain switch
		if(oldTab!=activeInfo.currentTab){
			oldTab = currentTab;
			currentTab = activeInfo.tabId;
		}
	}else{
	//this tab got focus because previous tab was closed. So just update the currentTab
		currentTab = activeInfo.tabId;
		tabRemoved=false;
	}

	//if switched then update the window IDs
	if(!singleTab)
	{
		oldWindow = currentWindow;
		currentWindow = activeInfo.windowId;
	}
	else //Only single tab is active yet
	{
		oldWindow = currentWindow = activeInfo.windowId;
		singleWindow = false;
	}

});

//listen for the Alt + Z keypress event
chrome.commands.onCommand.addListener(function (command) {
	//alert(command);
	if (command == "switch") {
		if(currentWindow !== oldWindow) //Need switch on another window
		{
			chrome.windows.update(oldWindow, {focused: true}); //Get focus on the previous window

			//update the window IDs
			var tmp = oldWindow;
			oldWindow = currentWindow;
			currentWindow = tmp;
		}

    	chrome.tabs.update(oldTab,{selected:true}); //switch tab
    }
});


//If an active window is removed, update the window IDs
chrome.windows.onRemoved.addListener(function (winid) {

	if(oldWindow === winid)
	{
		oldWindow = currentWindow;
	}
	else
	{
		currentWindow = oldWindow;
	}

});

//listen when a tab is closed
chrome.tabs.onRemoved.addListener(function(){
	tabRemoved=true;
});


