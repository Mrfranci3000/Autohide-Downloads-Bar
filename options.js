// Saves options to chrome.storage
function save_options() {
  var delayTimer = document.getElementById('delayTimer').value;
  var status = document.getElementById('save');
  console.log("delayTimer saved:", delayTimer);
  if (isNaN(delayTimer)){
		save.textContent = 'Please enter a number';
	  }
  else{
	chrome.storage.sync.set({'delayTimerSaved': delayTimer}, function() {
		save.textContent = 'Saved';

		//send the new saved options
		chrome.runtime.sendMessage({greeting: delayTimer}, function(response) {});	

		//sets the text back after 3 second
		setTimeout(function() {
		  status.textContent = 'Save';
		}, 3000);
	  });
  }
}

// Loads the saved value into the textbox on load
function restore_options() {
    chrome.storage.sync.get("delayTimerSaved", function(delayTimer) {
      console.log("delayTimer loaded:", delayTimer);
	  if (isNaN(delayTimer.delayTimerSaved)){
		  document.getElementById('delayTimer').value = 6500 //defaults to 6500 if NaN
	  }
	  else{
        document.getElementById('delayTimer').value = delayTimer.delayTimerSaved;
	  }
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);