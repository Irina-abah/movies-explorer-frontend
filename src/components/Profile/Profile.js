import React from 'react';
import { Link, useHistory } from "react-router-dom";

function Profile(props) {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleDescriptionChange(evt) {
    setEmail(evt.target.value)
  }

  const history = useHistory();

    function signOut() {
        localStorage.removeItem('jwt');
        history.push('/');
    }

  return (
    <section className="profile">
      <form 
      className="profile__info" 
      name="profile" 
      onSubmit={props.onSubmit}>
        {/* <h2 className="profile__title">{`Привет, ${name}`}</h2> */}
        <h2 className="profile__title">Привет, Ирина!</h2>
        <div className="profile__container">
          <label className="profile__lable" htmlFor="profile-name">Имя</label>
          <input 
            type="text" 
            className="profile__input profile__input_type_profile-name" 
            id="profile-name"
            name="name"
            value={name || ""} 
            onChange={handleNameChange}
            placeholder="Ваше имя"
            minLength="2" 
            maxLength="40" 
            required 
          />
          <span 
              className="input-error" 
              id="profile-name-error">
          </span>
        </div>
        <div>
          <label className="profile__lable" htmlFor="profile-email">E-mail</label>
          <input 
            type="email" 
            className="popup__input popup__input_type_profile-email" 
            id="profile-email"
            name="email" 
            value={email || ""} 
            onChange={handleDescriptionChange}
            placeholder="Your e-mail"
            minLength="2" 
            maxLength="40" 
            required 
          />
          <span 
              className="input-error" 
              id="profile-email-error">
          </span>
        </div>  
        <button 
            type="submit" 
            className="button button_type_edit">
            Редактировать
        </button>
        <Link className="profile__signout" to='/' onClick={signOut}>Выйти из аккаунта</Link>
      </form>
    </section> 
  )
};

export default Profile;