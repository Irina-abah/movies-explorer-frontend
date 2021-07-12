import React from 'react';
import './App.css';
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import allMoviesApi from '../../utils/MoviesApi';
import * as auth from '../../utils/auth'; 

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  });
  const [movies, setMovies] = React.useState([]);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const history = useHistory();

  // загрузка всех фильмов

  React.useEffect(() => {
    // if (loggedIn) {

      allMoviesApi.getAllMovies()
        .then((movieData) => {
          console.log(movieData)
            setMovies(movieData);
        })
        .catch((err) => {
          console.log(err);
        });
    // }
  }, []);

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
              history.push('/movies')
              return res
          }
      })
      .catch((err) => console.log(err));
  }
  }, [history, loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/movies')
    }
  }, [history, loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header 
            loggedIn={loggedIn}
            />
            {!loggedIn ? <Main /> : <Redirect to="/movies" />}
            <Footer />
          </Route>
          {/* <ProtectedRoute path="/movies" */}
          <Route path="/movies"
          >
            <Header
            loggedIn={!loggedIn} />
            <Movies 
              movies={movies}
            />
            <Footer />
            </Route>
          {/* </ProtectedRoute> */}
          {/* <ProtectedRoute path="/saved-movies"> */}
          <Route path="/saved-movies">
            <Header 
            loggedIn={!loggedIn} />
            <SavedMovies />
            <Footer />
            </Route>
          {/* </ProtectedRoute> */}
          {/* <ProtectedRoute path="/profile"> */}
          <Route path="/profile">
            <Header 
            loggedIn={!loggedIn} />
            <Profile />
            </Route>
          {/* </ProtectedRoute> */}
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
