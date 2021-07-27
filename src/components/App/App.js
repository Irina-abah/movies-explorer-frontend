import React from 'react';
import './App.css';
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import allMoviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth'; 


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  });
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();


  // загрузка всех фильмов и данных пользователя

  React.useEffect(() => {
    if (loggedIn) {

      Promise.all([mainApi.getUserData(), allMoviesApi.getAllMovies()])
        .then(([myData, movieData]) => {
          // console.log(movieData)
          setMovies(movieData)
          setCurrentUser(myData)
          // console.log(myData)
          localStorage.setItem('movies',  JSON.stringify(movieData));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // загрузка сохраненных фильмов

  function getSaveMovies() {
    return mainApi.getSavedMovies()
      .then((movies) => {
        console.log(movies)
        setSavedMovies(movies);
        return movies
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  React.useEffect(() => {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      getSaveMovies()
    }
  }, [history]);

  

  // проверка токена, авторизация и регистрация

const handleLogin = ({email, password}) => {
  return auth.authorize({email, password})
  .then((data) => {
      if (!data) throw new Error('Неверные имя пользователя или пароль')
      if (data.token) {
        setLoggedIn(true)
        localStorage.setItem('jwt', data.token)
        history.push('/movies')
        return data
      }
  })
};

  const handleRegister = ({name, email, password}) => {
      return auth.register({name, email, password})
      .then((res) => {
          if (res) {
              setIsRegistered(true)
              setCurrentUser(true)
              // setInfoTooltipActive(true)
              history.push('/movies')
              return res
          }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistered(false)
        // setInfoTooltipActive(true)
      });  
  };

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then((res) => {
          if (res) {
              setLoggedIn(true)
              // setCurrentUser(res)
              history.push('/')
              return res
          }
      })
      .catch((err) => console.log(err));
  }
  }, [history, loggedIn]);

  function handleSignOut() {
    localStorage.removeItem('jwt');
    history.push('/');
    setLoggedIn(false);
    // setMovies([]);
    setCurrentUser({});
  }

// сохранение фильма в коллекцию 

function handleSaveMovieClick(movie) {

  // if (movie.owner !== currentUser._id) {
     mainApi.addMovie(movie)
     
    .then((newMovie) => {
      setSavedMovies([...savedMovies, newMovie]);
    })
    .catch((err) => console.log(err));
  // }
  } 

// удаление фильма из коллекции

function handleDeleteMovieClick(movie) {
  mainApi.deleteMovie(movie._id)
  .then(() => {
    getSaveMovies()
    .then((res) => {
      let userMovies = []
          res.forEach(movie => {
            if(movie.owner === currentUser._id) {
              userMovies.push(movie);
            }
          })
          setSavedMovies(userMovies) 
    })
  })
  .catch((err) => console.log(err));
}

// редактирование профиля пользователя

function handleUpdateUser(user) {

  mainApi.changeUserData(user)
  .then((data) => {
    setCurrentUser(data);
  })
  .catch((err) => {
    console.log(err);
  });
}



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {!loggedIn ? <Main /> : <Redirect to="/movies" />}
          </Route>
          <ProtectedRoute path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            onSaveClick={handleSaveMovieClick}>
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            movies={savedMovies}
            onCardDelete={handleDeleteMovieClick}>
          </ProtectedRoute>
          <ProtectedRoute path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onSignOut={handleSignOut}
            onUpdateUser={handleUpdateUser}>
          </ProtectedRoute>
          <Route path="/signin">
            <Login 
            onLogin={handleLogin}/>
          </Route>
          <Route path="/signup">
            <Register 
            onRegister={handleRegister}/>
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
