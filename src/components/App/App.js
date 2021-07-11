import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  });
  // const [isSaved, setIsSaved] = React.useState(false);

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
          <ProtectedRoute path="/movies">
            <Header
            loggedIn={!loggedIn} />
            <Movies />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies">
            <Header 
            loggedIn={!loggedIn} />
            <SavedMovies />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <Header 
            loggedIn={!loggedIn} />
            <Profile />
          </ProtectedRoute>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
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
