import React from 'react';
import Navigation from '../Navigation/Navigation'
import Account from '../../Profile/Acount/Account';

function Menu(props) {
  return (
    <div className={`mobile-menu ${props.isOpen ? "mobile-menu_opened" : ""}`}>
      <div className="mobile-menu__container">
        <button className="button button_type_close" type='button' aria-label='close menu' onClick={props.onClose} alt="close menu icon"></button>
        <Navigation
          loggedIn={props.loggedIn} 
          isMenuOpen={!props.isMenuOpen}/>
        <Account
        isMenuOpen={!props.isMenuOpen}/>
      </div>
      
    </div>
  )
}

export default Menu;