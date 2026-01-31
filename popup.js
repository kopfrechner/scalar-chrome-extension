// Supported extensions for OpenAPI specs
const SUPPORTED_EXTENSIONS = ['.json', '.yml', '.yaml'];

// Function to open the viewer with a specific URL
function openViewer(url) {
  if (url) {
    chrome.tabs.create({
      url: `viewer.html?spec=${encodeURIComponent(url)}`
    });
  }
}

// Check current tab URL and update button state
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTab = tabs[0];
  const btn = document.getElementById('openCurrentBtn');
  
  if (currentTab && currentTab.url) {
    const url = currentTab.url.toLowerCase().split('?')[0].split('#')[0];
    const isSupported = SUPPORTED_EXTENSIONS.some(ext => url.endsWith(ext));
    
    if (!isSupported) {
      btn.disabled = true;
      btn.title = "Current page does not appear to be a supported OpenAPI file (.json, .yml, .yaml)";
    }
  } else {
    btn.disabled = true;
  }
});

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