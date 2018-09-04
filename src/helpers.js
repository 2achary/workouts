export let API_URL = 'http://127.0.0.1:8000/api/';

export function sendApiRequest(url, body, verb, callback) {
  let fetchConfig = {
    method: verb,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (body) {
    fetchConfig.body = JSON.stringify(body)
  }

  let responsePromise = fetch(url, fetchConfig);
  responsePromise = responsePromise.then(r => r.json());
  return responsePromise.then(callback);
}