import React from 'react';
import Header from '../Header/Header';
import { Link } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleDescriptionChange(evt) {
    setEmail(evt.target.value)
  }

  return (
    <section className="profile">
      <Header loggedIn={props.loggedIn}/>
      <form 
      className="profile__info" 
      name="profile" 
      onSubmit={props.onSubmit}>
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <div className="profile__container">
          <div className="profile__container-item">
            <label className="profile__lable" htmlFor="profile-name">Имя</label>
            <input 
              type="text" 
              className="form-input form__input_type_profile" 
              id="profile-name"
              name="name"
              value={currentUser.name || ""} 
              onChange={handleNameChange}
              placeholder="Ваше имя"
              minLength="2" 
              maxLength="40" 
              required 
            />
            <span 
                className="profile__input-error" 
                id="profile-name-error">error example
            </span>
          </div>
          <div className="profile__container-item">
            <label className="profile__lable" htmlFor="profile-email">E-mail</label>
            <input 
              type="email" 
              className="form-input form__input_type_profile" 
              id="profile-email"
              name="email" 
              value={currentUser.email || ""} 
              onChange={handleDescriptionChange}
              placeholder="Ваш e-mail"
              minLength="2" 
              maxLength="40" 
              required 
            />
            <span 
                className="profile__input-error" 
                id="profile-email-error">
            </span>
          </div> 
        </div> 
        <button 
            type="submit" 
            className="button button_type_edit">
            Редактировать
        </button>
        <Link className="link profile__signout-link" to='/' onClick={props.onSignOut}>Выйти из аккаунта</Link>
      </form>
    </section> 
  )
};

export default Profile;