# Scalar OpenAPI Viewer

A lightweight Chrome Extension to view any OpenAPI/Swagger specification file using the beautiful [Scalar](https://scalar.com) API reference viewer.

## Features

- **Instant Rendering:** Open any OpenAPI JSON/YAML URL directly in Scalar.
- **Dark/Light Mode:** Automatically adapts to your system theme.
- **Secure:** Runs entirely in your browser using a sandboxed environment. No data is sent to third-party servers (except fetching the spec you provide).

## How to use

1. Click the extension icon in your toolbar.
2. Paste the URL of an OpenAPI specification (e.g., `https://petstore.swagger.io/v2/swagger.json`).
3. Click "Open".
4. Enjoy the documentation!

## Development

This extension uses a "Sandboxed Page" architecture to securely load the Scalar CDN.

### Build

To create a zip bundle for the Chrome Web Store:
1. Push to `main`.
2. Download the artifact from the GitHub Actions tab.

Alternatively, zip the files manually:
```bash
zip -r extension.zip . -x "*.git*"
```
