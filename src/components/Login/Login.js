import UserEntry from '../UserEntry/UserEntry';

function Login(props) {
  return (
    <section className="login">
    <UserEntry
    title="Рады видеть!"
    buttonName="Войти"
    message="Ещё не зарегистрированы?"
    link="/signup"
    linkName="Регистрация">
    <input 
      type="email" 
      className="popup__input popup__input_type_sign" 
      id="email"
      name="email" 
      placeholder="Email" 
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
      title="Введите Ваш email" 
      required />
    <span 
      className="input-error" 
      id="email-error">
    </span>
    <input 
      type="password" 
      className="popup__input popup__input_type_sign" 
      id="password"
      name="password"
      placeholder="Пароль" 
      minLength="10"
      title="Введите Ваш пароль" 
      required 
    />
    <span 
      className="input-error" 
      id="password-error">
    </span>
    </UserEntry>
    </section>
  )
};

export default Login;