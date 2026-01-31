// Fix for Sandbox: Mock localStorage to prevent SecurityError
try {
  // Try to access localStorage to see if it throws
  window.localStorage;
} catch (e) {
  // If it throws (SecurityError), define a simple in-memory mock
  const store = {};
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = String(value); },
      removeItem: (key) => { delete store[key]; },
      clear: () => { for (let key in store) delete store[key]; },
      key: (i) => Object.keys(store)[i] || null,
      get length() { return Object.keys(store).length; }
    },
    writable: true,
    configurable: true
  });
}

// Read the URL from the browser parameters
const params = new URLSearchParams(window.location.search);
const specUrl = params.get('spec');

if (specUrl) {
  const apiReference = document.getElementById('api-reference');
  if (apiReference) {
    apiReference.setAttribute('data-url', specUrl);
  }
}