import React from 'react';
import './NavTab.css';
import { HashLink as Link } from 'react-router-hash-link';

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtav__list-item"><Link to="#about-project" className="link navtav__item">О проекте</Link></li>
        <li className="navtav__list-item"><Link to="#techs" className="link navtav__item">Технологии</Link></li>
        <li className="navtav__list-item"><Link to="#about-me" className="link navtav__item">Студент</Link></li>
      </ul>
    </nav>
  );
}

export default NavTab;