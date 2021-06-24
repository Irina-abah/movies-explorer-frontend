import logoPath from '../../images/logo.svg';
import { Link, Route } from "react-router-dom";
import Navigation from '../Header/Navigation/Navigation';

function Header(props) {
  return (
    <header className={props.loggedIn ? "header" : "header header__main"}>
      <Link to="/" className="header__path">
          <img className="header__logo" src={logoPath} alt="Movies portal logo" />
      </Link>
      <Route exact path="/">
        <nav className="header__auth">
            <Link className="header__link header__link_type_signup" to='/signup'>Регистрация</Link>
            <Link className="header__link header__link_type_signin" to='/signin'>Войти</Link>
        </nav>
      </Route>
      <Route path="/movies">
        <Navigation />
      </Route>
      <Route path="/saved-movies">
        <Navigation />
      </Route>
      <Route path="/profile">
        <Navigation />
      </Route>

    </header>
  )
};

export default Header; 