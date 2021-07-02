import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import profileIcon from '../../../images/account-icon.svg';
import logoPath from '../../../images/logo.svg';

function Navigation() {

  const history = useHistory();

  function handleProfile() {
    history.push('/profile');
  }

  return (
    <section className="navigation">
      <Link to="/" className="header__path">
          <img className="link header__logo" src={logoPath} alt="Movies portal logo" />
      </Link>
    <nav className="header__navigation">
      <ul className="header__navigation-list">
        <li><NavLink className="link header__link header__link-mobile" activeClassName="header__link_active" to="/">Главная</NavLink></li>
        <li><NavLink className="link header__link" activeClassName="header__link_active" to="/movies">Фильмы</NavLink></li>
        <li><NavLink className="link header__link" activeClassName="header__link_active" to="/saved-movies">Сохраненные фильмы</NavLink></li>
      </ul>
    </nav>
      <div className="header__profile">
        <button className="button button_type_account" onClick={handleProfile}>Аккаунт</button>
        <img className="header__profile-icon" src={profileIcon} alt="Profile icon"/>
      </div>
    </section>
    )
};

export default Navigation; 