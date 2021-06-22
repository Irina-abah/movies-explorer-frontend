import logoPath from '../../images/logo.svg';
import { Link } from "react-router-dom";

function UserEntry(props) {
  return (
    <section className="user-entry">
      <Link to="/" className="header__link">
        <img className="header__logo" src={logoPath} alt="Movies portal logo" />
      </Link>
      <form 
      className="user-entry__info" 
      name="user-entry" 
      onSubmit={props.onSubmit}>
        <h2 className="user-entry__title">{props.title}</h2>
        {props.children}
        <button 
        type="submit" 
        className="button button_type_sign">
        {props.buttonName}
        </button>
        <p className="user-entry__message">
          {props.message} 
        <Link to={props.link} className="user-entry__link">
          {props.linkName}
        </Link>
        </p>
      </form>
    </section>
  )
};

export default UserEntry;