// Read the URL from the browser parameters
const params = new URLSearchParams(window.location.search);
const specUrl = params.get('spec');

if (specUrl) {
  const apiReference = document.getElementById('api-reference');
  if (apiReference) {
    apiReference.setAttribute('data-url', specUrl);
  }
}
