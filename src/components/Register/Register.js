import React from 'react';
import UserEntry from '../UserEntry/UserEntry';
import {useFormValidation} from '../../utils/ValidateForm';

function Register(props) {

  const validation = useFormValidation();
  const {name, email, password} = validation.values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onRegister({name, email, password})
  }

  return (
    <section className="login">
    <UserEntry
    title="Добро пожаловать!"
    buttonName="Зарегистрироваться"
    message="Уже зарегистрированы?"
    link="/signin"
    linkName="Войти"
    onSubmit={handleSubmit}
    isFormValid={validation.isFormValid}>
      <div className="user-entry__container">
        <label className="user-entry__lable" htmlFor="profile-name">Имя</label>
        <input 
        type="text" 
        className={`form-input form__input_type_sign ${!validation.validity.name && "form-input-error"}`}
        id="profile-name"
        name="name"
        value={validation.values.name || ''}
        onChange={validation.handleChange}
        minLength="2" 
        maxLength="40" 
        required />
      </div>
      <span 
        className={`input-error ${!validation.isFormValid && "input-error_active"}`} 
        id="profile-name-error">{validation.errors.name}
      </span>
      <div className="user-entry__container">
        <label className="user-entry__lable" htmlFor="email">E-mail</label>
        <input 
          type="email" 
          className={`form-input form__input_type_sign ${!validation.validity.email && "form-input-error"}`} 
          id="email"
          name="email" 
          value={validation.values.email || ''}
          onChange={validation.handleChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          title="Введите Ваш email" 
          required />
      </div>
      <span 
      className={`input-error ${!validation.isFormValid && "input-error_active"}`} 
      id="email-error">{validation.errors.email}
      </span>
      <div className="user-entry__container">
        <label className="user-entry__lable" htmlFor="password">Пароль</label>
        <input 
          type="password" 
          className={`form-input form__input_type_sign ${!validation.validity.password && "form-input-error"}`} 
          id="password"
          name="password"
          value={validation.values.password || ''}
          onChange={validation.handleChange}
          minLength="10"
          title="Введите Ваш пароль" 
          required />
      </div>
      <span 
        className={`input-error ${!validation.isFormValid && "input-error_active"}`}
        id="password-error">{validation.errors.password}
      </span>
    </UserEntry>
    </section>
  )
};

export default Register;