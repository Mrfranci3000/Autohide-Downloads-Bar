/**
 * Close the downloads bar
 * TylerB 4/14/17
 */

// closes the download shelf
function closeShelf(delay) {
	setTimeout(function(){
		chrome.downloads.setShelfEnabled(false);
		chrome.downloads.setShelfEnabled(true);
   		console.log("shelf closed");
	}, delay);
}; 

//pulls the delayTimer on load
function initialize_stuff() {
    chrome.storage.sync.get("delayTimerSaved", function(delayTimer) {
      console.log("delayTimer", delayTimer.delayTimerSaved);
      dTimer = delayTimer.delayTimerSaved;
	  console.log("dTimer", dTimer);
	  if (isNaN(dTimer)){
		  dTimer = 6500 //defaults to 6500 if NaN
	  }
	  chrome.storage.sync.set({'delayTimerSaved': dTimer}, function() {
          // Notify that we saved.
          console.log('dTimer Saved: ', dTimer);
		  });
	});
  return dTimer;
};

function loadTimer() {
  var dTimer;
  chrome.storage.sync.get("delayTimerSaved", function(delayTimer) {
    dTimer = delayTimer.delayTimerSaved;
  });
  return dTimer;
};

//if downloads finish then call begin closing shelf
chrome.downloads.onChanged.addListener(function (e) {
	if (typeof e.state !== 'undefined') {
		if (e.state.current === 'complete') {
    		console.log("closing shelf, dTimer: ", dTimer);
			closeShelf(dTimer);
		}
	}
});

//recieve message from option.js if the timer is updated
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    dTimer = request.greeting;
  });
  
var dTimer;
document.addEventListener('DOMContentLoaded', initialize_stuff);
