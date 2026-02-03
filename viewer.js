/**
 * viewer.js
 * Handles initialization of the Scalar API Reference based on URL parameters.
 */

// Constants
const MODE_PARAM = 'mode';
const MODES = {
  DIRECT: 'direct',
  PROXY: 'proxy'
};

// Polyfills
function mockLocalStorage() {
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
}

// Helpers
function getParams() {
  return new URLSearchParams(window.location.search);
}

function getMode(params) {
  return params.get(MODE_PARAM) || MODES.DIRECT;
}

function createContainer() {
  const div = document.createElement('div');
  div.id = 'scalar';
  document.body.appendChild(div);
  return div;
}

function showError(message) {
  document.body.innerHTML = `<div style="padding: 20px; font-family: sans-serif; color: #d32f2f;">${message}</div>`;
}

/**
 * Waits for the Scalar object to be available on window, then executes the callback.
 */
function waitForScalar(callback) {
  if (window.Scalar) {
    callback();
  } else {
    const check = setInterval(() => {
      if (window.Scalar) {
        clearInterval(check);
        callback();
      }
    }, 100);
  }
}

/**
 * Handles 'Data' mode (content passed via URL param from File Upload).
 */
function handleDataMode(params) {
  const encodedContent = params.get('content');
  if (!encodedContent) {
    showError('Error: No content provided in URL.');
    return;
  }

  try {
    const content = decodeURIComponent(encodedContent);
    createContainer();

    waitForScalar(() => {
      Scalar.createApiReference('#scalar', {
        spec: { content: content },
        proxyUrl: 'https://proxy.scalar.com',
      });
    });
  } catch (e) {
    showError(`Error parsing content: ${e.message}`);
  }
}

/**
 * Handles 'URL' mode (Standard usage via spec URL).
 */
function handleUrlMode(params, specUrl) {
  const mode = getMode(params);

  if (mode === MODES.DIRECT) {
    // Direct Mode: Use strict script tag (Good for Localhost)
    const script = document.createElement('script');
    script.id = 'api-reference';
    script.setAttribute('data-url', specUrl);
    document.body.appendChild(script);
  } else {
    // Proxy Mode: Use Scalar.createApiReference (Good for CORS)
    createContainer();

    waitForScalar(() => {
      Scalar.createApiReference('#scalar', {
        url: specUrl,
        proxyUrl: 'https://proxy.scalar.com',
      });
    });
  }
}

// Main Initialization
function init() {
  mockLocalStorage();
  const params = getParams();
  const src = params.get('src');
  const specUrl = params.get('spec');

  if (src === 'data') {
    handleDataMode(params);
  } else if (specUrl) {
    handleUrlMode(params, specUrl);
  } else {
    showError('No OpenAPI Spec URL provided.');
  }
}

// Execute
init();
