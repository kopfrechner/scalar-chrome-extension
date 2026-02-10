// Function to open the viewer with a specific URL
function openViewer(url) {
  if (url) {
    const useProxy = document.getElementById('proxyMode').checked;
    const mode = useProxy ? 'proxy' : 'direct';
    chrome.tabs.create({
      url: `viewer.html?spec=${encodeURIComponent(url)}&mode=${mode}`
    });
  }
}

// Restore checkbox state
const PROXY_MODE_KEY = 'scalar_proxy_mode';
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(PROXY_MODE_KEY);
  if (saved === 'true') {
    document.getElementById('proxyMode').checked = true;
  }
});

// Save checkbox state
document.getElementById('proxyMode').addEventListener('change', (e) => {
  localStorage.setItem(PROXY_MODE_KEY, e.target.checked);
});

// Handle "Open Current Tab" button
document.getElementById('openCurrentBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0] && tabs[0].url) {
      openViewer(tabs[0].url);
    }
  });
});



// Handle home link
document.getElementById('homeLink').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://sodazitron.dev' });
});

// Handle "Load from File" button
document.getElementById('fileBtn').addEventListener('click', () => {
  document.getElementById('fileInput').click();
});

// Handle File Selection
document.getElementById('fileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const content = event.target.result;
    // Pass content via URL param (Extension URL limit is generous)
    const encodedContent = encodeURIComponent(content);
    chrome.tabs.create({
      url: `viewer.html?src=data&content=${encodedContent}&mode=direct`
    });
  };
  reader.readAsText(file);
});