export class MoviesApi {
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

  getAllMovies() {
      return fetch(`${this._address}`, {
          headers: this._headers
      })
      .then((res) => {
          return this._checkResponse(res)
      })
  }

}

const AllMoviesApi = new MoviesApi({
  // address: "https://api.express-mesto.nomoredomains.club",
  address: "http://localhost:3005",
  headers: {
    "Content-Type": "application/json"
  }
});

export default AllMoviesApi;