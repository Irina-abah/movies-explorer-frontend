import React from 'react';
import './App.css';
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import allMoviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth'; 
import {searchMovieByKeyword, searchShortMovie, filterMovies} from '../../utils/FilterMovies';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  });
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFailed, setIsFailed] = React.useState(false);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [checkedSaved, setCheckedSaved] = React.useState(false);
  const [moviesNotFound, setMoviesNotFound] = React.useState(false);
  const [savedMoviesNotFound, setSavedMoviesNotFound] = React.useState(false);
  const [isInfoTooltipActive, setInfoTooltipActive] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  // авторизация, регистрация, проверка токена и выход из аккаунта

  const handleLogin = ({email, password}) => {
    setIsLoading(true)
    return auth.authorize({email, password})
      .then((data) => {
        if (!data) throw new Error('Неверные имя пользователя или пароль')
        if (data.token) {
          setLoggedIn(true)
          localStorage.setItem('jwt', data.token)
          history.push('/movies')
          setIsSuccess(true)
          setInfoTooltipActive(true)
          setIsLoading(false)
          return data
        }
        mainApi.getUserData()
        .then((myData) => {
          setIsFailed(false)
          setCurrentUser(myData) 
        })
        .catch((err) => {
          setIsFailed(true)
          setIsLoading(false)
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false)
        setIsSuccess(false)
        setIsLoading(false)
        setInfoTooltipActive(true)
      })
    };

  const handleRegister = ({name, email, password}) => {
    setIsLoading(true)
    return auth.register({name, email, password})
    .then((res) => {
        if (res) {
            setIsSuccess(true)
            handleLogin({email, password})
            setInfoTooltipActive(true)
            setIsLoading(false)
            return res
        }
      })
    .catch((err) => {
      console.log(err);
      setIsSuccess(false)
      setIsLoading(false)
      setInfoTooltipActive(true)
    });  
  };

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then((res) => {
          if (res) {
            setLoggedIn(true)
            setCurrentUser(res)
            if (location.pathname === '/movies') {
              history.push('/movies')
            } else if (location.pathname === '/profile') {
              history.push('/profile')
            } else if (location.pathname === '/saved-movies') {
              history.push('/saved-movies')
            } else if (location.pathname === '/signin') {
              history.push('/movies')
            } else if (location.pathname === '/signup') {
              history.push('/movies')
            }  
            return res
          }
        })
      .catch((err) => console.log(err));
    }
  }, [history, loggedIn, location.pathname]);

  function handleSignOut() {
    localStorage.clear();
    history.push('/');
    setLoggedIn(false);
    setCurrentUser({});
  }

  // загрузка фильмов с внешнего сервера

  React.useEffect(() => {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoading(true)
      allMoviesApi.getAllMovies()
      .then((movieData) => {
        setIsFailed(false)
        localStorage.setItem('movies',  JSON.stringify(movieData));
        setAllMovies(movieData)

        const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));

          if (searchedMovies) {
            setSearchedMovies(searchedMovies)
          }
        setIsLoading(false)
      })
      .catch((err) => {
        setIsFailed(true)
        console.log(err);
      })
    }
  }, [loggedIn]);

  // загрузка сохраненных фильмов

    React.useEffect(() => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
          mainApi.getSavedMovies()
            .then((savedMovieData) => {
              setIsFailed(false)
              const userSavedMovies = savedMovieData.filter((movie) => {
                return movie.owner === currentUser._id
              })
              setSavedMovies(userSavedMovies)
            })
            .catch((err) => {
              setIsFailed(true)
              console.log(err);
            });
          }
        }, [currentUser._id]);

  // поиск фильмов

  function handleMovieSearchSubmit(input) {
    if (location.pathname === '/movies') {
        const searchedMovies = filterMovies(allMovies, input, checked)
        if (checked) {
          localStorage.setItem('searchedShortMovies', JSON.stringify(searchedMovies));
          const searchedExtraMovies = searchMovieByKeyword(allMovies, input)
          localStorage.setItem('searchedMovies', JSON.stringify(searchedExtraMovies));
        } else {
          localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
        }
        setSearchedMovies(searchedMovies)
        setMoviesNotFoundMessage(searchedMovies)
      
    } else if (location.pathname === '/saved-movies') {
      setIsLoading(true)
      mainApi.getSavedMovies()
      .then((movies) => {
        const userSavedMovies = movies.filter((movie) => {
          return movie.owner === currentUser._id
        })
        const searchedSavedMovies = searchMovieByKeyword(userSavedMovies, input)
          localStorage.setItem('searchedSavedMovies', JSON.stringify(searchedSavedMovies));
      setSavedMovies(searchedSavedMovies)
      setSavedMoviesNotFoundMessage(searchedSavedMovies)
      setIsLoading(false)
      })
      .catch((err) => console.log(err))
    }
  }

  // фильтр по чекбоксу

  function handleChangeCheckbox(evt) {
    setChecked(!checked);
    if (!checked) {
      let searchedMovies = localStorage.getItem('searchedMovies');
      const searchedbyKeyWordMovies = JSON.parse(localStorage.getItem('searchedMovies')); 
      
      if (!searchedMovies) {
        setMoviesNotFound(false)
      } else if (searchedbyKeyWordMovies.length === 0) {
        setMoviesNotFound(true)
      } else {
        const shortMovies = searchShortMovie(searchedbyKeyWordMovies)
        localStorage.setItem('searchedShortMovies', JSON.stringify(shortMovies));
        setSearchedMovies(shortMovies)
        setMoviesNotFoundMessage(shortMovies)
      } 
    } else {
      let searchedMovies = localStorage.getItem('searchedMovies');
      const searchedbyKeyWordMovies = JSON.parse(localStorage.getItem('searchedMovies'));

      if (!searchedMovies) {
        setMoviesNotFound(false)
      } else {
        setSearchedMovies(searchedbyKeyWordMovies);
        setMoviesNotFound(false)
      }
    }
  }

  function handleSavedChangeCheckbox(evt) {
    setCheckedSaved(!checkedSaved)
    if (!checkedSaved) {
      if (savedMovies.length === 0) {
        setSavedMoviesNotFound(false)
      } else {
          const shortMovies = searchShortMovie(savedMovies)
          localStorage.setItem('searchedSavedShortMovies', JSON.stringify(shortMovies));
          setSavedMovies(shortMovies)
          setSavedMoviesNotFoundMessage(shortMovies)
        }
    } else {
      mainApi.getSavedMovies()
        .then(() => {
          const searchedSavedMovies = JSON.parse(localStorage.getItem('searchedSavedMovies'));
          if (!searchedSavedMovies) {
            mainApi.getSavedMovies()
              .then((savedMovieData) => {
                setIsFailed(false)
                const userSavedMovies = savedMovieData.filter((movie) => {
                  return movie.owner === currentUser._id
                })
                setSavedMovies(userSavedMovies)
                setSavedMoviesNotFound(false)
              })
              .catch((err) => {
                setIsFailed(true)
                console.log(err);
              });
            } else {
            setSavedMovies(searchedSavedMovies)
            setSavedMoviesNotFoundMessage(searchedSavedMovies)
          }
        })
        .catch((err) => console.log(err))
      }
    }

  function setMoviesNotFoundMessage(movies) {
    if (movies.length === 0) {
      setMoviesNotFound(true)
    } else {
      setMoviesNotFound(false)
    }
  }

  function setSavedMoviesNotFoundMessage(movies) {
    if (movies.length === 0) {
      setSavedMoviesNotFound(true)
    } else {
      setSavedMoviesNotFound(false)
    }
  }

  // редактирование профиля пользователя

  function handleUpdateUser(user) {
    mainApi.changeUserData(user)
    .then((data) => {
      setCurrentUser(data);
      setInfoTooltipActive(true)
      setIsSuccess(true)
    })
    .catch((err) => {
      console.log(err);
      setIsSuccess(false)
      setInfoTooltipActive(true)
    });
  }

// сохранение фильма в коллекцию 

  function handleSaveMovieClick(movie) {
    const isSaved = savedMovies.some((item) => item.movieId === movie.id);
      if (!isSaved) {
        mainApi.addMovie(movie)
        .then((newMovie) => {
          setSavedMovies([...savedMovies, newMovie])
        })
        .catch((err) => {
          console.log(err);
          setIsSuccess(false)
          setInfoTooltipActive(true)
        });
      } else {
        const movieToDelete = savedMovies.find(item => item.movieId === movie.id);
        handleDeleteMovieClick(movieToDelete)
      }
    }

// удаление фильма из коллекции

  function handleDeleteMovieClick(movie) {
    mainApi.deleteMovie(movie._id)
    .then(() => {
      mainApi.getSavedMovies()
      .then((movies) => {
        const userSavedMovies = movies.filter((movie) => {
          return movie.owner === currentUser._id
        })
        setSavedMovies(userSavedMovies)

        if (userSavedMovies.length === 0) {
          localStorage.removeItem('searchedSavedMovies')
          localStorage.removeItem('searchedShortSavedMovies')
        }
        })
      .catch((err) => console.log(err))
      })
    .catch((err) => console.log(err));
  }

// закрытие попапа со статусом события

  function closePopup() {
    setInfoTooltipActive(false)
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Main 
            loggedIn={loggedIn}/>
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
            checked={checked}
            isLoading={isLoading}
            isFailed={isFailed}
            onMoviesNotFound={moviesNotFound}
            >
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            movies={savedMovies}
            checked={checkedSaved}
            savedMovies={savedMovies}
            isLoading={isLoading}
            isFailed={isFailed}
            onMovieDelete={handleDeleteMovieClick}
            onHandleSubmit={handleMovieSearchSubmit}
            onChangeCheckbox={handleSavedChangeCheckbox}
            onSavedNotFound={savedMoviesNotFound}
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
            onLogin={handleLogin}
            isLoading={isLoading}/>
          </Route>
          <Route path="/signup">
            <Register 
            onRegister={handleRegister}/>
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <InfoTooltip 
          isOpen={isInfoTooltipActive} 
          onClose={closePopup} 
          isSuccess={isSuccess} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
