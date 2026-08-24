const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

// Falls back to localhost when VITE_CODESPACE_NAME is unset, avoiding `https://undefined-8000...` URLs.
// Define VITE_CODESPACE_NAME in octofit-tracker/frontend/.env.local when running in a Codespace.
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export async function fetchCollection(resource) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`);
  if (!response.ok) {
    throw new Error(`Request to ${resource} failed with status ${response.status}`);
  }
  const data = await response.json();
  // Support both plain array responses and paginated { results: [...] } responses
  return Array.isArray(data) ? data : (data.results ?? []);
}
