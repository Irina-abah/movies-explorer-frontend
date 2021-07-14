import React from 'react';
import logoPath from '../../images/logo.svg';
import { Link, Route } from "react-router-dom";
import Navigation from '../Header/Navigation/Navigation';
import Menu from '../Header/Menu/Menu';
import Account from '../Profile/Acount/Account';

function Header(props) {

  const [isMenuOpen, setMenuOpen] = React.useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  

  return (
    <header className={`header ${props.loggedIn ? "header__authorized" : ""}`}>
      <Link to="/" className="header__path">
          <img className="link header__logo" src={logoPath} alt="Movies portal logo" />
      </Link>
      <Route exact path="/">
        <Navigation
         />
      </Route>
      <Route path={ ["/movies", "/saved-movies", "/profile"] } >
      <Navigation
          loggedIn={props.loggedIn}/>
          <Account />
          <button className="button button_type_burger" type='button' aria-label='меню' onClick={toggleMenu} alt="Mobile menu icon">
          </button>
      </Route>
      <Menu
        loggedIn={props.loggedIn}
        isOpen={isMenuOpen}
        onClose={toggleMenu}
      />
    </header>
  )
};

export default Header; 