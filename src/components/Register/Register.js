import UserEntry from '../UserEntry/UserEntry';

function Register(props) {
  return (
    <section className="login">
    <UserEntry
    title="Добро пожаловать!"
    buttonName="Зарегистрироваться"
    message="Уже зарегистрированы?"
    link="/signin"
    linkName="Войти">
    <input 
      type="text" 
      className="profile__input profile__input_type_profile-name" 
      id="profile-name"
      name="name"
      placeholder="Ваше имя"
      minLength="2" 
      maxLength="40" 
      required 
    />
    <span 
        className="input-error" 
        id="profile-name-error">
    </span>
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

export default Register;