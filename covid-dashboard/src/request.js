export function sendRequest(met, url) {
    return fetch(url).then(response => {
            return response.json();
    });
  }