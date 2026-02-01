// Fix for Sandbox: Mock localStorage to prevent SecurityError
try {
  window.localStorage;
} catch (e) {
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

// Function to initialize Scalar
function initScalar() {
  const params = new URLSearchParams(window.location.search);
  const specUrl = params.get('spec');

  if (specUrl && window.Scalar) {
    Scalar.createApiReference('#scalar', {
      url: specUrl,
      proxyUrl: 'https://proxy.scalar.com', // Added proxy support as recommended
    });
  } else if (!specUrl) {
    document.body.innerHTML = '<div style="padding: 20px; font-family: sans-serif;">No OpenAPI Spec URL provided.</div>';
  }
}

// Wait for the Scalar library to load
window.onload = initScalar;
