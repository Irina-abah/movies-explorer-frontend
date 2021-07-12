import React from 'react';
import UserEntry from '../UserEntry/UserEntry';

function Login(props) {

  const [userData, setUserData] = React.useState({
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
    props.onLogin(userData)
  }

  return (
    <section className="login">
    <UserEntry
    title="Рады видеть!"
    buttonName="Войти"
    message="Ещё не зарегистрированы?"
    link="/signup"
    linkName="Регистрация"
    onSubmit={handleSubmit}>
      <div className="user-entry__container">
        <label className="user-entry__lable" htmlFor="email">E-mail</label>
        <input 
        type="email" 
        className="form-input form__input_type_sign" 
        id="email"
        name="email" 
        value={userData.email}
        onChange={handleChange}
        placeholder="Email" 
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        title="Введите Ваш email" 
        required />
      </div>
      <span 
        className="input-error" 
        id="email-error">error example
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
          placeholder="Пароль" 
          minLength="10"
          title="Введите Ваш пароль" 
          required 
        />
      </div>
      <span 
          className="input-error" 
          id="password-error">fbdsdfhjshfj
        </span>
    </UserEntry>
    </section>
  )
};

export default Login;