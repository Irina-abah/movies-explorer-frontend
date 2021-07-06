import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation(props) {

  return (
    <section className="navigation">
      {props.loggedIn ? 
        (
          <nav className={props.isMenuOpen ? "header__navigation-mobile" : "header__navigation"}>
            <ul className={props.isMenuOpen ? "header__navigation-list-mobile" : "header__navigation-list"}>
              <li className="list-item">
                <NavLink 
              className={`link ${props.isMenuOpen ? "header__link-mobile" : "header__link-hide"}`} 
              activeClassName={props.isMenuOpen ? "header__link_active-mobile" : "header__link_active"} 
              exact to="/">Главная
              </NavLink>
              </li>
              <li className="list-item">
                <NavLink 
                className={`link ${props.isMenuOpen ? "header__link-mobile" : "header__link"}`} 
                activeClassName={props.isMenuOpen ? "header__link_active-mobile" : "header__link_active"} 
                to="/movies">Фильмы
                </NavLink>
                </li>
                <li className="list-item">
                <NavLink 
                className={`link ${props.isMenuOpen ? "header__link-mobile" : "header__link"}`} 
                activeClassName={props.isMenuOpen ? "header__link_active-mobile" : "header__link_active"} 
                to="/saved-movies">Сохраненные фильмы
                </NavLink>
                </li>
            </ul>
          </nav> 
      )
      : (
        <nav className="header__auth">
          <Link className="link header__link header__link_type_signup" to='/signup'>Регистрация</Link>
          <Link className="link header__link header__link_type_signin" to='/signin'>Войти</Link>
        </nav>
      )}
    </section>
    )
};

export default Navigation; 