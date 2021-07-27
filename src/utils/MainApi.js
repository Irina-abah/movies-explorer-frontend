export class MainApi {
  constructor({address, headers}) {
    this._address = address;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Error ${res.status}`)
  }

  getSavedMovies() {
    return fetch(`${this._address}/movies`, {
      headers: this._headers
    })
    .then((res) => {
      return this._checkResponse(res)
    })
  }

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res)
    })
  }

  changeUserData(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
    .then((res) => {
      return this._checkResponse(res)
    })
  }

  addMovie(data) {
    return fetch(`${this._address}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,  
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `${'https://api.nomoreparties.co'}${data.image.url}`,
        trailer: data.trailerLink,
        thumbnail: `${'https://api.nomoreparties.co'}${data.image.formats.thumbnail.url}`,
        movieId: data.id.toString(),
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
    })
    .then((res) => {
      return this._checkResponse(res)
    })
  }

  deleteMovie(movie) {
    return fetch(`${this._address}/movies/${movie}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._checkResponse(res)
    })
  }

}

const mainApi = new MainApi({
  // address: "https://api.movie-portal.nomoredomains.monster",
  address: "http://localhost:3005",
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json"
  }
});

export default mainApi;