// Die URL aus den Browser-Parametern auslesen
const params = new URLSearchParams(window.location.search);
const specUrl = params.get('spec');

if (specUrl) {
  const apiReference = document.getElementById('api-reference');
  if (apiReference) {
    apiReference.setAttribute('data-url', specUrl);
  }
}
