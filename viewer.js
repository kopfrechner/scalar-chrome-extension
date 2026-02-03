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

// Read the URL from the browser parameters
const params = new URLSearchParams(window.location.search);
const specUrl = params.get('spec');
const MODE_PARAM = 'mode';
const MODES = {
  DIRECT: 'direct',
  PROXY: 'proxy'
};

// Function to get current mode (default: DIRECT)
function getMode() {
  return params.get(MODE_PARAM) || MODES.DIRECT;
}

// Function to toggle mode
function toggleMode() {
  const current = getMode();
  const next = current === MODES.DIRECT ? MODES.PROXY : MODES.DIRECT;

  // Update URL and reload
  params.set(MODE_PARAM, next);
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  window.location.reload();
}

// Render the Toggle Button
function renderToggleButton() {
  const mode = getMode();
  const btn = document.createElement('button');
  btn.className = 'mode-toggle';
  btn.textContent = mode === MODES.DIRECT ? 'Mode: Direct (Local)' : 'Mode: Proxy (CORS Fix)';
  btn.title = mode === MODES.DIRECT
    ? 'Switch to Proxy execution to fix CORS issues'
    : 'Switch to Direct execution for Localhost specs';
  btn.onclick = toggleMode;
  document.body.appendChild(btn);
}

// Initialize Scalar based on mode
function initScalar() {
  if (!specUrl) {
    document.body.insertAdjacentHTML('afterbegin', '<div style="padding: 20px; font-family: sans-serif;">No OpenAPI Spec URL provided.</div>');
    return;
  }

  renderToggleButton();

  const mode = getMode();

  if (mode === MODES.DIRECT) {
    // Direct Mode: Use strict script tag (Good for Localhost)
    const script = document.createElement('script');
    script.id = 'api-reference';
    script.setAttribute('data-url', specUrl);
    // data-proxy-url is NOT set here to avoid proxying
    document.body.appendChild(script);
  } else {
    // Proxy Mode: Use Scalar.createApiReference (Good for CORS)
    const div = document.createElement('div');
    div.id = 'scalar';
    document.body.appendChild(div);

    // Wait specifically for Scalar object if using CDN script at bottom
    if (window.Scalar) {
      Scalar.createApiReference('#scalar', {
        url: specUrl,
        proxyUrl: 'https://proxy.scalar.com',
      });
    } else {
      // Fallback/Retry if script loads late
      const check = setInterval(() => {
        if (window.Scalar) {
          clearInterval(check);
          Scalar.createApiReference('#scalar', {
            url: specUrl,
            proxyUrl: 'https://proxy.scalar.com',
          });
        }
      }, 100);
    }
  }
}

// Run immediately to ensure elements are present before the Scalar CDN script loads
initScalar();
