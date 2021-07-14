import React from 'react';
import UserEntry from '../UserEntry/UserEntry';

function Register(props) {

  const [userData, setUserData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onRegister(userData)
  }

  return (
    <section className="login">
    <UserEntry
    title="Добро пожаловать!"
    buttonName="Зарегистрироваться"
    message="Уже зарегистрированы?"
    link="/signin"
    linkName="Войти"
    onSubmit={handleSubmit}>
      <div className="user-entry__container">
        <label className="user-entry__lable" htmlFor="profile-name">Имя</label>
        <input 
        type="text" 
        className="form-input form__input_type_sign" 
        id="profile-name"
        name="name"
        value={userData.name}
        onChange={handleChange}
        minLength="2" 
        maxLength="40" 
        required />
      </div>
      <span 
        className="input-error" 
        id="profile-name-error">
      </span>
      <div className="user-entry__container">
        <label className="user-entry__lable" htmlFor="email">E-mail</label>
        <input 
          type="email" 
          className="form-input form__input_type_sign" 
          id="email"
          name="email" 
          value={userData.email}
          onChange={handleChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          title="Введите Ваш email" 
          required />
      </div>
      <span 
      className="input-error" 
      id="email-error">
      </span>
      <div className="user-entry__container">
        <label className="user-entry__lable" htmlFor="password">Пароль</label>
        <input 
          type="password" 
          className="form-input form__input_type_sign" 
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          minLength="10"
          title="Введите Ваш пароль" 
          required />
      </div>
      <span 
        className="input-error" 
        id="password-error">error example
      </span>
    </UserEntry>
    </section>
  )
};

export default Register;