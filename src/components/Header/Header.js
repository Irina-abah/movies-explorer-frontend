import React from 'react';
import logoPath from '../../images/logo.svg';
import { Link, Route, useLocation } from "react-router-dom";
import Navigation from '../Header/Navigation/Navigation';
import Menu from '../Header/Menu/Menu';
import DisplayMovieCards from '../../utils/MoviesToDisplay';
// import Account from '../Profile/Acount/Account';

function Header(props) {

  const location = useLocation();
  const { windowWidth } = DisplayMovieCards();

  const [isMenuOpen, setMenuOpen] = React.useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  const isMain = location.pathname === '/';
  const headerClassName = `header ${isMain ? "header__main" : ""}`;

  return (
    <header className={headerClassName}>
      <Link to="/" className="header__path">
          <img className="link header__logo" src={logoPath} alt="Movies portal logo" />
      </Link>
      <Route exact path="/">
        <Navigation loggedIn={props.loggedIn}/>
          {(windowWidth < 769) && props.loggedIn &&
            <>
              <button 
                className="button button_type_burger" 
                type='button' 
                aria-label='меню' 
                onClick={toggleMenu} 
                alt="Mobile menu icon">
              </button>
            </>
          }
      </Route>
      <Route path={ ["/movies", "/saved-movies", "/profile"] } >
      <Navigation
          loggedIn={props.loggedIn}/>
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