// Saves options to chrome.storage
function save_options() {
  var delayTimer = document.getElementById('delayTimer').value;
  console.log("delayTimer saved:", delayTimer);

  // Update status to let user know options were saved.
  chrome.storage.sync.set({'delayTimerSaved': delayTimer}, function() {
    var status = document.getElementById('save');
    save.textContent = 'Saved';

	//send the new saved options
	chrome.runtime.sendMessage({greeting: delayTimer}, function(response) {
		console.log(response.farewell);
	});	

    //sets the text back after 3 second
	setTimeout(function() {
      status.textContent = 'Save';
    }, 3000);
  });
}

// Loads the saved value into the textbox on load
function restore_options() {
    chrome.storage.sync.get("delayTimerSaved", function(delayTimer) {
      console.log("delayTimer loaded:", delayTimer);
      document.getElementById('delayTimer').value = delayTimer.delayTimerSaved;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);