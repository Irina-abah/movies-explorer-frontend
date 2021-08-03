export const BASE_URL = 'https://api.movie-portal.nomoredomains.monster';
// export const BASE_URL = 'http://localhost:3005';

export const register = ({name, email, password}) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    .then(checkResponse)
};

export const authorize = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
}; 

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(checkResponse)
};

  const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }

    return Promise.reject(`Error ${res.status}`)
  }