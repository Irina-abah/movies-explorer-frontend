import React from 'react';
import Header from '../Header/Header';
import { Link } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {useFormValidation} from '../../utils/ValidateForm';

function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const validation = useFormValidation();

  const {name, email} = validation.values;

  React.useEffect(() => {
      validation.setValues({
        name: currentUser.name, 
        email: currentUser.email})
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({ name, email});
    validation.resetForm();
}

  return (
    <section className="profile">
      <Header loggedIn={props.loggedIn}/>
      <form 
        className="profile__info" 
        name="profile" 
        onSubmit={handleSubmit}>
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <div className="profile__container">
          <div className="profile__container-item">
            <label className="profile__lable" htmlFor="profile-name">Имя</label>
            <input 
              type="text" 
              className={`form-input form__input_type_profile ${!validation.validity.name && "form-input-error"}`} 
              id="profile-name"
              name="name"
              value={validation.values.name || ""} 
              onChange={validation.handleChange}
              placeholder="Ваше имя"
              minLength="2" 
              maxLength="40" 
              required />
            <span 
                className="profile__input-error" 
                id="profile-name-error">{validation.errors.name}
            </span>
          </div>
          <div className="profile__container-item">
            <label className="profile__lable" htmlFor="profile-email">E-mail</label>
            <input 
              type="email" 
              className={`form-input form__input_type_profile ${!validation.validity.email && "form-input-error"}`} 
              id="profile-email"
              name="email" 
              value={validation.values.email || ""} 
              onChange={validation.handleChange}
              placeholder="Ваш e-mail"
              minLength="2" 
              maxLength="40" 
              required 
            />
            <span 
                className="profile__input-error" 
                id="profile-email-error">{validation.errors.email}
            </span>
          </div> 
        </div> 
        <button 
          type="submit" 
          className={`button button_type_edit ${!validation.isFormValid ? "button_type_edit_disabled" : ""}`}
          disabled={!validation.isFormValid}>
          Редактировать
        </button>
        <Link className="link profile__signout-link" to='/' onClick={props.onSignOut}>Выйти из аккаунта</Link>
      </form>
    </section> 
  )
};

export default Profile;