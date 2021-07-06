import profileIcon from '../../../images/account-icon.svg';
import { useHistory } from "react-router-dom";

function Account(props) {

  const history = useHistory();

  function handleProfile() {
    history.push('/profile');
  }

  return (
    <div className={props.isMenuOpen ? "header__profile-mobile" : "header__profile"}>
      <button className="button button_type_account" onClick={handleProfile}>Аккаунт</button>
      <img className="header__profile-icon" src={profileIcon} alt="Profile icon"/>
    </div>
  )
}

export default Account;