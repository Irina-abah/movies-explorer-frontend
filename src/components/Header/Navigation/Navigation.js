import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import profileIcon from '../../../images/account-icon.svg'

function Navigation() {

  const history = useHistory();

  function handleProfile() {
    history.push('/profile');
  }

  return (
    <nav className="header__navigation">
      <ul className="header__navigation-list">
        <li><NavLink className="header__link" activeClassName ="header__link_active" to="/">Главная</NavLink></li>
        <li><NavLink className="header__link" activeClassName ="header__link_active" to="/movies">Фильмы</NavLink></li>
        <li><NavLink className="header__link" activeClassName ="header__link_active" to="/saved-movies">Сохраненные фильмы</NavLink></li>
      </ul>
      <div className="header__profile">
        <button className="header__button" onClick={handleProfile}>Аккаунт</button>
        <img className="header__profile-icon" src={profileIcon} alt="Profile icon"/>
      </div>
    </nav>
    )
};

export default Navigation; 