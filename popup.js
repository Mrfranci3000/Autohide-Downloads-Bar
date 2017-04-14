/**
 * Close the downloads bar
 *
 */

chrome.downloads.onChanged.addListener(function(downloadDelta) {
  console.log("onChanged:");
  console.log(downloadDelta);
});