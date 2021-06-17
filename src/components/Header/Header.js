import React from 'react';
import logoPath from '../../images/logo.svg';
import { Link } from "react-router-dom";
import Navigation from '../Header/Navigation/Navigation';

function Header() {
    return (
        <header className="header">
            <Link to='/' className="header__link">
            <img className="header__logo" src={logoPath} alt="Movies portal logo" />
            </Link>
            <Navigation />
        </header>
    )
};

export default Header; 