document.getElementById('openBtn').addEventListener('click', () => {
  const url = document.getElementById('specUrl').value;
  if (url) {
    // Öffnet einen neuen Tab mit unserer viewer.html und der Spec-URL
    chrome.tabs.create({
      url: `viewer.html?spec=${encodeURIComponent(url)}`
    });
  }
});
