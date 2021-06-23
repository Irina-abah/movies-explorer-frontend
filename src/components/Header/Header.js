import logoPath from '../../images/logo.svg';
import { Link, Route } from "react-router-dom";
import Navigation from '../Header/Navigation/Navigation';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__">
          <img className="header__logo" src={logoPath} alt="Movies portal logo" />
      </Link>
      <Route exact path="/">
        <div className="header__auth">
            <Link className="header__link header__link_type_signup" to='/signup'>Регистрация</Link>
            <Link className="header__link header__link_type_signin" to='/signin'>Войти</Link>
        </div>
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