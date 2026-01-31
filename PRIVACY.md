# Privacy Policy for Scalar OpenAPI Viewer

**Last Updated:** January 31, 2026

## 1. Introduction
This Privacy Policy describes how the **Scalar OpenAPI Viewer** Chrome Extension ("we", "us", or "the extension") handles your information. We are committed to protecting your privacy.

## 2. Data Collection
We do **not** collect, store, or transmit any personally identifiable information (PII). We do not use cookies to track you across the web.

## 3. Data Usage
The extension performs all processing locally within your browser's secure sandbox environment.

- **URLs & API Specs:** When you use the "Visualize Current Page" feature or manually enter a URL, the extension fetches the content of that specific URL solely to render the API documentation for you. This data is processed immediately and is not stored or sent to our servers.
- **Local Storage:** The extension uses a temporary in-memory storage to handle user interface preferences during your active session. This data is cleared when you close the tab.

## 4. Third-Party Services
The extension uses the **Scalar** API Reference library to render the documentation.
- The library is loaded from a standard Content Delivery Network (CDN) (jsdelivr) inside a restricted sandbox.
- The extension only fetches the specific OpenAPI specification file you explicitly request.

## 5. Contact
If you have questions about this policy, please open an issue in our [GitHub Repository](https://github.com/kopfrechner/scalar-chrome-extension).
