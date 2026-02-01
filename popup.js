// Function to open the viewer with a specific URL
function openViewer(url) {
  if (url) {
    chrome.tabs.create({
      url: `viewer.html?spec=${encodeURIComponent(url)}`
    });
  }
}

// Handle "Open Current Tab" button
document.getElementById('openCurrentBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0] && tabs[0].url) {
      openViewer(tabs[0].url);
    }
  });
});

// Handle Manual "Open" button
document.getElementById('openBtn').addEventListener('click', () => {
  const url = document.getElementById('specUrl').value;
  openViewer(url);
});

// Handle home link
document.getElementById('homeLink').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://kopfarbeit.dev' });
});