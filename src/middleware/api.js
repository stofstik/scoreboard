const API_URL = 'http://player-api.codaisseur.cloud/'

class Api {
  // Create a set of extensible default headers
  defaultHeaders(otherHeaders = {}) {

    let acceptHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    return Object.assign({}, acceptHeaders, otherHeaders)
  }

  get(path) {
    let url = this.url(path)

    return fetch(url, {
      method: 'GET',
      headers: this.defaultHeaders(),
    }).then((response) => response.json())
  }

  post(path, postData) {
    let url = this.url(path)

    return fetch(url, {
      method: 'POST',
      headers: this.defaultHeaders(),
      body: JSON.stringify(postData)
    }).then((response) => response.json())
  }

  put(path, putData) {
    let url = this.url(path)

    return fetch(url, {
      method: 'PUT',
      headers: this.defaultHeaders(),
      body: JSON.stringify(putData)
    }).then((response) => response.json())
  }

  patch(path, patchData) {
    let url = this.url(path)

    return fetch(url, {
      method: 'PATCH',
      headers: this.defaultHeaders(),
      body: JSON.stringify(patchData)
    }).then((response) => response.json())
  }

  delete(path) {
    let url = this.url(path)

    return fetch(url, {
      method: 'DELETE',
      headers: this.defaultHeaders(),
    }).then((response) => response.json())
  }

  url(path = '/') {
    return `${API_URL}${path}.json`
  }
}

const api = new Api()

export default api
