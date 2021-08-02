import React from 'react';
import './App.css';
import { Route, Switch, useHistory, Redirect, useLocation } from "react-router-dom";
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
import {searchMovieByKeyword, searchShortMovie} from '../../utils/FilterMovies';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  });
  const [movies, setMovies] = React.useState([]);
  const [savedMovie, setSavedMovie] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFailed, setIsFailed] = React.useState(false);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  // загрузка всех фильмов и данных пользователя

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true)

      Promise.all([mainApi.getUserData(), allMoviesApi.getAllMovies()])
        .then(([myData, movieData]) => {
          // console.log(movieData)
          setIsFailed(false)
          setMovies(movieData)
          setCurrentUser(myData)
          localStorage.setItem('movies',  JSON.stringify(movieData));
        
          const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
          if (searchedMovies) {
            setSearchedMovies(searchedMovies)
          }
          setIsLoading(false)
        })
        .catch((err) => {
          setIsFailed(true)
          console.log(err);
        });
    }
  }, [loggedIn]);

  // загрузка сохраненных фильмов

  function getSaveMovies() {
    setIsLoading(true)
    return mainApi.getSavedMovies()
      .then((movies) => {
        console.log(movies)
        setIsFailed(false)
        setSavedMovies(movies);
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        setIsLoading(false)
        return movies
      })
      .catch((err) => {
        setIsFailed(true)
        console.log(err)
      })
  }

  React.useEffect(() => {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      getSaveMovies()
    }
  }, [history]);

  // поиск фильмов и фильтрация по чекбоксу

  function handleMovieSearchSubmit(input) {
    if (location.pathname === '/movies') {
      const allMovies = JSON.parse(localStorage.getItem('movies'));
      const searchedMovies = searchMovieByKeyword(allMovies, input)
      localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
      setSearchedMovies(searchedMovies)
      setNotFoundMessage(searchedMovies)
    } else if (location.pathname === '/saved-movies') {
      setIsLoading(true)
      const savedMoviesList = JSON.parse(localStorage.getItem('savedMovies'));
      const searchedSavedMovies = searchMovieByKeyword(savedMoviesList, input)
      setSavedMovies(searchedSavedMovies)
      setNotFoundMessage(searchedSavedMovies)
      setIsLoading(false)
    }
  }
  
  function handleChangeCheckbox(evt) {
    setChecked(!checked);
    
    const shortMovies = searchShortMovie(searchedMovies)
    setSearchedMovies(shortMovies)
    setNotFoundMessage(shortMovies)
    if (location.pathname === '/saved-movies') {
      const shortMovies = searchShortMovie(savedMovies)
      setSavedMovies(shortMovies)
      setNotFoundMessage(shortMovies)
    }
  }

  function handleShowSearchedMovies() {
    setChecked(!checked);
    const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
    setSearchedMovies(searchedMovies);
    setNotFoundMessage(searchedMovies);
    if (location.pathname === '/saved-movies') {
      getSaveMovies()
    }
  }

  function setNotFoundMessage(movies) {
    if (movies.length === 0) {
      setNotFound(true)
    } else {
      setNotFound(false)
    }
  }

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
    localStorage.clear();
    history.push('/');
    setLoggedIn(false);
    setMovies([]);
    setCurrentUser({});
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

// сохранение фильма в коллекцию 

function handleSaveMovieClick(movie) {
  console.log(movie)
  mainApi.addMovie(movie)
  .then((newMovie) => {
    setSavedMovies([...savedMovies, newMovie]);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    setSavedMovie(newMovie)
  })
  .catch((err) => console.log(err));
} 

// удаление фильма из коллекции

function handleDeleteMovieClick(movie) {
    mainApi.deleteMovie(movie._id || savedMovie._id)
    .then(() => {
      getSaveMovies()
      .then((res) => {
        let userMovies = []
            res.forEach(movie => {
                userMovies.push(movie);
            })
            setSavedMovies(userMovies)
      })
    })
  .catch((err) => console.log(err)); 
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
            onSaveClick={handleSaveMovieClick}
            movies={searchedMovies}
            savedMovies={savedMovies}
            onHandleSubmit={handleMovieSearchSubmit}
            onMovieDelete={handleDeleteMovieClick}
            onChangeCheckbox={handleChangeCheckbox}
            onChecked={checked}
            onShowSearchedMovies={handleShowSearchedMovies}
            isLoading={isLoading}
            isFailed={isFailed}
            onNotFound={notFound}
            // savedMovie={savedMovie}
            >
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            movies={savedMovies}
            onChecked={checked}
            savedMovies={savedMovies}
            isLoading={isLoading}
            isFailed={isFailed}
            onMovieDelete={handleDeleteMovieClick}
            onHandleSubmit={handleMovieSearchSubmit}
            onChangeCheckbox={handleChangeCheckbox}
            onShowSearchedMovies={handleShowSearchedMovies}
            onNotFound={notFound}
            >
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
