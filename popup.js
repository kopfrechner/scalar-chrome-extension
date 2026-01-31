document.getElementById('openBtn').addEventListener('click', () => {
  const url = document.getElementById('specUrl').value;
  if (url) {
    // Opens a new tab with our viewer.html and the Spec URL
    chrome.tabs.create({
      url: `viewer.html?spec=${encodeURIComponent(url)}`
    });
  }
});
