chrome.downloads.onChanged.addListener(function(downloadDelta) {
  console.log("onChanged:");
  console.log(downloadDelta);
}); // Close the downloads bar
